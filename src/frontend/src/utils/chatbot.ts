import { CONTACT_INFO } from "@/config/contact";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  intent: string;
}

interface Intent {
  keywords: string[];
  phrases?: string[]; // Multi-word phrases for better matching
  specificity: number; // Higher = more specific (1-10)
  response: string;
  quickReplies?: QuickReply[];
}

// Normalize text for matching: lowercase, trim, collapse whitespace, remove punctuation
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ") // Replace punctuation with space
    .replace(/\s+/g, " "); // Collapse multiple spaces
}

// Score an intent against user input
function scoreIntent(intent: Intent, userText: string): number {
  const normalized = normalizeText(userText);
  const words = normalized.split(" ");

  let score = 0;

  // Check phrase matches (higher weight)
  if (intent.phrases) {
    for (const phrase of intent.phrases) {
      const normalizedPhrase = normalizeText(phrase);
      if (normalized.includes(normalizedPhrase)) {
        score += 10 * phrase.split(" ").length; // Longer phrases score higher
      }
    }
  }

  // Check keyword matches
  for (const keyword of intent.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (
      words.includes(normalizedKeyword) ||
      normalized.includes(normalizedKeyword)
    ) {
      score += 3;
    }
  }

  // Apply specificity multiplier
  if (score > 0) {
    score *= intent.specificity;
  }

  return score;
}

// Comprehensive intent catalog with specificity ratings
const intents: Intent[] = [
  // Greetings & General (low specificity)
  {
    keywords: [
      "hello",
      "hi",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
      "hiya",
    ],
    specificity: 2,
    response:
      "Hey there! 👋 So glad you stopped by. I'm here to help you find the perfect piece from our handcrafted oxidized silver collection — whether you're browsing for yourself or looking for a gift. What can I help you with today?",
    quickReplies: [
      { id: "q1", text: "Browse products", intent: "navigate-shop" },
      { id: "q2", text: "Shipping info", intent: "shipping" },
      { id: "q3", text: "Place an order", intent: "navigate-order" },
      { id: "q4", text: "Contact us", intent: "navigate-contact" },
    ],
  },

  // 💍 Product Related Questions
  {
    keywords: ["ring", "rings", "band", "bands", "finger ring"],
    phrases: ["show me rings", "looking for rings", "ring collection"],
    specificity: 7,
    response:
      "Oh, our rings are some of my personal favourites! 😍 Each one is handcrafted with intricate details and that gorgeous darkened oxidized finish that makes them really stand out. They look stunning for everyday wear and special occasions alike. Want to take a look at the full collection?",
    quickReplies: [
      { id: "q26", text: "View all products", intent: "navigate-shop" },
      { id: "q27", text: "Ring sizing help", intent: "sizing" },
      { id: "q28", text: "Care tips", intent: "care" },
    ],
  },
  {
    keywords: [
      "pendant",
      "pendants",
      "necklace",
      "necklaces",
      "chain",
      "chains",
    ],
    phrases: [
      "show me necklaces",
      "looking for pendants",
      "necklace collection",
    ],
    specificity: 7,
    response:
      "Great taste! Our necklaces and pendants are truly something special — we have everything from dainty, delicate chains to bold statement pieces, all in oxidized silver. The craftsmanship on each one is really beautiful. Shall I take you to the shop so you can see them for yourself?",
    quickReplies: [
      { id: "q28", text: "Browse collection", intent: "navigate-shop" },
      { id: "q29", text: "Chain length info", intent: "sizing" },
      { id: "q30", text: "Materials", intent: "materials" },
    ],
  },
  {
    keywords: ["bracelet", "bracelets", "bangle", "bangles", "wrist", "cuff"],
    phrases: [
      "show me bracelets",
      "looking for bracelets",
      "bracelet collection",
    ],
    specificity: 7,
    response:
      "Love that you're looking at bracelets! Ours range from delicate, everyday chains to bold cuffs and bangles — all handcrafted in oxidized silver. The best part? They actually get more beautiful with wear as they develop their own unique character. Want to explore the designs?",
    quickReplies: [
      { id: "q30", text: "See bracelets", intent: "navigate-shop" },
      { id: "q31", text: "Wrist sizing", intent: "sizing" },
      { id: "q32", text: "Care guide", intent: "care" },
    ],
  },
  {
    keywords: ["earring", "earrings", "ear", "stud", "studs", "drop", "dangle"],
    phrases: ["show me earrings", "looking for earrings", "earring collection"],
    specificity: 7,
    response:
      "Earrings are such a great choice! We have everything from subtle, everyday studs to elegant drop designs that really make a statement. They're all lightweight and comfortable for all-day wear, crafted in oxidized silver. Would you like to see them?",
    quickReplies: [
      { id: "q32", text: "View earrings", intent: "navigate-shop" },
      { id: "q33", text: "Hypoallergenic info", intent: "hypoallergenic" },
      { id: "q34", text: "Browse all", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "shop",
      "browse",
      "products",
      "catalog",
      "collection",
      "jewelry",
      "items",
      "see",
      "show",
      "view",
      "display",
      "available",
      "stock",
      "inventory",
    ],
    phrases: [
      "what do you have",
      "show me products",
      "what types",
      "what kind",
    ],
    specificity: 3, // Lower specificity - broad intent
    response:
      "Oh, I'd love to show you what we have! 🌙 We specialize in handcrafted oxidized silver jewelry — rings, pendants, necklaces, bracelets, earrings, and more. Every piece has that signature darkened finish that really brings out the intricate details. Is there a particular type of piece you're drawn to?",
    quickReplies: [
      { id: "q5", text: "View shop", intent: "navigate-shop" },
      { id: "q6", text: "Rings", intent: "ring" },
      { id: "q7", text: "Necklaces", intent: "pendant" },
      { id: "q8", text: "Earrings", intent: "earring" },
    ],
  },
  {
    keywords: [
      "gold",
      "diamond",
      "platinum",
      "gemstone",
      "precious stone",
      "ruby",
      "emerald",
      "sapphire",
    ],
    phrases: ["do you have gold", "any diamond jewelry", "gold pieces"],
    specificity: 8,
    response:
      "That's a fair question! We actually focus exclusively on oxidized sterling silver — it's our passion and our craft. The vintage, darkened aesthetic is really unique and something you won't find everywhere. Each piece is made from premium sterling silver (92.5% pure). I think once you see the collection, you might fall in love with it! Want to take a look?",
    quickReplies: [
      { id: "q8", text: "About our silver", intent: "materials" },
      { id: "q9", text: "Browse collection", intent: "navigate-shop" },
      { id: "q10", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: ["real", "pure", "authentic", "genuine", "fake"],
    phrases: ["is this real", "is it genuine", "authentic silver"],
    specificity: 8,
    response:
      "Absolutely, yes! 💯 Every single piece is crafted from genuine sterling silver — that's 92.5% pure silver. The oxidized finish is a professional treatment that creates the beautiful darkened patina, not a coating or paint. It's the real deal, handcrafted with care. Any other questions about what goes into our jewelry?",
    quickReplies: [
      { id: "q11", text: "Quality details", intent: "quality" },
      { id: "q12", text: "View products", intent: "navigate-shop" },
      { id: "q13", text: "Care instructions", intent: "care" },
    ],
  },
  {
    keywords: [
      "price",
      "cost",
      "how much",
      "expensive",
      "cheap",
      "affordable",
      "value",
      "worth",
    ],
    phrases: ["how much does", "what is the price", "price range"],
    specificity: 6,
    response:
      "Great question! Prices vary by piece depending on the design complexity and materials used — you'll find each item's price listed right in the shop. We really believe in fair pricing for handcrafted quality that's built to last. Want to browse and see what catches your eye?",
    quickReplies: [
      { id: "q13", text: "Browse shop", intent: "navigate-shop" },
      { id: "q14", text: "Place order", intent: "navigate-order" },
    ],
  },
  {
    keywords: [
      "lightweight",
      "light",
      "daily wear",
      "everyday",
      "casual",
      "work",
      "office",
      "simple",
      "minimalist",
    ],
    phrases: ["for daily wear", "everyday jewelry", "lightweight pieces"],
    specificity: 7,
    response:
      "Oh, we have so many pieces perfect for everyday wear! Our simpler rings, delicate chains, and stud earrings are especially popular for daily use — they're comfortable, lightweight, and look great with anything. Oxidized silver is also really durable and actually develops a lovely patina the more you wear it. What style are you going for?",
    quickReplies: [
      { id: "q15", text: "View collection", intent: "navigate-shop" },
      { id: "q16", text: "Care tips", intent: "care" },
      { id: "q17", text: "Materials info", intent: "materials" },
    ],
  },
  {
    keywords: ["latest", "new", "newest", "recent", "current"],
    phrases: ["latest collection", "new arrivals", "newest pieces"],
    specificity: 6,
    response:
      "You're in for a treat! Our current collection is full of beautiful handcrafted oxidized silver pieces — each one unique and made with real attention to detail. Head over to the shop to see everything we have available right now. I think you'll find something you love!",
    quickReplies: [
      { id: "q17", text: "Browse shop", intent: "navigate-shop" },
      { id: "q18", text: "About our craft", intent: "navigate-about" },
    ],
  },
  {
    keywords: [
      "men",
      "women",
      "kids",
      "children",
      "boys",
      "girls",
      "unisex",
      "gender",
    ],
    phrases: ["for men", "for women", "mens jewelry", "womens jewelry"],
    specificity: 6,
    response:
      "Such a thoughtful question! Our jewelry is designed to be timeless and versatile — many pieces are unisex, and we have designs that suit a wide range of styles and preferences. What type of piece are you thinking about? I'd love to help you find the right fit!",
    quickReplies: [
      { id: "q19", text: "View all products", intent: "navigate-shop" },
      { id: "q20", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "bestseller",
      "best selling",
      "popular",
      "favorite",
      "top",
      "recommend",
      "suggestion",
    ],
    phrases: ["most popular", "best sellers", "what do you recommend"],
    specificity: 6,
    response:
      "Honestly, it's hard to pick just one — our customers love so many different pieces! That said, for everyday elegance, our rings and stud earrings are always a hit. For something more special, our statement pendants and drop earrings are stunning. What's the occasion? I can help narrow it down!",
    quickReplies: [
      { id: "q21", text: "Browse all", intent: "navigate-shop" },
      { id: "q22", text: "Gift ideas", intent: "gift" },
      { id: "q23", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: ["bridal", "wedding", "bride", "engagement", "marriage"],
    phrases: ["for wedding", "bridal jewelry", "wedding pieces"],
    specificity: 8,
    response:
      "How exciting — congratulations! 🎉 Our oxidized silver jewelry makes for truly unique and beautiful bridal pieces. The vintage aesthetic adds so much character to a wedding look. For specific bridal requests or custom designs, I'd really recommend reaching out to us directly so we can help bring your vision to life!",
    quickReplies: [
      { id: "q23", text: "View collection", intent: "navigate-shop" },
      { id: "q24", text: "Custom requests", intent: "custom" },
      { id: "q25", text: "Contact us", intent: "navigate-contact" },
    ],
  },

  // 📏 Size & Customization
  {
    keywords: [
      "size",
      "sizing",
      "fit",
      "measure",
      "measurement",
      "dimensions",
      "length",
      "width",
    ],
    phrases: ["ring size", "how to measure", "what size", "know my size"],
    specificity: 7,
    response:
      "Getting the right fit is so important — I totally understand! For rings, you can measure your finger circumference or use a ring sizer. For bracelets, just measure around your wrist. For necklaces, we offer standard lengths. Not sure? No worries — our team is happy to walk you through it!",
    quickReplies: [
      {
        id: "q34",
        text: "Contact for sizing help",
        intent: "navigate-contact",
      },
      { id: "q35", text: "Browse products", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "customize",
      "customization",
      "custom",
      "personalize",
      "bespoke",
      "special",
      "unique",
      "design",
      "commission",
    ],
    phrases: [
      "custom design",
      "personalized jewelry",
      "make custom",
      "design request",
    ],
    specificity: 8,
    response:
      "Oh, we absolutely love making something special for someone! 💛 While our current collection has a lot of beautiful ready-made designs, we're always happy to chat about custom requests and personalization. What did you have in mind? Drop us a message and let's explore the possibilities together!",
    quickReplies: [
      { id: "q36", text: "Contact us", intent: "navigate-contact" },
      { id: "q37", text: "See current designs", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "engrave",
      "engraving",
      "inscribe",
      "inscription",
      "name",
      "date",
      "message",
      "text",
    ],
    phrases: ["can you engrave", "engraving options", "add name", "add date"],
    specificity: 9,
    response:
      "That's such a lovely idea — engraved jewelry makes the most meaningful gifts! Yes, we can definitely discuss engraving options. Just reach out to us with the details: what you'd like engraved (a name, date, or message) and which piece you have in mind. We'll let you know what's possible and sort out the timing and pricing for you.",
    quickReplies: [
      { id: "q38", text: "Contact us", intent: "navigate-contact" },
      { id: "q39", text: "Browse jewelry", intent: "navigate-shop" },
    ],
  },
  {
    keywords: ["timeline", "how long"],
    phrases: [
      "customization time",
      "custom timeline",
      "how long custom",
      "custom take",
    ],
    specificity: 9,
    response:
      "Good thinking to ask ahead! Custom timelines really depend on the complexity of the design, but typically custom pieces take around 2–4 weeks from design approval to completion. Reach out to us with your specific request and we'll give you a much more accurate estimate — we always try to be upfront about timing!",
    quickReplies: [
      { id: "q42", text: "Contact us", intent: "navigate-contact" },
      { id: "q43", text: "Browse ready-made", intent: "navigate-shop" },
    ],
  },

  // 💰 Pricing & Offers
  {
    keywords: [
      "discount",
      "sale",
      "promo",
      "promotion",
      "coupon",
      "deal",
      "offer",
      "special",
    ],
    phrases: ["any discounts", "ongoing offer", "current sale", "promo code"],
    specificity: 7,
    response:
      "Who doesn't love a good deal, right? 😄 We do run special promotions from time to time! The best way to stay in the loop is to check our shop regularly or get in touch with us to be added to our mailing list. Is there something specific you're eyeing?",
    quickReplies: [
      { id: "q44", text: "View current collection", intent: "navigate-shop" },
      { id: "q45", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "emi",
      "installment",
      "payment plan",
      "monthly payment",
      "pay later",
    ],
    phrases: ["payment plan", "installment option", "pay in installments"],
    specificity: 9,
    response:
      "Totally understandable — we want to make it as easy as possible for you! Payment options, including installments, can be discussed when we confirm your order. We work with each customer individually to find an arrangement that works for you. Want to go ahead and submit an order request?",
    quickReplies: [
      { id: "q46", text: "Submit order request", intent: "navigate-order" },
      { id: "q47", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "making charge",
      "making charges",
      "labor charge",
      "crafting charge",
      "workmanship charge",
    ],
    phrases: ["making charges", "labor cost", "crafting fee"],
    specificity: 9,
    response:
      "No hidden fees here — promise! 🙌 Our prices include everything: crafting, materials, the works. The price you see is the complete price. We really believe in keeping things transparent and straightforward for our customers.",
    quickReplies: [
      { id: "q48", text: "Browse shop", intent: "navigate-shop" },
      { id: "q49", text: "Place order", intent: "navigate-order" },
    ],
  },
  {
    keywords: ["gst", "tax", "taxes", "vat"],
    phrases: ["include tax", "price include tax", "tax details"],
    specificity: 8,
    response:
      "Great question! Tax details are confirmed when you place your order — applicable taxes will be clearly communicated based on your location. We always make sure everything is fully transparent so there are no surprises at checkout.",
    quickReplies: [
      { id: "q50", text: "Submit order request", intent: "navigate-order" },
      { id: "q51", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "festival sale",
      "holiday sale",
      "diwali",
      "christmas",
      "seasonal sale",
    ],
    phrases: ["festival sale", "holiday discount", "seasonal offer"],
    specificity: 8,
    response:
      "Ooh, festive shopping — love it! 🎊 We do sometimes offer special promotions during festivals and holidays. Keep an eye on our shop or reach out to us directly to stay in the know about any upcoming sales or special offers. It's always worth checking!",
    quickReplies: [
      { id: "q52", text: "Browse collection", intent: "navigate-shop" },
      { id: "q53", text: "Contact us", intent: "navigate-contact" },
    ],
  },

  // 🚚 Delivery & Shipping
  {
    keywords: ["shipping", "delivery", "ship", "send", "receive", "arrive"],
    phrases: [
      "how long delivery",
      "shipping time",
      "when will arrive",
      "delivery timeline",
    ],
    specificity: 8,
    response:
      "We take great care packaging every piece before it goes out! Typical delivery is around 5–10 business days depending on your location. All the shipping details, timelines, and costs are confirmed when you place your order, and we'll send you tracking info as soon as it ships so you can follow its journey to you! 📦",
    quickReplies: [
      { id: "q54", text: "Place an order", intent: "navigate-order" },
      { id: "q55", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "deliver to",
      "ship to",
      "location",
      "my area",
      "my city",
      "international",
      "worldwide",
    ],
    phrases: [
      "ship to",
      "deliver to",
      "shipping location",
      "international shipping",
    ],
    specificity: 8,
    response:
      "We ship to quite a few locations! Just reach out to us with your specific location and we'll confirm the shipping options, timelines, and costs for you. We want to make sure your jewelry reaches you safely, no matter where you are! 🌍",
    quickReplies: [
      { id: "q56", text: "Contact us", intent: "navigate-contact" },
      { id: "q57", text: "Browse products", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "free shipping",
      "shipping free",
      "free delivery",
      "no shipping cost",
    ],
    phrases: ["free shipping", "shipping cost", "delivery charge"],
    specificity: 9,
    response:
      "Shipping costs depend on your location and order size — we'll give you the exact amount when you submit your order request, so no surprises! Rest assured, we pack everything really carefully to make sure it arrives safely and beautifully.",
    quickReplies: [
      { id: "q58", text: "Submit order request", intent: "navigate-order" },
      { id: "q59", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "track",
      "tracking",
      "track order",
      "where is my order",
      "order status",
    ],
    phrases: [
      "track order",
      "tracking number",
      "order status",
      "where is my order",
    ],
    specificity: 9,
    response:
      "Once your order ships, we'll send tracking information straight to your email so you can keep an eye on your package every step of the way. If you have any questions about your order in the meantime, just reach out — we're always happy to help!",
    quickReplies: [
      { id: "q60", text: "Contact us", intent: "navigate-contact" },
      {
        id: "q61",
        text: "Order tracking info",
        intent: "navigate-order-tracking",
      },
    ],
  },
  {
    keywords: [
      "packaging",
      "package",
      "box",
      "gift wrap",
      "gift box",
      "wrapped",
    ],
    phrases: ["gift packaging", "gift wrap", "how is it packaged"],
    specificity: 8,
    response:
      "Every order is packaged with real care and attention — we want the unboxing experience to feel special! If you're sending it as a gift, just let us know when you place your order and we'll make sure it's presented beautifully. 🎁",
    quickReplies: [
      { id: "q62", text: "Place an order", intent: "navigate-order" },
      { id: "q63", text: "Contact us", intent: "navigate-contact" },
    ],
  },

  // 🔄 Returns & Exchanges
  {
    keywords: [
      "return",
      "returns",
      "refund",
      "exchange",
      "replace",
      "replacement",
      "money back",
    ],
    phrases: [
      "return policy",
      "can I return",
      "exchange policy",
      "refund policy",
    ],
    specificity: 8,
    response:
      "I completely understand wanting to know this before you buy! We do have a return and exchange policy in place. For the full details, please check our Returns page or reach out to us directly — we always want to make sure you're happy with your purchase.",
    quickReplies: [
      { id: "q64", text: "View returns policy", intent: "navigate-returns" },
      { id: "q65", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: ["damaged", "broken", "defective", "wrong item", "incorrect"],
    phrases: [
      "received damaged",
      "item broken",
      "wrong order",
      "defective item",
    ],
    specificity: 9,
    response:
      "Oh no, I'm so sorry to hear that! That's definitely not the experience we want for you. Please reach out to us right away with your order details and a photo if possible — we'll make it right for you as quickly as we can. 💙",
    quickReplies: [
      { id: "q66", text: "Contact us now", intent: "navigate-contact" },
    ],
  },

  // 🧴 Care & Maintenance
  {
    keywords: [
      "care",
      "maintain",
      "maintenance",
      "clean",
      "cleaning",
      "polish",
      "tarnish",
      "tarnishing",
    ],
    phrases: [
      "how to care",
      "care instructions",
      "how to clean",
      "prevent tarnish",
    ],
    specificity: 8,
    response:
      "Such a good thing to know! Oxidized silver is actually pretty easy to care for. Keep it away from water, perfumes, and harsh chemicals. Store it in a cool, dry place — ideally in a soft pouch or box. A gentle wipe with a soft cloth keeps it looking beautiful. The oxidized finish is meant to have character, so don't worry about light wear — it only adds to the charm! ✨",
    quickReplies: [
      { id: "q67", text: "Browse jewelry", intent: "navigate-shop" },
      { id: "q68", text: "Materials info", intent: "materials" },
    ],
  },
  {
    keywords: ["water", "swim", "shower", "bath", "rain", "wet"],
    phrases: ["wear in water", "shower with jewelry", "swimming with jewelry"],
    specificity: 9,
    response:
      "Good question — and honestly, it's best to keep your oxidized silver jewelry away from water when you can. Prolonged exposure to water can affect the oxidized finish over time. So I'd recommend taking it off before swimming or showering. A little care goes a long way in keeping it looking gorgeous! 💧",
    quickReplies: [
      { id: "q69", text: "More care tips", intent: "care" },
      { id: "q70", text: "Browse jewelry", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "hypoallergenic",
      "allergy",
      "allergic",
      "sensitive skin",
      "skin reaction",
      "nickel",
    ],
    phrases: [
      "skin allergy",
      "allergic to jewelry",
      "sensitive to metal",
      "nickel free",
    ],
    specificity: 9,
    response:
      "That's such an important thing to check! Our jewelry is made from sterling silver (92.5% pure), which is generally well-tolerated by most people with sensitive skin. That said, if you have a known metal allergy, I'd recommend reaching out to us directly so we can give you the most accurate information for your specific situation.",
    quickReplies: [
      { id: "q71", text: "Contact us", intent: "navigate-contact" },
      { id: "q72", text: "Materials info", intent: "materials" },
    ],
  },

  // 🔬 Materials & Quality
  {
    keywords: [
      "material",
      "materials",
      "silver",
      "sterling",
      "quality",
      "metal",
      "alloy",
      "composition",
    ],
    phrases: ["what material", "made of", "silver quality", "sterling silver"],
    specificity: 7,
    response:
      "We use only premium sterling silver — that's 92.5% pure silver — for all our pieces. The oxidized finish is a professional treatment that creates the beautiful darkened patina you see. It's not a coating or plating; it's a chemical process that becomes part of the metal itself. Real quality, through and through! 🌟",
    quickReplies: [
      { id: "q73", text: "Authenticity info", intent: "real" },
      { id: "q74", text: "Care instructions", intent: "care" },
      { id: "q75", text: "Browse shop", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "hallmark",
      "certified",
      "certification",
      "stamp",
      "bis",
      "hallmarked",
    ],
    phrases: [
      "is it hallmarked",
      "certification details",
      "quality certification",
    ],
    specificity: 9,
    response:
      "Great question — quality matters! For specific details about hallmarking and certifications on our pieces, please reach out to us directly. We're happy to provide all the information you need to feel confident in your purchase.",
    quickReplies: [
      { id: "q76", text: "Contact us", intent: "navigate-contact" },
      { id: "q77", text: "Quality details", intent: "navigate-quality" },
    ],
  },

  // 🛒 Ordering Process
  {
    keywords: [
      "order",
      "buy",
      "purchase",
      "checkout",
      "cart",
      "add to cart",
      "how to order",
    ],
    phrases: [
      "how to buy",
      "place an order",
      "how to order",
      "ordering process",
    ],
    specificity: 6,
    response:
      "Ordering is really simple! Browse our shop, add the pieces you love to your cart, and then submit an order request with your details. Since we're a boutique, we confirm each order personally — no automated checkout. We'll be in touch to confirm everything and arrange payment. Ready to get started?",
    quickReplies: [
      { id: "q78", text: "Browse shop", intent: "navigate-shop" },
      { id: "q79", text: "Submit order request", intent: "navigate-order" },
      { id: "q80", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: [
      "payment",
      "pay",
      "upi",
      "card",
      "cash",
      "bank transfer",
      "online payment",
    ],
    phrases: [
      "payment methods",
      "how to pay",
      "payment options",
      "accepted payments",
    ],
    specificity: 8,
    response:
      "We offer flexible payment options! The specific methods available are confirmed when we process your order — we work with each customer to find what's most convenient. Just submit an order request or reach out to us and we'll sort it all out together.",
    quickReplies: [
      { id: "q81", text: "Submit order request", intent: "navigate-order" },
      { id: "q82", text: "Contact us", intent: "navigate-contact" },
      { id: "q83", text: "Payment methods info", intent: "navigate-payment" },
    ],
  },
  {
    keywords: ["cod", "cash on delivery", "pay on delivery"],
    phrases: ["cash on delivery", "pay when delivered", "cod available"],
    specificity: 9,
    response:
      "Cash on delivery availability depends on your location and order details. When you submit your order request, we'll confirm what payment options are available for you — we always try to be as flexible as possible!",
    quickReplies: [
      { id: "q84", text: "Submit order request", intent: "navigate-order" },
      { id: "q85", text: "Contact us", intent: "navigate-contact" },
    ],
  },
  {
    keywords: ["cancel", "cancellation", "cancel order"],
    phrases: ["cancel my order", "order cancellation", "can I cancel"],
    specificity: 9,
    response:
      "If you need to cancel an order, please reach out to us as soon as possible — the sooner we know, the easier it is to sort out. We'll do our best to accommodate your request and make the process as smooth as possible for you.",
    quickReplies: [
      { id: "q86", text: "Contact us", intent: "navigate-contact" },
    ],
  },

  // 🎁 Gifting
  {
    keywords: [
      "gift",
      "gifting",
      "present",
      "birthday",
      "anniversary",
      "surprise",
    ],
    phrases: [
      "as a gift",
      "gift for her",
      "gift for him",
      "birthday gift",
      "anniversary gift",
    ],
    specificity: 7,
    response:
      "Aww, jewelry makes the most thoughtful gift! 🎁 Our oxidized silver pieces are really special — they feel personal and unique in a way that mass-produced jewelry just doesn't. For birthdays, anniversaries, or just because — we can help you find the perfect piece. What's the occasion and who's it for?",
    quickReplies: [
      { id: "q87", text: "Browse collection", intent: "navigate-shop" },
      { id: "q88", text: "Custom/engraving", intent: "engrave" },
      { id: "q89", text: "Contact us", intent: "navigate-contact" },
    ],
  },

  // 🏪 About the Brand
  {
    keywords: [
      "about",
      "story",
      "brand",
      "who are you",
      "lunara",
      "company",
      "founder",
      "history",
    ],
    phrases: ["about lunara", "your story", "who makes", "brand story"],
    specificity: 6,
    response:
      "I love talking about this! 🌙 Lunara Jewels is a boutique jewelry brand with a real passion for handcrafted oxidized silver. Every piece is made with care and intention — we're not a factory, we're artisans. Want to learn more about our story and what drives us?",
    quickReplies: [
      { id: "q90", text: "Read our story", intent: "navigate-about" },
      { id: "q91", text: "Browse collection", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "store",
      "physical store",
      "visit",
      "showroom",
      "walk in",
      "offline",
    ],
    phrases: [
      "physical store",
      "visit your store",
      "come to your shop",
      "offline store",
    ],
    specificity: 8,
    response:
      "We're currently an online-only boutique — no physical storefront just yet! But don't worry, we're very hands-on and personal in how we work with customers. You can reach us anytime through our Contact page and we'll give you the same attentive service you'd get in person. 😊",
    quickReplies: [
      { id: "q92", text: "Contact us", intent: "navigate-contact" },
      { id: "q93", text: "Browse online", intent: "navigate-shop" },
    ],
  },
  {
    keywords: [
      "contact",
      "reach",
      "email",
      "phone",
      "call",
      "whatsapp",
      "message",
      "support",
      "help",
    ],
    phrases: [
      "how to contact",
      "get in touch",
      "reach you",
      "customer support",
    ],
    specificity: 6,
    response: `Of course! We'd love to hear from you. Here's how to reach us:\n\n📧 Email: ${CONTACT_INFO.email}\n📞 Phone: ${CONTACT_INFO.phoneFormatted}\n📍 Based in ${CONTACT_INFO.locationFull}\n\nYou can also use our Contact page to send us a message directly. We try to respond as quickly as we can!`,
    quickReplies: [
      { id: "q94", text: "Go to Contact page", intent: "navigate-contact" },
      { id: "q95", text: "Browse shop", intent: "navigate-shop" },
    ],
  },

  // ⭐ Reviews & Trust
  {
    keywords: [
      "review",
      "reviews",
      "testimonial",
      "feedback",
      "rating",
      "customer review",
    ],
    phrases: ["customer reviews", "what do customers say", "read reviews"],
    specificity: 7,
    response:
      "We're so proud of the love our customers show us! 💛 Our pieces have made a lot of people really happy — from everyday wearers to gift-givers. Want to read what our customers have to say? I can take you to our reviews page!",
    quickReplies: [
      { id: "q96", text: "Read reviews", intent: "navigate-reviews" },
      { id: "q97", text: "Browse shop", intent: "navigate-shop" },
    ],
  },

  // ❓ Fallback
  {
    keywords: [
      "help",
      "question",
      "info",
      "information",
      "know",
      "tell",
      "explain",
      "what",
      "how",
      "why",
      "when",
      "where",
    ],
    specificity: 1,
    response:
      "I'm here to help! 😊 I can answer questions about our jewelry, materials, sizing, shipping, ordering, and more. What would you like to know? If your question is a bit more complex, our team is always just a message away on the Contact page.",
    quickReplies: [
      { id: "q98", text: "Browse products", intent: "navigate-shop" },
      { id: "q99", text: "Shipping info", intent: "shipping" },
      { id: "q100", text: "Contact us", intent: "navigate-contact" },
    ],
  },
];

// Default fallback response
const fallbackResponse = {
  response:
    "Hmm, I'm not quite sure I caught that — sorry about that! 😅 I'm best at answering questions about our jewelry, materials, sizing, shipping, and ordering. Could you try rephrasing, or pick one of the options below? And if you need something more specific, our team is always happy to help on the Contact page!",
  quickReplies: [
    { id: "fb1", text: "Browse products", intent: "navigate-shop" },
    { id: "fb2", text: "Shipping info", intent: "shipping" },
    { id: "fb3", text: "Place an order", intent: "navigate-order" },
    { id: "fb4", text: "Contact us", intent: "navigate-contact" },
  ],
};

export function getBotResponse(userInput: string): {
  response: string;
  quickReplies: QuickReply[];
} {
  if (!userInput.trim()) {
    return fallbackResponse;
  }

  // Score all intents
  const scored = intents.map((intent) => ({
    intent,
    score: scoreIntent(intent, userInput),
  }));

  // Find best match
  const best = scored.reduce((a, b) => (a.score > b.score ? a : b));

  // Return best match if score is high enough, otherwise fallback
  if (best.score > 0) {
    return {
      response: best.intent.response,
      quickReplies: best.intent.quickReplies || [],
    };
  }

  return fallbackResponse;
}

export function getInitialQuickReplies(): QuickReply[] {
  return [
    { id: "iq1", text: "Browse products", intent: "navigate-shop" },
    { id: "iq2", text: "Shipping info", intent: "shipping" },
    { id: "iq3", text: "Place an order", intent: "navigate-order" },
    { id: "iq4", text: "Contact us", intent: "navigate-contact" },
  ];
}
