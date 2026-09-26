export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does the 7-Day Catch-up TV work for the UK time difference?",
    answer: "Because India is 4.5 or 5.5 hours ahead of GMT/BST, Indian primetime serials air around 3:00 PM UK time when you are working. With ChitramTV UK's automatic 7-day catch-up, every show is recorded on our secure UK edge servers. You can pause, rewind, and watch your favourite dramas, news, or cricket matches whenever you sit down in the evening with zero commercials.",
  },
  {
    id: "faq-2",
    question: "Which devices and Smart TVs are supported?",
    answer: "ChitramTV UK works seamlessly on Amazon Fire TV Stick (all generations, 4K & Lite), Android TVs (Sony, Philips, TCL, Panasonic), Google TV, Apple TV 4K, Samsung Smart TVs (Tizen OS), LG Smart TVs (webOS), plus iOS (iPhone/iPad), Android smartphones, tablets, Windows PC, and Mac laptops.",
  },
  {
    id: "faq-3",
    question: "How quickly will I receive my login credentials after paying?",
    answer: "Activation is fully automated. As soon as your PayPal checkout is approved, your personal activation credentials, M3U playlist URL, and step-by-step setup guide will be dispatched immediately to your email address and WhatsApp number within 60 to 120 seconds.",
  },
  {
    id: "faq-4",
    question: "Do I need a VPN or special high-speed broadband in the UK?",
    answer: "No VPN is required. Our dedicated UK CDN servers route streams directly through major British ISPs including Virgin Media, BT, Sky, Vodafone, TalkTalk, and EE. A standard broadband connection of 15 Mbps is plenty for crystal-clear 1080p Full HD, while 30 Mbps is recommended for 4K Ultra HD and 60fps live sports.",
  },
  {
    id: "faq-5",
    question: "How does the PayPal payment work?",
    answer: "We support instant, secure checkout via PayPal in British Pounds (£ GBP). You can pay using your PayPal balance, linked bank account, or any debit/credit card (Visa, Mastercard, Amex) through PayPal's buyer protection system without exposing financial details.",
  },
  {
    id: "faq-6",
    question: "Can I watch on multiple TVs or mobile devices simultaneously?",
    answer: "Yes! Our 1-month plan supports 2 simultaneous streams, the 6-month plan supports 3 devices, and our 12-month (+2 months free) pass supports 4 simultaneous connections—meaning parents can watch Star Plus in the living room while children watch cricket or regional cinema on another screen.",
  },
  {
    id: "faq-7",
    question: "Is there a money-back guarantee?",
    answer: "Yes. We offer an unconditional 7-Day Money-Back Guarantee. If you experience streaming difficulties that our 24/7 UK support team cannot resolve, we will issue a full refund back to your original payment method.",
  },
];
