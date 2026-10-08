import React from "react";
import { Star, CheckCircle2, Tv, MapPin } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  device: string;
  comment: string;
  plan: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Manish & Neha Patel",
    location: "Leicester (Belgrave)",
    device: "Amazon Firestick 4K",
    plan: "12+2 Free Months Pass",
    comment: "Finally my elderly parents can watch Star Plus & Zee TV catch-up at 8 PM when they sit down for dinner, instead of missing the 2:30 PM live broadcast. Crystal clear picture and zero buffering."
  },
  {
    name: "Gurpreet Singh",
    location: "West London (Southall)",
    device: "Virgin Media Hub 5",
    plan: "12+2 Free Months Pass",
    comment: "Streamed the entire India cricket test series in 4K 60fps on our 65-inch TV. Absolutely zero lag during the tightest overs. WhatsApp support answered my Firestick Downloader question in 2 minutes."
  },
  {
    name: "Ananya & Rajesh Rao",
    location: "Birmingham (Smethwick)",
    device: "Samsung Smart TV",
    plan: "14 Months Pass",
    comment: "We replaced our old satellite setup. We get Sun TV, Star Maa, and all Hindi soaps for under £6.43 a month. Setup took 3 minutes and PayPal buyer protection gave us complete peace of mind."
  },
  {
    name: "Jaswinder Dhillon",
    location: "Slough (Berkshire)",
    device: "Apple TV 4K",
    plan: "6 Months Pass",
    comment: "Live Gurbani from Sri Harmandir Sahib (Amritsar) every morning on PTC Punjabi is flawless. Having 14-day catch-up for weekend Punjabi dramas has made this indispensable for our home."
  },
  {
    name: "Dr. Amit Sharma",
    location: "Manchester (Altrincham)",
    device: "Sony Google TV",
    plan: "12+2 Free Months Pass",
    comment: "Working NHS hospital shifts means I can never watch live Indian news or evening shows. The 14-day cloud recording lets me catch up at midnight or on my days off without recording hardware."
  },
  {
    name: "Kiran & Dev Shah",
    location: "Harrow (North London)",
    device: "BT Smart Hub 2",
    plan: "4K Box Bundle",
    comment: "We ordered the pre-configured 4K Android Box for my mother. It arrived via Royal Mail in 24 hours, plugged straight into HDMI, and worked immediately. She has her Hindi serials without any confusion."
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-background-elevated/40 border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Trust Rating */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className="font-bold text-gray-900">4.9 / 5</span>
            <span className="text-gray-300">•</span>
            <span>Based on 1,840+ UK Subscriber Reviews</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2c3640] tracking-tight">
            Trusted by British Indian Families Across the UK
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            From London and Leicester to Birmingham and Manchester, discover why UK households choose ChitramTV for daily family streaming.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all shadow-sm space-y-4"
            >
              <div className="space-y-3">
                {/* 5-star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified UK Subscriber
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs text-gray-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-bold text-gray-900 text-xs">{t.name}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                    <MapPin className="h-3 w-3 text-[#dd0e1c] shrink-0" />
                    <span>{t.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-medium text-gray-500 block">{t.device}</span>
                  <span className="text-[10px] text-[#dd0e1c] font-semibold">{t.plan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
