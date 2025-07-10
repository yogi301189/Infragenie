import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Copy, Loader2 } from "lucide-react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("kubernetes"); // ✅ ADDED
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }), // ✅ Now `type` is defined
      });

      const data = await res.json();
      setResponse(data.code || "No response"); // ✅ Changed from data.generated to data.code
    } catch (error) {
      setResponse("Error generating response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-slate-800 text-white border border-slate-600 p-2 rounded w-full"
        >
          <option value="kubernetes">Kubernetes</option>
          <option value="terraform">Terraform</option>
        </select>

        <Textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a Kubernetes Deployment for nginx"
          className="bg-slate-800 text-white border border-slate-600"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Generating...
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </form>

      {response && (
        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-md relative">
          <pre className="p-4 text-slate-300 text-sm whitespace-pre-wrap font-mono">
            {response}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 text-slate-400 hover:text-white"
          >
            <Copy size={16} />
          </button>
          {copied && (
            <span className="absolute top-3 right-10 text-xs text-green-400">
              Copied!
            </span>
          )}
        </div>
      )}
    </div>
  );
}
