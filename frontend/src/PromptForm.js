import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Copy, Download, Loader2 } from "lucide-react";
import ChatMessage from "./components/ChatMessage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("kubernetes");
  const [mode, setMode] = useState("command");
  const [activeTab, setActiveTab] = useState("command");
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function extractCodeBlock(text = "") {
    const codeMatch = text.match(/```(?:\w+)?\n([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : text.trim();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);

    if (mode === "command") {
      setCode("");
      setExplanation("");
      setActiveTab("command");
      try {
        const res = await fetch("https://infragenie-backend.onrender.com/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, type, mode }),
        });
        const data = await res.json();
        const rawCode = Array.isArray(data.code) ? data.code.join("\n") : data.code;
        setCode(extractCodeBlock(rawCode) || "No command generated.");
        setExplanation(data.explanation?.trim() || "No explanation available.");
      } catch (error) {
        setCode("Error generating response. Please try again.");
        setExplanation("");
      } finally {
        setLoading(false);
      }
    } else {
      const newUserMsg = { role: "user", content: prompt };
      const updatedMessages = [...chatHistory, newUserMsg];

      try {
        const res = await fetch("https://infragenie-backend.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages, type }),
        });

        const data = await res.json();
        const assistantMsg = { role: "assistant", content: data?.response || "❌ No reply from AI." };
        setChatHistory([...updatedMessages, assistantMsg]);
        setPrompt("");
      } catch (error) {
        setChatHistory([
          ...updatedMessages,
          { role: "assistant", content: "❌ Error processing your message." },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCopy = () => {
    const content =
      mode === "chat"
        ? chatHistory.map((m) => `${m.role}: ${m.content}`).join("\n")
        : activeTab === "command"
        ? code
        : explanation;

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const ext =
      type === "kubernetes"
        ? "yaml"
        : type === "terraform"
        ? "tf"
        : type === "dockerfile"
        ? "Dockerfile"
        : "txt";
    const content =
      mode === "chat"
        ? chatHistory.map((m) => `${m.role}: ${m.content}`).join("\n")
        : activeTab === "command"
        ? code
        : explanation;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}-output.${ext}`;
    link.click();
  };

  const getSyntaxLang = () => {
    switch (type) {
      case "kubernetes": return "yaml";
      case "terraform": return "hcl";
      case "dockerfile": return "docker";
      default: return "bash";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-slate-800 text-white border border-slate-600 p-2 rounded w-full"
        >
          <option value="kubernetes">Kubernetes</option>
          <option value="terraform">Terraform</option>
          <option value="dockerfile">Dockerfile</option>
        </select>

        <Textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a Kubernetes Deployment for nginx"
          className="bg-slate-800 text-white border border-slate-600"
        />

        <div className="flex items-center justify-between gap-4">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="bg-slate-800 text-white border border-slate-600 p-2 rounded"
          >
            <option value="command">Command</option>
            <option value="chat">Chat</option>
          </select>

          <Button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </form>

      {mode === "chat" && chatHistory.length > 0 && (
        <div className="mt-6 bg-[#0f0f1a] border border-slate-700 rounded-xl shadow-xl p-5 space-y-4">
          {chatHistory.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} text={msg.content} />
          ))}
        </div>
      )}

      {mode === "command" && (code || explanation) && (
        <div className="mt-10">
          <div className="bg-[#0f0f1a] border border-slate-700 rounded-xl shadow-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={
                  type === "kubernetes"
                    ? "/icons/k8s.svg"
                    : type === "terraform"
                    ? "/icons/tform.svg"
                    : "/icons/docker.svg"
                }
                alt={type}
                className="h-6 w-6"
              />
              <p className="text-white font-medium">{prompt}</p>
            </div>

            <div className="flex gap-6 text-sm border-b border-slate-700 pb-2 mb-4">
              <button
                onClick={() => setActiveTab("command")}
                className={`$ {
                  activeTab === "command"
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-slate-400"
                } font-medium`}
              >
                Command
              </button>
              <button
                onClick={() => setActiveTab("explanation")}
                className={`$ {
                  activeTab === "explanation"
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-slate-400"
                } font-medium`}
              >
                Explanation
              </button>
            </div>

            <div className="relative bg-[#161622] text-slate-300 text-sm font-mono p-4 rounded-md">
              {activeTab === "command" ? (
                <SyntaxHighlighter language={getSyntaxLang()} style={oneDark} wrapLongLines>
                  {code}
                </SyntaxHighlighter>
              ) : (
                <pre className="whitespace-pre-wrap">{explanation}</pre>
              )}

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={handleDownload}
                  className="text-slate-400 hover:text-white"
                  title="Download"
                >
                  <Download size={16} />
                </button>
              </div>

              {copied && (
                <span className="absolute top-3 right-20 text-xs text-green-400">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
