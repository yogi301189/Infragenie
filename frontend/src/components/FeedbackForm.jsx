import React, { useState } from "react";

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">💬 Feedback / Join the Waitlist</h2>
      {submitted ? (
        <p className="text-green-400">Thanks! We'll get back to you soon.</p>
      ) : (
        <form
          action="https://formspree.io/f/mjkrqrvy"  // ⬅️ Replace with your real endpoint
          method="POST"
          onSubmit={() => setSubmitted(true)}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 placeholder-slate-400 text-white"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your feedback or interest..."
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 placeholder-slate-400 text-white"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
