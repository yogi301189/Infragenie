import { useState } from "react";

export default function AWSCard() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("https://infragenie-backend.onrender.com/aws-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ code: "", explanation: "Failed to fetch response." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">AWS CLI Generator</h2>
      <textarea
        className="w-full p-2 border rounded-md resize-none"
        rows={4}
        placeholder="Enter prompt to generate AWS CLI command"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {response && (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm font-semibold text-gray-700 mb-1">🔧 Command:</p>
          <pre className="bg-white p-2 rounded-md text-sm overflow-x-auto">
            {response.code}
          </pre>
          <p className="text-sm font-semibold text-gray-700 mt-3 mb-1">🧠 Explanation:</p>
          <p className="text-sm text-gray-800">{response.explanation}</p>
        </div>
      )}
    </div>
  );
}
