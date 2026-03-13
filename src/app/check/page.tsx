"use client";

import { useState } from "react";
import Link from "next/link";

interface Assessment {
  likelihood: string;
  factors: string[];
  comparables: { address: string; band: string; type: string; value: string }[];
  summary: string;
}

const bands = ["A", "B", "C", "D", "E", "F", "G", "H"];
const propertyTypes = ["Detached", "Semi-detached", "Terraced", "Flat", "Bungalow"];

export default function CheckPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [form, setForm] = useState({
    street: "",
    town: "",
    postcode: "",
    band: "C",
    propertyType: "Semi-detached",
    bedrooms: "3",
    yearBuilt: "",
    extensions: "no",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setAssessment(data);
      setStep(2);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const likelihoodColor = (l: string) => {
    if (l.toLowerCase().includes("likely")) return "text-red-500 bg-red-50 border-red-200";
    if (l.toLowerCase().includes("possibly") || l.toLowerCase().includes("may")) return "text-orange-500 bg-orange-50 border-orange-200";
    return "text-green-500 bg-green-50 border-green-200";
  };

  const showPayButton = assessment && !assessment.likelihood.toLowerCase().includes("correct");

  const handleGetLetter = () => {
    const params = new URLSearchParams({
      street: form.street,
      town: form.town,
      postcode: form.postcode,
      band: form.band,
      propertyType: form.propertyType,
      bedrooms: form.bedrooms,
      yearBuilt: form.yearBuilt,
      extensions: form.extensions,
    });
    window.location.href = `/checkout?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-navy text-white py-4">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="font-bold text-lg">CouncilTaxFighter</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold mb-2">Check Your Council Tax Band</h1>
            <p className="text-gray-600 mb-8">Enter your property details for a free assessment. Takes 30 seconds.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 42 Oak Lane"
                  value={form.street}
                  onChange={(e) => update("street", e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Town / City</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Bristol"
                    value={form.town}
                    onChange={(e) => update("town", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postcode</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. BS1 4DJ"
                    value={form.postcode}
                    onChange={(e) => update("postcode", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Council Tax Band</label>
                  <select
                    value={form.band}
                    onChange={(e) => update("band", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white"
                  >
                    {bands.map((b) => (
                      <option key={b} value={b}>Band {b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Property Type</label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => update("propertyType", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white"
                  >
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Bedrooms</label>
                  <select
                    value={form.bedrooms}
                    onChange={(e) => update("bedrooms", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Approximate Year Built</label>
                  <input
                    type="text"
                    placeholder="e.g. 1985"
                    value={form.yearBuilt}
                    onChange={(e) => update("yearBuilt", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Any extensions or major changes since 1991?</label>
                <select
                  value={form.extensions}
                  onChange={(e) => update("extensions", e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cta-orange hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-lg transition-colors disabled:opacity-60"
              >
                {loading ? "Analysing your property..." : "Get Free Assessment →"}
              </button>
            </form>
          </>
        )}

        {step === 2 && assessment && (
          <>
            <h1 className="text-3xl font-bold mb-2">Your Assessment</h1>
            <p className="text-gray-600 mb-6">
              Property: {form.street}, {form.town}, {form.postcode}
            </p>

            <div className={`border rounded-lg p-6 mb-8 ${likelihoodColor(assessment.likelihood)}`}>
              <div className="text-2xl font-bold mb-2">{assessment.likelihood}</div>
              <p className="text-gray-700">{assessment.summary}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Key Factors</h2>
              <ul className="space-y-2">
                {assessment.factors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">&#9679;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Comparable Properties in Your Area</h2>
              <div className="space-y-3">
                {assessment.comparables.map((c, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-white">
                    <div className="font-medium">{c.address}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {c.type} &middot; Band {c.band} &middot; 1991 value: {c.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showPayButton ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <h2 className="text-xl font-bold mb-2">Get Your VOA Appeal Letter</h2>
                <p className="text-gray-600 mb-4">
                  We&apos;ll generate a professional, VOA-compliant appeal letter tailored to your property for just <strong>£4.99</strong>.
                </p>
                <button
                  onClick={handleGetLetter}
                  className="bg-cta-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
                >
                  Get My Appeal Letter — £4.99
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h2 className="text-xl font-bold text-green-700 mb-2">Good News!</h2>
                <p className="text-gray-600">
                  Based on our analysis, your council tax band appears to be correct. You don&apos;t need to appeal.
                </p>
              </div>
            )}

            <button
              onClick={() => { setStep(1); setAssessment(null); }}
              className="mt-6 text-gray-500 hover:text-gray-700 underline text-sm"
            >
              &larr; Check a different property
            </button>
          </>
        )}
      </div>
    </main>
  );
}
