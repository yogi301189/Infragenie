import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Copy, Download, Loader2 } from "lucide-react";

export default function ErrorCheckCard() {
  const [code, setCode] = useState("");
  const [corrected, setCorrected] = useState("");
  const [type, setType] = useState("kubernetes");
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

      // Check if no changes were made
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-white mb-4">🛠️ Error Check Assistant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-slate-800 text-white border border-slate-600 p-2 rounded w-full"
        >
          <option value="kubernetes">Kubernetes</option>
          <option value="terraform">Terraform</option>
          <option value="dockerfile">Dockerfile</option>
          <option value="python">Python</option>
        </select>

        <Textarea
          rows={6}
          placeholder="Paste your code here to check for errors..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
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

      {corrected && (
        <div className="bg-[#161622] text-sm text-slate-200 font-mono mt-8 p-4 rounded-xl border border-slate-700 relative">
          <pre className="whitespace-pre-wrap">{corrected}</pre>

          {/* Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={handleCopy} className="text-slate-400 hover:text-white">
              <Copy size={16} />
            </button>
            <button onClick={handleDownload} className="text-slate-400 hover:text-white">
              <Download size={16} />
            </button>
          </div>

          {/* Copied badge */}
          {copied && (
            <span className="absolute top-3 right-20 text-xs text-green-400">Copied!</span>
          )}

          {/* No errors badge */}
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
