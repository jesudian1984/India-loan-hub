import { ShieldCheck, Lock, FileCheck, UserCheck } from "lucide-react";

const items = [
  { icon: Lock, title: "Encrypted in transit", desc: "All data submitted is sent over TLS-encrypted connections." },
  { icon: UserCheck, title: "Shared only with relevant lenders", desc: "Your details are passed to partner banks/NBFCs only to process your enquiry." },
  { icon: FileCheck, title: "Clear consent record", desc: "We keep a record of the consent you provide so you know exactly what you agreed to." },
  { icon: ShieldCheck, title: "Right to opt-out", desc: "You can ask us to stop contacting you or delete your data by writing to reachus@indialoanhub.com." },
];

const PrivacyAssurance = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Your data, handled responsibly</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          We follow strict data-handling practices so you can submit your enquiry with confidence.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PrivacyAssurance;
