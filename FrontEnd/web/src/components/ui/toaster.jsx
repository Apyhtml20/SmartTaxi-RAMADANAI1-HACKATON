import { useEffect } from "react";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts, subscribe } = useToast();

  useEffect(() => {
    const unsub = subscribe();
    return unsub;
  }, [subscribe]);

  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: "#222",
            color: "#fff",
            padding: "12px 14px",
            borderRadius: 10,
            marginTop: 10,
            minWidth: 260,
            border: "1px solid #444",
          }}
        >
          {t.title && <div style={{ fontWeight: 700 }}>{t.title}</div>}
          {t.description && <div style={{ opacity: 0.9 }}>{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
