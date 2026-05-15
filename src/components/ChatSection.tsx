import { useState, useRef, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("API-fel");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        const captured = fullText;
        setMessages([...newMessages, { role: "assistant", content: captured }]);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "Något gick fel — försök igen." },
        ]);
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [input, messages, isStreaming]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h2 className="text-xl font-bold text-gray-900">AI-kostnadsrådgivare</h2>
        <p className="text-sm text-gray-500 mt-1">
          Beskriv din AI-idé — få konkreta kostnadsestimat i SEK
        </p>
      </div>

      {messages.length > 0 ? (
        <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" &&
                  isStreaming &&
                  i === messages.length - 1 && (
                    <span className="inline-block w-1.5 h-4 bg-gray-400 ml-0.5 animate-pulse rounded-sm align-middle" />
                  )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      ) : (
        <div className="px-6 py-10 text-center">
          <p className="text-gray-400 text-sm">
            Exempel: "Vi bygger en chatbot för kundservice — 200 frågor per dag"
          </p>
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Beskriv ditt AI-användningsfall..."
            rows={2}
            disabled={isStreaming}
            className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isStreaming ? "..." : "Skicka"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Enter för att skicka · Shift+Enter för ny rad
        </p>
      </div>
    </div>
  );
}
