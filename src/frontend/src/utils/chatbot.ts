export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
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
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with space
    .replace(/\s+/g, ' '); // Collapse multiple spaces
}

// Score an intent against user input
function scoreIntent(intent: Intent, userText: string): number {
  const normalized = normalizeText(userText);
  const words = normalized.split(' ');
  
  let score = 0;
  let matchedKeywords = 0;
  let matchedPhrases = 0;

  // Check phrase matches (higher weight)
  if (intent.phrases) {
    for (const phrase of intent.phrases) {
      const normalizedPhrase = normalizeText(phrase);
      if (normalized.includes(normalizedPhrase)) {
        matchedPhrases++;
        score += 10 * phrase.split(' ').length; // Longer phrases score higher
      }
    }
  }

  // Check keyword matches
  for (const keyword of intent.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (words.includes(normalizedKeyword) || normalized.includes(normalizedKeyword)) {
      matchedKeywords++;
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
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'hiya'],
    specificity: 2,
    response: "Hello! I'm here to help you with any questions about our handcrafted oxidized silver jewelry. What would you like to know?",
    quickReplies: [
      { id: 'q1', text: 'Browse products', intent: 'navigate-shop' },
      { id: 'q2', text: 'Shipping info', intent: 'shipping' },
      { id: 'q3', text: 'Place an order', intent: 'navigate-order' },
      { id: 'q4', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 💍 Product Related Questions
  {
    keywords: ['ring', 'rings', 'band', 'bands', 'finger ring'],
    phrases: ['show me rings', 'looking for rings', 'ring collection'],
    specificity: 7,
    response: "Our oxidized silver rings feature intricate handcrafted details with a signature darkened finish. Each ring is designed for both everyday elegance and special occasions. Would you like to see our full collection?",
    quickReplies: [
      { id: 'q26', text: 'View all products', intent: 'navigate-shop' },
      { id: 'q27', text: 'Ring sizing help', intent: 'sizing' },
      { id: 'q28', text: 'Care tips', intent: 'care' },
    ],
  },
  {
    keywords: ['pendant', 'pendants', 'necklace', 'necklaces', 'chain', 'chains'],
    phrases: ['show me necklaces', 'looking for pendants', 'necklace collection'],
    specificity: 7,
    response: "Our necklaces and pendants range from delicate chains to statement pieces, all in oxidized silver. Each piece showcases beautiful craftsmanship that complements any style. Interested in seeing them?",
    quickReplies: [
      { id: 'q28', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q29', text: 'Chain length info', intent: 'sizing' },
      { id: 'q30', text: 'Materials', intent: 'materials' },
    ],
  },
  {
    keywords: ['bracelet', 'bracelets', 'bangle', 'bangles', 'wrist', 'cuff'],
    phrases: ['show me bracelets', 'looking for bracelets', 'bracelet collection'],
    specificity: 7,
    response: "Our bracelets combine elegance with durability—from delicate chains to bold statement pieces. Each one is crafted to develop beautiful character over time. Want to explore our bracelet designs?",
    quickReplies: [
      { id: 'q30', text: 'See bracelets', intent: 'navigate-shop' },
      { id: 'q31', text: 'Wrist sizing', intent: 'sizing' },
      { id: 'q32', text: 'Care guide', intent: 'care' },
    ],
  },
  {
    keywords: ['earring', 'earrings', 'ear', 'stud', 'studs', 'drop', 'dangle'],
    phrases: ['show me earrings', 'looking for earrings', 'earring collection'],
    specificity: 7,
    response: "Our earring collection includes both subtle studs and elegant drop designs. All are lightweight, comfortable for daily wear, and crafted in oxidized silver. Would you like to see them?",
    quickReplies: [
      { id: 'q32', text: 'View earrings', intent: 'navigate-shop' },
      { id: 'q33', text: 'Hypoallergenic info', intent: 'hypoallergenic' },
      { id: 'q34', text: 'Browse all', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['shop', 'browse', 'products', 'catalog', 'collection', 'jewelry', 'items', 'see', 'show', 'view', 'display', 'available', 'stock', 'inventory'],
    phrases: ['what do you have', 'show me products', 'what types', 'what kind'],
    specificity: 3, // Lower specificity - broad intent
    response: "We specialize in handcrafted oxidized silver jewelry! Our collection includes rings, pendants, necklaces, bracelets, and earrings—each with a signature darkened finish that highlights intricate details. What type of piece interests you most?",
    quickReplies: [
      { id: 'q5', text: 'View shop', intent: 'navigate-shop' },
      { id: 'q6', text: 'Rings', intent: 'ring' },
      { id: 'q7', text: 'Necklaces', intent: 'pendant' },
      { id: 'q8', text: 'Earrings', intent: 'earring' },
    ],
  },
  {
    keywords: ['gold', 'diamond', 'platinum', 'gemstone', 'precious stone', 'ruby', 'emerald', 'sapphire'],
    phrases: ['do you have gold', 'any diamond jewelry', 'gold pieces'],
    specificity: 8,
    response: "We specialize exclusively in oxidized sterling silver rather than gold or diamond pieces. Our focus is on the unique vintage aesthetic of oxidized silver—each piece is crafted from premium sterling silver (92.5% pure). Would you like to explore our silver collection?",
    quickReplies: [
      { id: 'q8', text: 'About our silver', intent: 'materials' },
      { id: 'q9', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q10', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['real', 'pure', 'authentic', 'genuine', 'fake'],
    phrases: ['is this real', 'is it genuine', 'authentic silver'],
    specificity: 8,
    response: "Yes, absolutely! All our jewelry is crafted from genuine sterling silver (92.5% pure silver). The oxidized finish is a professional treatment that creates the signature darkened patina—it's authentic, handcrafted quality. Any other questions about our materials?",
    quickReplies: [
      { id: 'q11', text: 'Quality details', intent: 'quality' },
      { id: 'q12', text: 'View products', intent: 'navigate-shop' },
      { id: 'q13', text: 'Care instructions', intent: 'care' },
    ],
  },
  {
    keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'affordable', 'value', 'worth'],
    phrases: ['how much does', 'what is the price', 'price range'],
    specificity: 6,
    response: "Each piece is individually priced based on design complexity and materials—you'll find prices listed on each product in our shop. We believe in fair pricing for handcrafted quality that lasts! Want to browse the collection?",
    quickReplies: [
      { id: 'q13', text: 'Browse shop', intent: 'navigate-shop' },
      { id: 'q14', text: 'Place order', intent: 'navigate-order' },
    ],
  },
  {
    keywords: ['lightweight', 'light', 'daily wear', 'everyday', 'casual', 'work', 'office', 'simple', 'minimalist'],
    phrases: ['for daily wear', 'everyday jewelry', 'lightweight pieces'],
    specificity: 7,
    response: "For everyday wear, our simpler rings, delicate chains, and stud earrings are perfect! Oxidized silver is durable and develops a beautiful patina with regular wear. Many of our pieces are designed to be comfortable and lightweight. What style are you looking for?",
    quickReplies: [
      { id: 'q15', text: 'View collection', intent: 'navigate-shop' },
      { id: 'q16', text: 'Care tips', intent: 'care' },
      { id: 'q17', text: 'Materials info', intent: 'materials' },
    ],
  },
  {
    keywords: ['latest', 'new', 'newest', 'recent', 'current'],
    phrases: ['latest collection', 'new arrivals', 'newest pieces'],
    specificity: 6,
    response: "Our current collection showcases our finest handcrafted oxidized silver pieces! Each design is unique and crafted with attention to detail. Browse our shop to see everything available right now.",
    quickReplies: [
      { id: 'q17', text: 'Browse shop', intent: 'navigate-shop' },
      { id: 'q18', text: 'About our craft', intent: 'navigate-about' },
    ],
  },
  {
    keywords: ['men', 'women', 'kids', 'children', 'boys', 'girls', 'unisex', 'gender'],
    phrases: ['for men', 'for women', 'mens jewelry', 'womens jewelry'],
    specificity: 6,
    response: "Our jewelry is designed to be timeless and versatile! While many pieces are unisex, we have designs that appeal to different styles and preferences. What type of piece are you interested in?",
    quickReplies: [
      { id: 'q19', text: 'View all products', intent: 'navigate-shop' },
      { id: 'q20', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['bestseller', 'best selling', 'popular', 'favorite', 'top', 'recommend', 'suggestion'],
    phrases: ['most popular', 'best sellers', 'what do you recommend'],
    specificity: 6,
    response: "All our pieces are customer favorites! For everyday elegance, our rings and studs are perfect. For special occasions, consider our statement pendants or drop earrings. What's the occasion or style you're looking for?",
    quickReplies: [
      { id: 'q21', text: 'Browse all', intent: 'navigate-shop' },
      { id: 'q22', text: 'Gift ideas', intent: 'gift' },
      { id: 'q23', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['bridal', 'wedding', 'bride', 'engagement', 'marriage'],
    phrases: ['for wedding', 'bridal jewelry', 'wedding pieces'],
    specificity: 8,
    response: "Our oxidized silver jewelry makes beautiful, unique bridal pieces! The vintage aesthetic adds character to wedding ensembles. For specific bridal requests or custom designs, I'd recommend contacting us directly to discuss your vision.",
    quickReplies: [
      { id: 'q23', text: 'View collection', intent: 'navigate-shop' },
      { id: 'q24', text: 'Custom requests', intent: 'custom' },
      { id: 'q25', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 📏 Size & Customization
  {
    keywords: ['size', 'sizing', 'fit', 'measure', 'measurement', 'dimensions', 'length', 'width'],
    phrases: ['ring size', 'how to measure', 'what size', 'know my size'],
    specificity: 7,
    response: "Sizing is important for the perfect fit! For rings, measure your finger circumference or use a ring sizer. For bracelets, measure your wrist. For necklaces, we offer standard lengths. Need help with sizing? I can connect you with our team!",
    quickReplies: [
      { id: 'q34', text: 'Contact for sizing help', intent: 'navigate-contact' },
      { id: 'q35', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['customize', 'customization', 'custom', 'personalize', 'bespoke', 'special', 'unique', 'design', 'commission'],
    phrases: ['custom design', 'personalized jewelry', 'make custom', 'design request'],
    specificity: 8,
    response: "We love creating special pieces! While our current collection features ready-made designs, we're happy to discuss custom requests and personalization. What did you have in mind? I can connect you with our team to explore your ideas!",
    quickReplies: [
      { id: 'q36', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q37', text: 'See current designs', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['engrave', 'engraving', 'inscribe', 'inscription', 'name', 'date', 'message', 'text'],
    phrases: ['can you engrave', 'engraving options', 'add name', 'add date'],
    specificity: 9,
    response: "Yes, we can discuss engraving options! Please contact us with details about what you'd like engraved (names, dates, messages) and which piece interests you. We'll let you know what's possible and provide timing and pricing.",
    quickReplies: [
      { id: 'q38', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q39', text: 'Browse jewelry', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['timeline', 'how long'],
    phrases: ['customization time', 'custom timeline', 'how long custom', 'custom take'],
    specificity: 9,
    response: "Custom work timelines vary by design complexity. Typically, custom pieces take 2-4 weeks from design approval to completion. Contact us with your specific request, and we'll provide a more accurate timeline!",
    quickReplies: [
      { id: 'q42', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q43', text: 'Browse ready-made', intent: 'navigate-shop' },
    ],
  },

  // 💰 Pricing & Offers
  {
    keywords: ['discount', 'sale', 'promo', 'promotion', 'coupon', 'deal', 'offer', 'special'],
    phrases: ['any discounts', 'ongoing offer', 'current sale', 'promo code'],
    specificity: 7,
    response: "We occasionally offer special promotions! The best way to stay updated is to check our shop regularly or contact us to join our mailing list. Anything specific you're interested in?",
    quickReplies: [
      { id: 'q44', text: 'View current collection', intent: 'navigate-shop' },
      { id: 'q45', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['emi', 'installment', 'payment plan', 'monthly payment', 'pay later'],
    phrases: ['payment plan', 'installment option', 'pay in installments'],
    specificity: 9,
    response: "Payment options including installments can be discussed when we confirm your order. We work with each customer individually to arrange payment that works for you. Would you like to submit an order request?",
    quickReplies: [
      { id: 'q46', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q47', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['making charge', 'making charges', 'labor charge', 'crafting charge', 'workmanship charge'],
    phrases: ['making charges', 'labor cost', 'crafting fee'],
    specificity: 9,
    response: "Our prices include all crafting and materials costs—there are no separate making charges. The price you see is the complete price. We believe in transparent, straightforward pricing!",
    quickReplies: [
      { id: 'q48', text: 'Browse shop', intent: 'navigate-shop' },
      { id: 'q49', text: 'Place order', intent: 'navigate-order' },
    ],
  },
  {
    keywords: ['gst', 'tax', 'taxes', 'vat'],
    phrases: ['include tax', 'price include tax', 'tax details'],
    specificity: 8,
    response: "Pricing and tax details are confirmed when you place your order. Applicable taxes will be clearly communicated based on your location. We ensure full transparency in all pricing!",
    quickReplies: [
      { id: 'q50', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q51', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['festival sale', 'holiday sale', 'diwali', 'christmas', 'seasonal sale'],
    phrases: ['festival sale', 'holiday discount', 'seasonal offer'],
    specificity: 8,
    response: "We may offer special promotions during festivals and holidays! Contact us or check our shop regularly to stay informed about any upcoming sales or special offers.",
    quickReplies: [
      { id: 'q52', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q53', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🚚 Delivery & Shipping
  {
    keywords: ['shipping', 'delivery', 'ship', 'send', 'receive', 'arrive'],
    phrases: ['how long delivery', 'shipping time', 'when will arrive', 'delivery timeline'],
    specificity: 8,
    response: "We carefully package and ship each piece with care. Typical delivery is 5-10 business days depending on your location. Shipping details, timelines, and costs are confirmed when you place your order, and we'll provide tracking information once it ships!",
    quickReplies: [
      { id: 'q54', text: 'Place an order', intent: 'navigate-order' },
      { id: 'q55', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['deliver to', 'ship to', 'location', 'my area', 'my city', 'international', 'worldwide'],
    phrases: ['ship to', 'deliver to', 'shipping location', 'international shipping'],
    specificity: 8,
    response: "We ship to many locations! Please contact us with your specific location for shipping options, timelines, and costs. We'll make sure your jewelry reaches you safely, wherever you are!",
    quickReplies: [
      { id: 'q56', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q57', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['free shipping', 'shipping free', 'free delivery', 'no shipping cost'],
    phrases: ['free shipping', 'shipping cost', 'delivery charge'],
    specificity: 9,
    response: "Shipping costs vary based on your location and order size. We'll provide exact shipping costs when you submit your order request. We pack everything securely to ensure safe delivery!",
    quickReplies: [
      { id: 'q58', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q59', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['track', 'tracking', 'track order', 'where is my order', 'order status'],
    phrases: ['track order', 'tracking number', 'order status', 'where is my order'],
    specificity: 9,
    response: "Once your order ships, we'll send you tracking information via email so you can monitor your package's journey. If you have questions about your order status, please contact us!",
    quickReplies: [
      { id: 'q60', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q61', text: 'Browse more', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['same day', 'express', 'rush', 'urgent', 'fast delivery', 'quick delivery'],
    phrases: ['same day delivery', 'express shipping', 'rush order', 'urgent delivery'],
    specificity: 9,
    response: "Standard delivery is 5-10 business days. For urgent orders or expedited shipping, please contact us directly to discuss options. We'll do our best to accommodate your timeline!",
    quickReplies: [
      { id: 'q62', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q63', text: 'Place order', intent: 'navigate-order' },
    ],
  },

  // 🔁 Returns & Exchange
  {
    keywords: ['return', 'refund', 'exchange', 'policy', 'send back', 'money back', 'unhappy', 'wrong'],
    phrases: ['return policy', 'can i return', 'refund policy', 'exchange policy'],
    specificity: 8,
    response: "We want you to love your jewelry! If you're not completely satisfied, please contact us within 14 days of receiving your order. We'll work with you on returns or exchanges. Items must be unworn and in original condition.",
    quickReplies: [
      { id: 'q64', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q65', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['exchange jewelry', 'swap', 'change item'],
    phrases: ['can i exchange', 'exchange for', 'swap item'],
    specificity: 9,
    response: "Yes, exchanges are possible within 14 days of receiving your order! Items must be unworn and in original condition. Contact us to arrange an exchange, and we'll guide you through the process.",
    quickReplies: [
      { id: 'q66', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q67', text: 'View collection', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['damaged', 'broken', 'defect'],
    phrases: ['damaged product', 'receive damaged', 'broken item', 'defective'],
    specificity: 10,
    response: "I'm so sorry if you received a damaged item! Please contact us immediately with photos of the damage. We'll make it right—either by sending a replacement or issuing a refund. Your satisfaction is our priority!",
    quickReplies: [
      { id: 'q68', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['return days', 'return period', 'return window'],
    phrases: ['how many days return', 'return period', 'return window'],
    specificity: 9,
    response: "You have 14 days from receiving your order to initiate a return or exchange. Items must be unworn and in original condition. Contact us within this period, and we'll assist you with the process!",
    quickReplies: [
      { id: 'q69', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q70', text: 'Browse jewelry', intent: 'navigate-shop' },
    ],
  },

  // 🧾 Payment Related
  {
    keywords: ['payment', 'pay', 'payment method', 'how to pay', 'payment option', 'accept payment'],
    phrases: ['payment method', 'how to pay', 'payment options', 'accept payment'],
    specificity: 7,
    response: "We work with each customer individually to arrange payment. After you submit an order request, we'll contact you to confirm details and discuss payment options that work for you—including bank transfers and other secure options.",
    quickReplies: [
      { id: 'q71', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q72', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['online payment', 'payment safe', 'secure payment', 'safe to pay'],
    phrases: ['payment safe', 'secure payment', 'safe to pay', 'payment security'],
    specificity: 9,
    response: "Yes, we ensure secure transactions! Payment details and methods are discussed when we confirm your order. We work with trusted payment systems to protect your information. Your security is important to us!",
    quickReplies: [
      { id: 'q73', text: 'Place order', intent: 'navigate-order' },
      { id: 'q74', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['cod', 'cash on delivery', 'pay on delivery', 'pay when receive'],
    phrases: ['cash on delivery', 'cod available', 'pay on delivery'],
    specificity: 9,
    response: "Payment options including cash on delivery can be discussed when we confirm your order. We work with each customer to arrange payment that suits your preferences. Please submit an order request or contact us!",
    quickReplies: [
      { id: 'q75', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q76', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['credit card', 'debit card', 'card payment', 'visa', 'mastercard'],
    phrases: ['credit card', 'debit card', 'card payment', 'pay by card'],
    specificity: 9,
    response: "Card payment options can be discussed when we confirm your order. We work with trusted payment systems to ensure secure transactions. Would you like to submit an order request?",
    quickReplies: [
      { id: 'q77', text: 'Place order', intent: 'navigate-order' },
      { id: 'q78', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['upi', 'paytm', 'gpay', 'phonepe', 'digital payment'],
    phrases: ['upi payment', 'digital wallet', 'paytm', 'google pay'],
    specificity: 9,
    response: "Digital payment options including UPI can be discussed when we confirm your order. We're flexible and work with various payment methods. Please submit an order request or contact us!",
    quickReplies: [
      { id: 'q79', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q80', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🏪 Store & Contact
  {
    keywords: ['store', 'shop location', 'physical store', 'visit', 'address', 'where are you'],
    phrases: ['physical store', 'store location', 'visit store', 'shop address'],
    specificity: 8,
    response: "We primarily operate online to bring our handcrafted jewelry directly to you! For specific location questions or to arrange a meeting, please contact us. We're here to help!",
    quickReplies: [
      { id: 'q81', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q82', text: 'Browse online', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'talk', 'speak'],
    phrases: ['contact you', 'reach you', 'get in touch', 'contact details'],
    specificity: 7,
    response: "I'd be happy to connect you with our team! You can reach us through our contact page where you'll find our email and a contact form. We typically respond within 24 hours. What would you like to discuss?",
    quickReplies: [
      { id: 'q83', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q84', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['hours', 'open', 'timing', 'when open', 'business hours'],
    phrases: ['business hours', 'opening hours', 'when open', 'store hours'],
    specificity: 8,
    response: "We're available online 24/7 for browsing! For inquiries, we typically respond to messages within 24 hours during business days. Feel free to contact us anytime, and we'll get back to you promptly!",
    quickReplies: [
      { id: 'q85', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q86', text: 'Browse shop', intent: 'navigate-shop' },
    ],
  },

  // 🎁 Gifts & Occasions
  {
    keywords: ['gift', 'present', 'gifting', 'birthday', 'anniversary', 'occasion'],
    phrases: ['gift idea', 'gift for', 'present for', 'birthday gift'],
    specificity: 7,
    response: "Our oxidized silver jewelry makes wonderful gifts! For everyday elegance, consider rings or studs. For special occasions, our statement pendants or drop earrings are perfect. We can also discuss gift wrapping options. What's the occasion?",
    quickReplies: [
      { id: 'q87', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q88', text: 'Custom options', intent: 'custom' },
      { id: 'q89', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['gift wrap', 'wrapping', 'gift box', 'packaging', 'gift packaging'],
    phrases: ['gift wrapping', 'gift box', 'special packaging'],
    specificity: 9,
    response: "We can discuss gift wrapping and special packaging options! Please mention your gift needs when you place your order or contact us directly. We'll make sure your gift looks beautiful!",
    quickReplies: [
      { id: 'q90', text: 'Place order', intent: 'navigate-order' },
      { id: 'q91', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🔧 Materials & Care
  {
    keywords: ['material', 'materials', 'made of', 'silver', 'sterling', 'metal'],
    phrases: ['what material', 'made from', 'sterling silver', 'silver quality'],
    specificity: 7,
    response: "All our jewelry is crafted from genuine sterling silver (92.5% pure silver). The oxidized finish is a professional treatment that creates the signature darkened patina, highlighting intricate details and giving each piece a timeless, vintage character. Want to know more about care?",
    quickReplies: [
      { id: 'q92', text: 'Care instructions', intent: 'care' },
      { id: 'q93', text: 'View products', intent: 'navigate-shop' },
      { id: 'q94', text: 'Quality info', intent: 'quality' },
    ],
  },
  {
    keywords: ['oxidized', 'oxidation', 'black', 'dark', 'darkened', 'patina', 'finish'],
    phrases: ['oxidized finish', 'why black', 'dark finish', 'oxidation process'],
    specificity: 9,
    response: "The oxidized finish is an intentional, professional treatment that creates the signature darkened patina on sterling silver. This finish highlights intricate details and gives each piece a unique vintage aesthetic. The patina develops beautifully over time with wear!",
    quickReplies: [
      { id: 'q95', text: 'Care tips', intent: 'care' },
      { id: 'q96', text: 'Browse collection', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['care', 'clean', 'maintain', 'maintenance', 'polish', 'tarnish'],
    phrases: ['how to care', 'how to clean', 'care instructions', 'maintenance tips'],
    specificity: 8,
    response: "Caring for oxidized silver is easy! Store pieces in a dry place, avoid harsh chemicals, and gently clean with a soft cloth. The oxidized finish is meant to develop character over time. For deep cleaning, use mild soap and water. Want detailed care instructions?",
    quickReplies: [
      { id: 'q97', text: 'Contact for details', intent: 'navigate-contact' },
      { id: 'q98', text: 'Browse jewelry', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['hypoallergenic', 'allergy', 'allergic', 'sensitive skin', 'skin reaction'],
    phrases: ['hypoallergenic', 'sensitive skin', 'skin allergy', 'allergic reaction'],
    specificity: 9,
    response: "Sterling silver is generally hypoallergenic and suitable for most people with sensitive skin. However, if you have specific metal allergies, please contact us to discuss your concerns. We want to ensure you can wear our jewelry comfortably!",
    quickReplies: [
      { id: 'q99', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q100', text: 'View earrings', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['waterproof', 'water resistant', 'shower', 'swim', 'water'],
    phrases: ['wear in water', 'waterproof', 'shower with', 'swim with'],
    specificity: 9,
    response: "While sterling silver won't be damaged by water, we recommend removing your jewelry before showering, swimming, or exercising. This helps preserve the oxidized finish and prevents exposure to harsh chemicals. Proper care ensures your pieces last longer!",
    quickReplies: [
      { id: 'q101', text: 'Care guide', intent: 'care' },
      { id: 'q102', text: 'Browse collection', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['durable', 'durability', 'last', 'long lasting', 'lifetime', 'quality'],
    phrases: ['how long last', 'durable', 'quality', 'lifetime'],
    specificity: 7,
    response: "Our sterling silver jewelry is crafted for durability and designed to last for years with proper care. The oxidized finish develops character over time, making each piece more unique. Quality craftsmanship ensures your jewelry can be treasured for a lifetime!",
    quickReplies: [
      { id: 'q103', text: 'Quality details', intent: 'quality' },
      { id: 'q104', text: 'Care tips', intent: 'care' },
      { id: 'q105', text: 'Browse shop', intent: 'navigate-shop' },
    ],
  },

  // 📜 Policies & Account
  {
    keywords: ['warranty', 'guarantee', 'certificate', 'certification'],
    phrases: ['warranty', 'guarantee', 'certificate', 'quality certificate'],
    specificity: 8,
    response: "We stand behind the quality of our handcrafted jewelry! For specific warranty details and quality certifications, please contact us. We're committed to your satisfaction and the authenticity of every piece.",
    quickReplies: [
      { id: 'q106', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q107', text: 'Quality info', intent: 'quality' },
    ],
  },
  {
    keywords: ['account', 'login', 'register', 'sign up', 'profile'],
    phrases: ['create account', 'sign up', 'register', 'login'],
    specificity: 7,
    response: "You don't need an account to browse or place an order! Simply submit an order request with your details, and we'll contact you to confirm everything. It's that simple!",
    quickReplies: [
      { id: 'q108', text: 'Place order', intent: 'navigate-order' },
      { id: 'q109', text: 'Browse shop', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['order', 'ordering', 'buy', 'purchase', 'checkout'],
    phrases: ['how to order', 'place order', 'how to buy', 'purchase process'],
    specificity: 6,
    response: "Ordering is easy! Browse our collection, then submit an order request with your details and the items you'd like. We'll contact you to confirm everything and arrange payment and shipping. Ready to get started?",
    quickReplies: [
      { id: 'q110', text: 'Browse products', intent: 'navigate-shop' },
      { id: 'q111', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q112', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🌟 About & Brand
  {
    keywords: ['about', 'story', 'brand', 'company', 'who', 'lunara'],
    phrases: ['about lunara', 'your story', 'brand story', 'who are you'],
    specificity: 6,
    response: "Lunara Jewels specializes in handcrafted oxidized silver jewelry. Each piece is created with attention to detail, celebrating the unique beauty of oxidized silver's vintage aesthetic. We're passionate about quality craftsmanship and timeless design. Want to learn more?",
    quickReplies: [
      { id: 'q113', text: 'About us', intent: 'navigate-about' },
      { id: 'q114', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q115', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['handmade', 'handcrafted', 'artisan', 'craft', 'craftsmanship'],
    phrases: ['handmade', 'handcrafted', 'artisan jewelry', 'craftsmanship'],
    specificity: 8,
    response: "Yes! Every piece is handcrafted with attention to detail. Our artisans specialize in oxidized silver techniques, creating unique jewelry that showcases traditional craftsmanship with contemporary design. Each piece is truly one-of-a-kind!",
    quickReplies: [
      { id: 'q116', text: 'About our craft', intent: 'navigate-about' },
      { id: 'q117', text: 'View collection', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['review', 'reviews', 'testimonial', 'feedback', 'customer review'],
    phrases: ['customer reviews', 'testimonials', 'what customers say'],
    specificity: 7,
    response: "We're proud of our customer feedback! You can read reviews from happy customers who love their Lunara Jewels pieces. Want to see what they're saying?",
    quickReplies: [
      { id: 'q118', text: 'Read reviews', intent: 'navigate-reviews' },
      { id: 'q119', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },

  // ❓ Help & Support
  {
    keywords: ['help', 'support', 'assist', 'question', 'problem', 'issue'],
    phrases: ['need help', 'have question', 'need assistance'],
    specificity: 4,
    response: "I'm here to help! What specific question do you have? I can assist with products, materials, sizing, shipping, returns, payments, or ordering. For complex questions, I can connect you with our team!",
    quickReplies: [
      { id: 'q120', text: 'Shipping info', intent: 'shipping' },
      { id: 'q121', text: 'Returns policy', intent: 'return' },
      { id: 'q122', text: 'Payment options', intent: 'payment' },
      { id: 'q123', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['thanks', 'thank you', 'appreciate', 'great', 'awesome', 'helpful'],
    specificity: 5,
    response: "You're very welcome! I'm glad I could help. Is there anything else you'd like to know about our jewelry?",
    quickReplies: [
      { id: 'q124', text: 'Browse products', intent: 'navigate-shop' },
      { id: 'q125', text: 'Place order', intent: 'navigate-order' },
      { id: 'q126', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'thanks bye'],
    specificity: 5,
    response: "Thank you for chatting with me! Feel free to return anytime you have questions. Happy shopping at Lunara Jewels!",
    quickReplies: [
      { id: 'q127', text: 'Browse shop', intent: 'navigate-shop' },
    ],
  },
];

// Confidence threshold for intent matching
const CONFIDENCE_THRESHOLD = 10;

export function getBotResponse(userMessage: string): { response: string; quickReplies?: QuickReply[] } {
  const normalized = normalizeText(userMessage);

  // Handle very short or vague messages
  if (normalized.length < 3 || normalized.split(' ').length === 1) {
    return {
      response: "I'd love to help! Could you tell me a bit more about what you're looking for? For example, are you interested in a specific type of jewelry, or do you have questions about shipping, returns, or ordering?",
      quickReplies: [
        { id: 'clarify1', text: 'Browse products', intent: 'navigate-shop' },
        { id: 'clarify2', text: 'Shipping info', intent: 'shipping' },
        { id: 'clarify3', text: 'Returns policy', intent: 'return' },
        { id: 'clarify4', text: 'Contact us', intent: 'navigate-contact' },
      ],
    };
  }

  // Score all intents
  const scoredIntents = intents
    .map((intent) => ({
      intent,
      score: scoreIntent(intent, userMessage),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // Check if we have a confident match
  if (scoredIntents.length > 0 && scoredIntents[0].score >= CONFIDENCE_THRESHOLD) {
    const bestMatch = scoredIntents[0].intent;
    return {
      response: bestMatch.response,
      quickReplies: bestMatch.quickReplies,
    };
  }

  // Low confidence - ask clarifying question
  return {
    response: "I want to make sure I understand correctly. Are you asking about our products, shipping and delivery, returns and exchanges, payment options, or something else? Feel free to be more specific!",
    quickReplies: [
      { id: 'clarify5', text: 'Products & materials', intent: 'shop' },
      { id: 'clarify6', text: 'Shipping & delivery', intent: 'shipping' },
      { id: 'clarify7', text: 'Returns & exchanges', intent: 'return' },
      { id: 'clarify8', text: 'Payment options', intent: 'payment' },
      { id: 'clarify9', text: 'Contact us', intent: 'navigate-contact' },
    ],
  };
}

export function getInitialQuickReplies(): QuickReply[] {
  return [
    { id: 'init1', text: 'Browse products', intent: 'navigate-shop' },
    { id: 'init2', text: 'Shipping info', intent: 'shipping' },
    { id: 'init3', text: 'Place an order', intent: 'navigate-order' },
    { id: 'init4', text: 'Contact us', intent: 'navigate-contact' },
  ];
}
