"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

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

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Get Your Appeal Letter</h1>
      <p className="text-gray-600 mb-8">
        One-time payment. No subscription. No hidden fees.
      </p>

      <div className="border rounded-lg p-6 mb-6 bg-white">
        <h2 className="font-semibold mb-3">Your Property</h2>
        <p className="text-gray-700">{details.street}</p>
        <p className="text-gray-700">{details.town}, {details.postcode}</p>
        <p className="text-sm text-gray-500 mt-2">
          Band {details.band} &middot; {details.propertyType} &middot; {details.bedrooms} bed
        </p>
      </div>

      <div className="border rounded-lg p-6 mb-6 bg-white">
        <h2 className="font-semibold mb-3">What You Get</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            Professionally written VOA appeal letter
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            Tailored to your property and area
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            Cites comparable properties and regulations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            Ready to print, sign, and post
          </li>
        </ul>
      </div>

      <div className="border-2 border-orange-300 rounded-lg p-6 mb-6 bg-orange-50 text-center">
        <div className="text-4xl font-extrabold mb-1">£4.99</div>
        <p className="text-gray-600 text-sm">One-time payment &middot; Instant delivery</p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-cta-orange hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-lg transition-colors disabled:opacity-60"
      >
        {loading ? "Processing..." : "Pay £4.99 & Get My Letter"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Secure payment via Stripe. Money-back guarantee.
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-navy text-white py-4">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="font-bold text-lg">CouncilTaxFighter</Link>
        </div>
      </nav>
      <Suspense fallback={<div className="max-w-lg mx-auto px-6 py-12 text-center">Loading...</div>}>
        <CheckoutContent />
      </Suspense>
    </main>
  );
}
