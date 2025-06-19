import { useState } from "react";
import axios from "axios";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState("standard");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post("https://your-backend.onrender.com/api/prompt", {
        userInput,
        mode,
      });
      setResponse(res.data.output);
    } catch (error) {
      setResponse("Error: Could not reach the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Mode Assistant</h1>

      <div className="mb-4">
        <label className="block mb-2 text-lg">Mode Selection:</label>
        <select
          className="bg-gray-900 border border-gray-700 p-2 rounded w-full"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="standard">🧑 Standard Mode</option>
          <option value="prometheus">🧠 Prometheus Mode</option>
          <option value="god">🌌 God Mode (Dev Only)</option>
        </select>
      </div>

      <textarea
        className="w-full h-40 bg-gray-800 p-4 rounded mb-4 border border-gray-700"
        placeholder="Ask something..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button
        onClick={sendPrompt}
        disabled={loading}
        className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Send"}
      </button>

      {response && (
        <pre className="mt-6 bg-gray-900 p-4 rounded whitespace-pre-wrap border border-gray-700 overflow-auto">
          {response}
        </pre>
      )}
    </div>
  );
}
