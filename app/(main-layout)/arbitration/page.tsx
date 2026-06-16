import React from "react";

export const metadata = {
  title: "Arbitration Agreement - KiddVant",
  description: "Arbitration Agreement details for KiddVant customers.",
};

export default function ArbitrationPage() {
  return (
    <div className="bg-[#FAF8F6] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB64B6]/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8BC4F0]/10 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative">
          <h1 className="text-4xl font-extrabold text-[#1e3a5f] tracking-tight mb-2">Arbitration Agreement</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#FB64B6] mb-8">
            Last Updated: June 2026
          </p>

          <p className="text-[#1e3a5f]/80 leading-relaxed mb-8 text-base">
            By using KiddVant, you agree that any dispute, claim, or disagreement arising from the use of our website, products, or services shall first be resolved through friendly discussion and negotiation.
          </p>

          <div className="space-y-8">
            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">1. Informal Resolution</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                Before taking legal action, users agree to contact KiddVant to attempt resolving disputes informally.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">2. Arbitration Process</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                If a dispute cannot be resolved through discussion, the matter may be settled through arbitration under the applicable laws and regulations of Bangladesh.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">3. Limitation on Claims</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                Users agree that disputes will be handled individually and not as part of any group or class action.
              </p>
            </section>

            <section className="border-l-4 border-[#8BC4F0] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">4. Jurisdiction</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                Any legal matters related to KiddVant shall fall under the jurisdiction of the courts of Bangladesh.
              </p>
            </section>

            <section className="border-l-4 border-[#FB64B6] pl-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-2">5. Acceptance</h2>
              <p className="text-[#1e3a5f]/80 text-sm leading-relaxed">
                By accessing or using KiddVant services, you acknowledge that you have read and agreed to this Arbitration Agreement.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
