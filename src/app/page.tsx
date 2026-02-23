"use client";

import { useState } from "react";
import { Sparkles, Linkedin, Loader2, Copy, CheckCircle2 } from "lucide-react";

type Variation = {
  type: string;
  content: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [brandVoice, setBrandVoice] = useState("Professional but conversational");
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleTransform = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setVariations([]);
    
    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, brandVoice }),
      });
      
      const data = await res.json();
      if (res.ok && data.variations) {
        setVariations(data.variations);
      } else {
        console.error("Failed to generate", data);
        alert(data.error || "Failed to generate variations");
      }
    } catch (e) {
      console.error(e);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-sky-500/10 rounded-full mb-2 border border-sky-500/20">
            <Linkedin className="h-10 w-10 text-sky-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            LinkedIn Content Transformer
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop staring at a blank page. Drop your raw thought or brain dump below, 
            and our AI will transform it into 5 distinct, high-engagement LinkedIn posts formatted for the algorithm.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Your Raw Thought (or URL)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. I realized today that most SaaS companies overcomplicate their pricing. Simple flat rates actually convert better based on our latest A/B tests."
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none placeholder:text-slate-600"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Brand Voice Focus
                </label>
                <select
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none"
                >
                  <option>Professional but conversational</option>
                  <option>Bold and contrarian</option>
                  <option>Educational and analytical</option>
                  <option>Vulnerable and storytelling</option>
                  <option>Short, punchy "broetry"</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleTransform}
                  disabled={loading || !text.trim()}
                  className="w-full py-3 px-6 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                  Generate 5 Variations
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {variations.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-2xl font-bold text-center border-b border-slate-800 pb-4">
              Your Hook Variations
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              {variations.map((v, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors">
                  <div className="bg-slate-950/50 px-6 py-4 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold ring-1 ring-inset ring-sky-500/20">
                        {i + 1}
                      </span>
                      <h3 className="font-semibold text-slate-200">{v.type}</h3>
                    </div>
                    <button
                      onClick={() => handleCopy(v.content, i)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === i ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="prose prose-invert prose-slate max-w-none text-slate-300 whitespace-pre-wrap text-[15px] leading-relaxed">
                      {v.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
