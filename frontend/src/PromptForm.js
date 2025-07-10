import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "components/ui/card";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { motion } from "framer-motion";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [type, setType] = useState("kubernetes");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        type: "kubernetes", // or "terraform" — make this selectable if needed
      }),
    });

    const data = await res.json();
    setResult(data.code || "No code generated.");
  } catch (err) {
    console.error(err);
    setResult("Error connecting to InfraGenie backend.");
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
        Type your infra need, we'll handle the rest
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="text-white text-lg font-semibold">
            Enter a prompt like: “Create an NGINX Deployment with 3 replicas”
          </CardHeader>
          <CardContent>
        <select
  className="w-full mt-2 p-2 bg-slate-900 text-white border border-slate-700 rounded"
  value={type}
  onChange={(e) => setType(e.target.value)}
>
  <option value="kubernetes">Kubernetes</option>
  <option value="terraform">Terraform</option>
</select>
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Generate Terraform code for an S3 bucket"
              className="bg-slate-900 text-white placeholder:text-slate-400"
            />
            <Button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
              disabled={!prompt}
            >
              Generate
            </Button>
          </CardContent>
        </Card>
      </form>

      {result && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="text-white text-lg font-semibold">
            Result
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-slate-300 text-sm bg-slate-900 p-4 rounded-md overflow-x-auto">
              {result}
            </pre>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
