import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";

function getPuter() {
  return window.puter;
}

export default function PuterChatWidget({
  model = "gemini-2.5-flash-lite",
  systemPrompt = `Tu es SmartTaxi AI pour Marrakech.
Tu dois répondre en FR.
Tu aides le chauffeur: zones de demande, heures de pointe, conseils déplacement, trafic (si pas dispo, le dire), et proposer un trajet textuel.
Si la question est vague, pose 1 question courte pour clarifier.`,
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Salut 👋 Pose-moi une question sur le trafic, les zones, les heures de pointe…",
    },
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    // auto scroll bas
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const send = async () => {
    const userText = text.trim();
    if (!userText || busy) return;

    const puter = getPuter();
    if (!puter?.ai?.chat) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "❌ Puter SDK non chargé. Ajoute <script src='https://js.puter.com/v2/'></script> dans index.html.",
        },
      ]);
      return;
    }

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setText("");
    setBusy(true);

    // On va streamer la réponse dans un message assistant “en cours”
    const assistantIndex = newMessages.length;
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      // On reconstruit l'historique que Puter comprend
      // Puter accepte un prompt string OU un format messages selon version.
      // Ici on envoie un prompt text complet (robuste).
      const historyText = newMessages
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      const prompt = `${systemPrompt}\n\n${historyText}\nAssistant:`;

      const resp = await puter.ai.chat(prompt, {
        model,
        stream: true,
      });

      let acc = "";
      for await (const part of resp) {
        const chunk = part?.text || "";
        acc += chunk;

        setMessages((prev) => {
          const copy = [...prev];
          if (copy[assistantIndex]) copy[assistantIndex] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      setMessages((prev) => {
        const copy = [...prev];
        if (copy[assistantIndex]) {
          copy[assistantIndex] = {
            role: "assistant",
            content: "❌ Erreur Puter: " + (e?.message || String(e)),
          };
        }
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-[#FFC107] text-black shadow-xl flex items-center justify-center"
          title="Chat"
        >
          <MessageCircle />
        </button>
      )}

      {open && (
        <div className="w-[360px] h-[460px] rounded-2xl overflow-hidden border border-white/10 bg-[#1C1F24] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="text-white font-bold">SmartTaxi AI</div>
            <button onClick={() => setOpen(false)} className="text-white/70">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-3 overflow-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] bg-[#FFC107] text-black rounded-xl px-3 py-2 text-sm"
                    : "mr-auto max-w-[85%] bg-white/10 text-white rounded-xl px-3 py-2 text-sm whitespace-pre-wrap"
                }
              >
                {m.content || (busy && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 bg-white/10 text-white rounded-xl px-3 py-2 text-sm outline-none"
              placeholder="Ex: quelle zone est la plus demandée à 18h?"
              disabled={busy}
            />
            <button
              onClick={send}
              disabled={busy}
              className="w-10 h-10 rounded-xl bg-[#FFC107] text-black flex items-center justify-center disabled:opacity-60"
              title="Send"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
