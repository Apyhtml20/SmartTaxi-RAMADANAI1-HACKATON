import { useCallback, useState } from "react";

let listeners = [];
let toasts = [];

function notify() {
  listeners.forEach((l) => l(toasts));
}

export function toast({ title, description }) {
  const id = Date.now();
  toasts = [...toasts, { id, title, description }];
  notify();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 3000);
}

export function useToast() {
  const [items, setItems] = useState(toasts);

  const subscribe = useCallback(() => {
    const listener = (t) => setItems(t);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return { toasts: items, subscribe, toast };
}
