import React from "react";
import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const benefits = [
  {
    icon: <Truck className="w-6 h-6 text-blue-600" />,
    title: "Free Shipping",
    description: "On orders over ₦100000",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <Headphones className="w-6 h-6 text-blue-600" />,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

function BenefitsSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-bold text-text mb-2">
                {benefit.title}
              </h3>
              <p className="text-text/70 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
