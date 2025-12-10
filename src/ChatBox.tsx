import React, { useState, useRef, useEffect } from "react";

// --- CONFIG API ---
const API_KEY = "AIzaSyAOV-N2JoiOrMs9Kc8Uw8Vhi2WgANH3EcA";
const MODEL_NAME = "models/gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${API_KEY}`;

interface Message {
  role: "user" | "bot";
  text: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Xin chào! Tôi là Quang AI 🤖\nTôi có thể hỗ trợ gì cho bạn?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // ⭐ Bật/Tắt chat widget

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- SEND TO GEMINI ---
  const sendMessageToGemini = async (userMessage: string) => {
    try {
      const payload = {
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Không có phản hồi từ AI."
      );
    } catch (err) {
      return "❌ Lỗi kết nối đến máy chủ AI.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    const botReply = await sendMessageToGemini(userText);

    setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    setIsLoading(false);
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* --- NÚT TRÒN MỞ CHAT GÓC DƯỚI PHẢI --- */}
      <button style={styles.floatingBtn} onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* --- CHAT WIDGET --- */}
      {open && (
        <div style={styles.widget}>
          <div style={styles.header}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
              alt="bot"
              style={{ width: 32, marginRight: 10 }}
            />
            <h4 style={{ margin: 0, fontSize: 16 }}>Quang AI Assistant</h4>

            {/* nút X đóng */}
            <button onClick={() => setOpen(false)} style={styles.closeBtn}>
              ✖
            </button>
          </div>

          {/* --- MESSAGE LIST --- */}
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.msgRow,
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "bot" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
                    style={styles.avatar}
                  />
                )}

                <div
                  style={{
                    ...styles.bubble,
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg,#4facfe,#00f2fe)"
                        : "#f1f1f1",
                    color: msg.role === "user" ? "white" : "black",
                  }}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: 0 }}>
                      {line}
                    </p>
                  ))}
                </div>

                {msg.role === "user" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    style={styles.avatar}
                  />
                )}
              </div>
            ))}

            {isLoading && (
              <div style={styles.loadingBubble}>AI đang phản hồi...</div>
            )}

            <div ref={endRef} />
          </div>

          {/* INPUT */}
          <div style={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Nhập tin nhắn..."
              style={styles.input}
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              style={{
                ...styles.sendBtn,
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- STYLE CHAT WIDGET ---
const styles = {
  floatingBtn: {
    position: "fixed" as "fixed",
    bottom: "25px",
    right: "25px",
    width: "60px",
    height: "60px",
    background: "#2196f3",
    color: "white",
    borderRadius: "50%",
    border: "none",
    fontSize: "26px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  widget: {
    position: "fixed" as "fixed",
    bottom: "100px",
    right: "25px",
    width: "350px",
    height: "480px",
    background: "white",
    borderRadius: "18px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as "column",
  },

  header: {
    height: "58px",
    background: "#2196f3",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    fontWeight: "bold",
  },

  closeBtn: {
    marginLeft: "auto",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    color: "white",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: "12px",
    overflowY: "auto" as "auto",
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
    background: "#f8fafc",
  },

  msgRow: {
    display: "flex",
    alignItems: "flex-end",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    margin: "0 6px",
  },

  bubble: {
    padding: "10px 14px",
    borderRadius: "14px",
    fontSize: "14px",
    lineHeight: "1.4",
    maxWidth: "70%",
  },

  loadingBubble: {
    padding: "8px 12px",
    background: "#ddd",
    borderRadius: "12px",
    fontSize: "13px",
    fontStyle: "italic",
  },

  inputArea: {
    display: "flex",
    gap: "8px",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff",
  },

  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "18px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  sendBtn: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#2196f3",
    color: "white",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default ChatPage;
