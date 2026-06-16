import React from "react";

export const metadata = {
  title: "Terms of Use - KiddVant",
  description: "Terms of Use for KiddVant products and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F6] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB64B6]/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8BC4F0]/10 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative">
          <h1 className="text-4xl font-extrabold text-[#1e3a5f] tracking-tight mb-2">Terms of Use</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#FB64B6] mb-8">
            Last Updated: June 2026
          </p>

          <p className="text-[#1e3a5f]/80 leading-relaxed mb-8 text-base">
            Welcome to KiddVant. By accessing or using our website, products, or services, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, please discontinue using our website.
          </p>

          <div className="space-y-8">
            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">1. Website Usage</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                You agree to use KiddVant only for lawful purposes and in accordance with the laws of Bangladesh. You must not misuse, hack, disrupt, or attempt unauthorized access to the website or its services.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">2. Product Information</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                We try to ensure that all product descriptions, images, pricing, and availability are accurate. However, slight variations may occur due to lighting, packaging updates, or display settings.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">3. Orders & Payments</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed mb-3">
                All orders are subject to availability and verification. KiddVant reserves the right to cancel or refuse any order suspected of fraud or misuse.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Accepted payment methods:</span>
                <ul className="grid grid-cols-2 gap-2 text-[#1e3a5f] text-xs font-medium">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Cash on Delivery (COD)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Mobile Banking
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Debit/Credit Cards
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FB64B6]" /> Online Payment Gateways
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">4. Shipping & Delivery</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                Delivery timelines may vary depending on the location within Bangladesh. Unexpected delays caused by courier services, weather, strikes, or public holidays may occur.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">5. Returns & Refunds</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                Customers may request returns or replacements for damaged, defective, or incorrect products within 3 days of delivery with valid proof.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">6. Intellectual Property</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                All website content including logos, images, graphics, videos, and written materials are the property of KiddVant and may not be copied or reused without permission.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">7. Limitation of Liability</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                KiddVant shall not be responsible for indirect damages, delays, misuse of products, or temporary service interruptions.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">8. Changes to Terms</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                We reserve the right to update these Terms of Use at any time without prior notice.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">9. Governing Law</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                These Terms shall be governed by the laws of Bangladesh.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
