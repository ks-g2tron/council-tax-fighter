"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const details = {
    street: searchParams.get("street") || "",
    town: searchParams.get("town") || "",
    postcode: searchParams.get("postcode") || "",
    band: searchParams.get("band") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    yearBuilt: searchParams.get("yearBuilt") || "",
    extensions: searchParams.get("extensions") || "",
  };

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const res = await fetch("/api/generate-letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        });
        const data = await res.json();
        setLetter(data.letter || "Error generating letter. Please contact support.");
      } catch {
        setLetter("Error generating letter. Please contact support.");
      } finally {
        setLoading(false);
      }
    };
    fetchLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `council-tax-appeal-${details.postcode.replace(/\s/g, "")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
        <div className="text-3xl mb-2">&#10003;</div>
        <h1 className="text-2xl font-bold text-green-700 mb-1">Payment Successful</h1>
        <p className="text-gray-600">Your VOA appeal letter has been generated below.</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-orange-400 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Generating your personalised appeal letter...</p>
        </div>
      ) : (
        <>
          <div className="flex gap-3 mb-4">
            <button
              onClick={handleCopy}
              className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
            <button
              onClick={handleDownload}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Download as Text File
            </button>
          </div>

          <div className="border rounded-lg p-8 bg-white font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {letter}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="font-bold text-lg mb-3">What To Do Next</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Replace <strong>[YOUR NAME]</strong> and <strong>[YOUR ADDRESS]</strong> with your details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Print the letter and sign it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <span>
                  Post it to your local Valuation Office Agency. Find your local VOA office at{" "}
                  <a
                    href="https://www.gov.uk/contact-voa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    gov.uk/contact-voa
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                <span>The VOA will review your case and respond, typically within 2 months</span>
              </li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-navy text-white py-4">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">CouncilTaxFighter</Link>
          <Link href="/check" className="text-sm text-gray-300 hover:text-white">Check Another Property</Link>
        </div>
      </nav>
      <Suspense fallback={<div className="max-w-3xl mx-auto px-6 py-12 text-center">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
