import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Copy, Download, Loader2 } from "lucide-react";

// Auto-detection helper
function detectLanguage(code = "") {
  if (/resource\s+".*"\s+".*"\s+\{/.test(code)) return "terraform";
  if (/apiVersion|kind:|metadata:/.test(code)) return "kubernetes";
  if (/FROM|CMD|EXPOSE/.test(code)) return "dockerfile";
  if (/def\s|\bprint\(|import\s/.test(code)) return "python";
  return "kubernetes";
}

export default function ErrorCheckCard() {
  const [code, setCode] = useState("");
  const [corrected, setCorrected] = useState("");
  const [type, setType] = useState("kubernetes");
  const [autoDetect, setAutoDetect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [noErrors, setNoErrors] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setCorrected("");
    setNoErrors(false);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/check-error`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, type }),
      });

      const data = await res.json();
      setCorrected(data.corrected || "No output returned");

      // Compare after cleaning spaces
      const cleanedOriginal = code.trim().replace(/\s+/g, " ");
      const cleanedCorrected = data.corrected.trim().replace(/\s+/g, " ");
      setNoErrors(cleanedOriginal === cleanedCorrected);
    } catch (err) {
      setCorrected("Error occurred while checking code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([corrected], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `corrected-${type}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (autoDetect) {
      const detected = detectLanguage(newCode);
      setType(detected);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-white mb-4">🛠️ Error Check Assistant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Language Selector + Auto Toggle */}
        <div className="flex items-center gap-4">
          <label className="text-white font-medium">Language:</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setAutoDetect(false);
            }}
            className="bg-slate-800 text-white border border-slate-600 p-2 rounded"
          >
            <option value="kubernetes">Kubernetes</option>
            <option value="terraform">Terraform</option>
            <option value="dockerfile">Dockerfile</option>
            <option value="python">Python</option>
          </select>
          <label className="text-white flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
            />
            Auto Detect
          </label>
          {autoDetect && (
            <span className="text-sm text-indigo-400 ml-2">
              🧠 Language auto-detected: <strong>{type}</strong>
            </span>
          )}
        </div>

        {/* Input area */}
        <Textarea
          rows={6}
          placeholder="Paste your code here to check for errors..."
          value={code}
          onChange={handleCodeChange}
          className="bg-slate-800 text-white border border-slate-600"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking...
            </span>
          ) : (
            "Check for Errors"
          )}
        </Button>
      </form>

      {/* Output section */}
      {corrected && (
        <div className="bg-[#161622] text-sm text-slate-200 font-mono mt-8 p-4 rounded-xl border border-slate-700 relative">
          <pre className="whitespace-pre-wrap">{corrected}</pre>

          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={handleCopy} className="text-slate-400 hover:text-white">
              <Copy size={16} />
            </button>
            <button onClick={handleDownload} className="text-slate-400 hover:text-white">
              <Download size={16} />
            </button>
          </div>

          {copied && (
            <span className="absolute top-3 right-20 text-xs text-green-400">
              Copied!
            </span>
          )}

          {noErrors && (
            <div className="mt-3 text-green-400 font-medium">
              ✅ No errors found in the provided code.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
