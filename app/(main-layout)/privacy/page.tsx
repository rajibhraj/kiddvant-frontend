import React from "react";

export const metadata = {
  title: "Privacy Policy - KiddVant",
  description: "Privacy Notice and policy details for KiddVant customers.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF8F6] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8BC4F0]/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FB64B6]/10 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative">
          <h1 className="text-4xl font-extrabold text-[#1e3a5f] tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8BC4F0] mb-8">
            Last Updated: June 2026
          </p>

          <p className="text-[#1e3a5f]/80 leading-relaxed mb-8 text-base">
            At KiddVant, we value your privacy and are committed to protecting your personal information.
          </p>

          <div className="space-y-8">
            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">1. Information We Collect</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed mb-3">
                We may collect the following data when you interact with our services:
              </p>
              <ul className="grid grid-cols-2 gap-2 text-[#1e3a5f]/80 text-xs font-medium pl-2">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8BC4F0]" /> Name</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8BC4F0]" /> Phone number</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8BC4F0]" /> Email address</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8BC4F0]" /> Shipping address</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8BC4F0]" /> Payment information</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8BC4F0]" /> Device/browser details</li>
              </ul>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">2. How We Use Your Information</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed mb-3">
                Your information may be used to:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[#1e3a5f]/80 text-xs font-medium pl-2">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Process and verify orders</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Deliver products to your address</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Provide ongoing customer support</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Improve overall website performance</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Send updates, offers, & promotions</li>
              </ul>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">3. Data Protection</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                We use secure systems and reasonable protection measures to safeguard your personal information against unauthorized access or misuse.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">4. Third-Party Services</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                We may use trusted third-party services including payment gateways, analytics providers, and courier partners.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">5. Cookies</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                KiddVant may use cookies to improve user experience, website functionality, and marketing performance.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">6. Marketing Communication</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                By providing your contact information, you agree to receive service updates, promotional offers, and marketing communications. You may unsubscribe at any time.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">7. Children’s Privacy</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                Parents or guardians are responsible for supervising children’s online activities and purchases made through KiddVant.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">8. Policy Updates</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                We may update this Privacy Notice periodically. Updated versions will be published on this page.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">9. Contact</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                For privacy-related questions, please contact:{" "}
                <a href="mailto:support@kiddvant.com" className="font-bold text-[#FB64B6] hover:underline">
                  support@kiddvant.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
