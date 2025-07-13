import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ErrorCheckCard() {
  const [code, setCode] = useState("");
  const [corrected, setCorrected] = useState("");
  const [type, setType] = useState("kubernetes");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setCorrected("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/check-error`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, type }),
      });

      const data = await res.json();
      setCorrected(data.corrected || "No corrections found.");
    } catch (error) {
      setCorrected("Error checking code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 border border-slate-700 rounded-lg p-6 bg-[#0f0f1a] text-white">
      <h2 className="text-xl font-semibold mb-4">🛠 Error Checker</h2>

      <div className="mb-4">
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
      </div>

      <Textarea
        rows={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here for error checking..."
        className="bg-slate-800 text-white border border-slate-600 mb-4"
      />

      <Button onClick={handleCheck} disabled={loading} className="w-full">
        {loading ? "Checking..." : "Check & Fix Errors"}
      </Button>

      {corrected && (
        <div className="mt-6 bg-[#161622] p-4 rounded-md text-sm font-mono whitespace-pre-wrap border border-slate-600 text-slate-300">
          {corrected}
        </div>
      )}
    </div>
  );
}
