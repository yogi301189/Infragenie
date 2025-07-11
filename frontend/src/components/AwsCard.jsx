import { useState } from "react";
import { ClipboardCopyIcon, ChevronDown, ChevronUp } from "lucide-react";

export default function AwsCard() {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("S3");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ code: "", explanation: "" });
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://infragenie-backend.onrender.com/aws-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({
        code: "",
        explanation: "Error fetching from server. Please try again.",
      });
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0d1117] text-white rounded-2xl p-6 w-full max-w-2xl shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <img src="/icons/aws-icon.svg" alt="AWS Icon" className="w-6 h-6" />
        <h2 className="text-xl font-semibold">AWS CLI Generator</h2>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-[#161b22] border border-gray-700 text-white p-2 rounded mb-3 w-full"
      >
        <option value="S3">S3</option>
        <option value="EC2">EC2</option>
        <option value="IAM">IAM</option>
        <option value="VPC">VPC</option>
        <option value="CloudWatch">CloudWatch</option>
      </select>

      <textarea
        placeholder={`e.g., Create a ${category} bucket...`}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="bg-[#161b22] border border-gray-700 text-white p-3 rounded w-full mb-4 resize-none"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded w-full font-medium"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {response.code && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className="font-semibold mb-2">📄 Command:</p>
            <button
              onClick={copyToClipboard}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white flex items-center gap-1"
            >
              <ClipboardCopyIcon className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="bg-[#161b22] border border-gray-700 p-3 rounded font-mono text-sm whitespace-pre-wrap">
            {response.code}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowExplanation((prev) => !prev)}
              className="text-sm flex items-center gap-1 text-blue-400 hover:underline"
            >
              {showExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </button>

            {showExplanation && (
              <p className="mt-2 text-gray-300">{response.explanation}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
