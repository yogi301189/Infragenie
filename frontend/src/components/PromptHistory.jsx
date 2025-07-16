import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import { Loader2 } from "lucide-react";

export default function PromptHistory() {
  const [user] = useAuthState(auth);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "prompts"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPrompts(history);
      } catch (err) {
        console.error("Error fetching prompt history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [user]);

  if (!user) {
    return <div className="text-center text-slate-400 mt-10">Please sign in to view history.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">🔁 Prompt History</h2>

      {loading ? (
        <div className="flex justify-center items-center text-slate-400">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Loading...
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-slate-400">No prompt history found.</div>
      ) : (
        <ul className="space-y-4">
          {prompts.map((p) => (
            <li
              key={p.id}
              className="bg-[#161622] text-slate-300 p-4 rounded-md border border-slate-700"
            >
              <div className="text-sm font-medium">📝 {p.prompt}</div>
              <div className="text-xs mt-1 text-slate-400">Type: {p.type} | Mode: {p.mode}</div>
              {p.createdAt?.toDate && (
                <div className="text-xs text-slate-500 mt-1">
                  {p.createdAt.toDate().toLocaleString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
