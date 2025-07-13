import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Copy } from "lucide-react";

export default function ErrorCheckCard() {
  const [codeInput, setCodeInput] = useState("");
  const [type, setType] = useState("kubernetes");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!codeInput.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/check-error`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeInput, type }),
      });

      const data = await res.json();
      setResult(data.corrected || "No correction found.");
    } catch (error) {
      setResult("Error checking the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#11121a] border border-slate-700 rounded-xl p-5 mb-8 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-3">🧪 Error Check & Correction</h3>

      <div className="flex gap-4 mb-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-slate-800 text-white border border-slate-600 p-2 rounded"
        >
          <option value="kubernetes">Kubernetes</option>
          <option value="terraform">Terraform</option>
          <option value="dockerfile">Dockerfile</option>
          <option value="python">Python</option>
        </select>

        <Button onClick={handleCheck} disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking...
            </span>
          ) : (
            "Check Errors"
          )}
        </Button>
      </div>

      <Textarea
        rows={6}
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder="Paste your Kubernetes/Terraform/Dockerfile code here"
        className="bg-slate-800 text-white border border-slate-600 mb-4"
      />

      {result && (
        <div className="relative bg-[#161622] text-slate-300 text-sm font-mono p-4 rounded-md">
          <pre className="whitespace-pre-wrap">{result}</pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 text-slate-400 hover:text-white"
            title="Copy corrected code"
          >
            <Copy size={16} />
          </button>
          {copied && (
            <span className="absolute top-3 right-16 text-xs text-green-400">
              Copied!
            </span>
          )}
        </div>
      )}
    </div>
  );
}
