import { useState, useRef, useCallback, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const data = (await res.json()) as { limitReached?: boolean; error?: string };
        if (data.limitReached) {
          setLimitReached(true);
          setShowModal(true);
        } else {
          setMessages([
            ...history,
            { role: "assistant", content: data.error ?? "Något gick fel. Försök igen." },
          ]);
        }
        setIsStreaming(false);
        return;
      }

      // Streaming path
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      setMessages([...history, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: accumulated }]);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages([
          ...history,
          { role: "assistant", content: "Något gick fel. Försök igen om en stund." },
        ]);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [input, messages, isStreaming]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <section aria-label="AI-kostnadsrådgivare">
      {/* Message thread */}
      {messages.length > 0 && (
        <div className="space-y-3 mb-4 max-h-96 overflow-y-auto pr-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" &&
                  isStreaming &&
                  idx === messages.length - 1 &&
                  msg.content === "" && (
                    <span className="flex gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                {msg.role === "assistant" &&
                  isStreaming &&
                  idx === messages.length - 1 &&
                  msg.content !== "" && (
                    <span className="inline-block w-0.5 h-3.5 bg-gray-500 animate-pulse ml-0.5 align-middle" />
                  )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input area — hidden once limit is reached */}
      {!limitReached && (
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              messages.length === 0
                ? 'Beskriv ditt AI-projekt — t.ex. "En chatbot för kundsupport med 500 frågor/dag"'
                : "Skriv ett svar…"
            }
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 pt-4 pb-14 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            rows={3}
            maxLength={2000}
            disabled={isStreaming}
          />
          <div className="absolute bottom-3 left-5 right-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">{input.length}/2000</p>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              {isStreaming ? "…" : messages.length === 0 ? "Fråga →" : "Skicka →"}
            </button>
          </div>
        </div>
      )}

      {/* Limit reached — inline prompt to contact */}
      {limitReached && !showModal && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 text-center">
          Har du fler frågor?{" "}
          <a href="mailto:hej@aikostnad.se" className="font-semibold underline hover:no-underline">
            Kontakta oss på hej@aikostnad.se
          </a>
        </div>
      )}

      {/* Limit reached modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="limit-modal-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-7 text-center">
            <div className="text-4xl mb-3" aria-hidden="true">💡</div>
            <h2 id="limit-modal-title" className="text-xl font-bold text-gray-900 mb-2">
              Verkar som du har många idéer!
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Just nu är vår robot inte tillgänglig för fler analyser.
              <br />
              Har du frågor? Tveka inte att kontakta oss på{" "}
              <a
                href="mailto:hej@aikostnad.se"
                className="text-indigo-600 hover:underline font-medium"
              >
                hej@aikostnad.se
              </a>
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
