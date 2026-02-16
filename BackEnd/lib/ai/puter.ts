/**
 * Puter AI is designed to be called from the frontend (user-pays model),
 * typically by including <script src="https://js.puter.com/v2/"></script>
 * and calling puter.ai.chat(...).
 *
 * Docs: https://docs.puter.com/AI/chat/
 *
 * For hackathon backend, we expose /api/ai/insights that returns a prompt payload
 * the frontend can send to puter.ai.chat(). This keeps your backend keyless.
 */
export type PuterMessage = { role: 'system'|'user'|'assistant'|'tool'; content: string };

export function buildPuterChatPayload(messages: PuterMessage[], options?: { model?: string }) {
  return {
    messages,
    options: {
      model: options?.model ?? 'gpt-5-nano',
    }
  };
}
