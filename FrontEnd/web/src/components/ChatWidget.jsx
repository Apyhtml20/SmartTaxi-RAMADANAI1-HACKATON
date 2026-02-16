import React, { useState } from "react";
import { aiChat } from "@/services/api";
import { MessageCircle, Send } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Salut 👋 Pose-moi une question sur le trafic, zones, heures de pointe..." },
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const t = text.trim();
    if (!t || loading) return;

    const next = [...messages, { role: "user", content: t }];
    setMessages(next);
    setText("");
    setLoading(true);

    try {
      const res = await aiChat({ messages: next });
      // backend doit renvoyer: { reply: "..." }
      setMessages((m) => [...m, { role: "assistant", content: res?.reply || "OK." }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Erreur chatbot: " + (e?.message || "") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-[#FFC107] text-black shadow-xl flex items-center justify-center"
        >
          <MessageCircle />
        </button>
      )}

      {open && (
        <div className="w-[340px] h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#1C1F24] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="text-white font-bold">SmartTaxi AI</div>
            <button onClick={() => setOpen(false)} className="text-white/70">✕</button>
          </div>

          <div className="flex-1 p-3 overflow-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[80%] bg-[#FFC107] text-black rounded-xl px-3 py-2 text-sm"
                    : "mr-auto max-w-[80%] bg-white/10 text-white rounded-xl px-3 py-2 text-sm"
                }
              >
                {m.content}
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
            />
            <button
              onClick={send}
              className="w-10 h-10 rounded-xl bg-[#FFC107] text-black flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
