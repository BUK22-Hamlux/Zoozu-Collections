import React from "react";
import { ArrowRight } from "lucide-react";

function CommunitySection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Gradient Container */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 py-16 px-8 text-center shadow-xl">
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 opacity-90">
              Sign up today and get 15% off your first order
            </p>

            {/* White Button */}
            <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-blue-50 hover:shadow-lg active:scale-95">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Optional: Subtle decorative background blur for depth */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;
