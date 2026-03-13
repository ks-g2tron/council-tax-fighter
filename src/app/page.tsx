import Link from "next/link";

const steps = [
  { num: "1", title: "Enter Your Details", desc: "Tell us about your property — address, band, type, and size. Takes 30 seconds." },
  { num: "2", title: "Get Free Assessment", desc: "Our AI analyses your property against comparable homes to check your band." },
  { num: "3", title: "Send Our Letter", desc: "If you're overpaying, we generate a VOA-compliant appeal letter for just £4.99." },
];

const faqs = [
  {
    q: "What is a council tax band?",
    a: "Every property in England and Wales is assigned a council tax band (A to H) based on its value as of 1 April 1991. Your band determines how much council tax you pay each year.",
  },
  {
    q: "Can I really appeal my council tax band?",
    a: "Yes. The Valuation Office Agency (VOA) allows homeowners to challenge their band if they believe it's incorrect. You have the right to appeal under the Council Tax (Alteration of Lists and Appeals) Regulations 1993.",
  },
  {
    q: "How much could I save?",
    a: "The average saving from a successful band reduction is around £400 per year. Some homeowners save even more depending on their area and the number of bands they're moved down.",
  },
  {
    q: "How long does the appeal process take?",
    a: "The VOA aims to respond within 2 months. If they agree, your band is changed and you may receive a backdated refund. If they disagree, you can take the matter to a Valuation Tribunal.",
  },
  {
    q: "Is there any risk in appealing?",
    a: "The VOA can increase your band if they find your property is under-banded, though this is rare. Our assessment helps identify whether an appeal is likely to succeed before you commit.",
  },
  {
    q: "What does the £4.99 get me?",
    a: "A professionally written, VOA-compliant appeal letter tailored to your property, citing comparable properties in your area. Just print, sign, and post.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Are You Paying Too Much<br />Council Tax?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            400,000 UK homes are in the wrong band. The average overpayment is <strong className="text-white">£400/year</strong>. Check yours free.
          </p>
          <Link
            href="/check"
            className="inline-block bg-cta-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
          >
            Check My Band Free &rarr;
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-14 h-14 bg-navy text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg">
              <div className="text-3xl mb-3">&#9989;</div>
              <h3 className="font-semibold text-lg mb-1">VOA-Compliant Letters</h3>
              <p className="text-gray-600 text-sm">Professionally written to meet Valuation Office Agency requirements</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-3xl mb-3">&#9201;</div>
              <h3 className="font-semibold text-lg mb-1">Takes 2 Minutes</h3>
              <p className="text-gray-600 text-sm">Quick property check — get your assessment in seconds</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-3xl mb-3">&#128170;</div>
              <h3 className="font-semibold text-lg mb-1">No Win, No Drama</h3>
              <p className="text-gray-600 text-sm">Money-back guarantee if our assessment says you&apos;re in the right band</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-extrabold mb-2">400,000</div>
            <p className="text-gray-300">UK homes in the wrong band</p>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">£400/yr</div>
            <p className="text-gray-300">Average overpayment</p>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">£4.99</div>
            <p className="text-gray-300">For your appeal letter</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="border rounded-lg p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                </summary>
                <p className="mt-3 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Stop Overpaying Council Tax</h2>
          <p className="text-gray-600 mb-8">It takes 2 minutes to check. If you&apos;re in the wrong band, you could save hundreds of pounds a year.</p>
          <Link
            href="/check"
            className="inline-block bg-cta-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
          >
            Check My Band Free &rarr;
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CouncilTaxFighter. All rights reserved.</p>
          <p className="mt-2">This service provides general guidance only and does not constitute legal advice.</p>
        </div>
      </footer>
    </main>
  );
}
