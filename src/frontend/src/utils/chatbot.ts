import { CONTACT_INFO } from '@/config/contact';

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
    keywords: ['same day', 'express', 'urgent', 'fast delivery', 'rush'],
    phrases: ['same day delivery', 'express shipping', 'urgent delivery'],
    specificity: 9,
    response: "For urgent or express delivery requests, please contact us directly. We'll do our best to accommodate your timeline and discuss expedited shipping options!",
    quickReplies: [
      { id: 'q62', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q63', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['packaging', 'gift wrap', 'gift box', 'wrapping', 'box'],
    phrases: ['gift packaging', 'gift wrap', 'special packaging'],
    specificity: 8,
    response: "All our jewelry comes beautifully packaged! For special gift wrapping or custom packaging requests, please mention this when placing your order or contact us directly.",
    quickReplies: [
      { id: 'q64', text: 'Place order', intent: 'navigate-order' },
      { id: 'q65', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🔄 Returns & Exchange
  {
    keywords: ['return', 'returns', 'refund', 'money back'],
    phrases: ['return policy', 'can i return', 'return item', 'get refund'],
    specificity: 8,
    response: "We want you to love your jewelry! If you're not completely satisfied, we accept returns within a reasonable timeframe. Please contact us to initiate a return and we'll guide you through the process.",
    quickReplies: [
      { id: 'q66', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q67', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['exchange', 'swap', 'change', 'different size', 'wrong size'],
    phrases: ['exchange item', 'change size', 'swap for different'],
    specificity: 8,
    response: "Yes, we can help with exchanges! If you need a different size or style, contact us and we'll arrange an exchange. We want to make sure you get the perfect piece!",
    quickReplies: [
      { id: 'q68', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q69', text: 'Sizing help', intent: 'sizing' },
    ],
  },
  {
    keywords: ['damaged', 'broken', 'defect', 'defective', 'problem', 'issue', 'wrong item'],
    phrases: ['received damaged', 'item broken', 'wrong item', 'defective product'],
    specificity: 9,
    response: "We're so sorry to hear that! If you received a damaged or incorrect item, please contact us immediately with photos. We'll resolve this right away—either with a replacement or full refund.",
    quickReplies: [
      { id: 'q70', text: 'Contact us now', intent: 'navigate-contact' },
    ],
  },

  // 💳 Payment
  {
    keywords: ['payment', 'pay', 'payment method', 'payment option', 'how to pay'],
    phrases: ['payment methods', 'how do i pay', 'payment options', 'accepted payments'],
    specificity: 7,
    response: "We accept various payment methods to make your purchase convenient! Payment details and options will be confirmed when you submit your order request. We'll work with you to arrange secure payment.",
    quickReplies: [
      { id: 'q71', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q72', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['cod', 'cash on delivery', 'pay on delivery'],
    phrases: ['cash on delivery', 'cod available', 'pay when delivered'],
    specificity: 9,
    response: "Cash on delivery availability depends on your location. Please contact us or mention COD preference when submitting your order request, and we'll let you know if it's available for your area!",
    quickReplies: [
      { id: 'q73', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q74', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['upi', 'gpay', 'phonepe', 'paytm', 'digital payment'],
    phrases: ['upi payment', 'google pay', 'phonepe payment'],
    specificity: 8,
    response: "We accept digital payment methods including UPI! Specific payment instructions will be provided when you place your order. We make payment easy and secure!",
    quickReplies: [
      { id: 'q75', text: 'Place order', intent: 'navigate-order' },
      { id: 'q76', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['secure', 'safe', 'security', 'payment security'],
    phrases: ['is payment secure', 'safe to pay', 'payment security'],
    specificity: 8,
    response: "Yes, absolutely! We use secure payment methods and handle all transactions with care. Your payment information is protected, and we'll provide clear payment instructions when you place your order.",
    quickReplies: [
      { id: 'q77', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q78', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🎁 Gifting
  {
    keywords: ['gift', 'present', 'gifting', 'gift for'],
    phrases: ['gift ideas', 'looking for gift', 'gift someone', 'present for'],
    specificity: 7,
    response: "Our oxidized silver jewelry makes wonderful gifts! Each piece is unique and comes beautifully packaged. Whether it's for a birthday, anniversary, or special occasion, we have something special. What's the occasion?",
    quickReplies: [
      { id: 'q79', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q80', text: 'Gift packaging', intent: 'packaging' },
      { id: 'q81', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['anniversary', 'birthday', 'valentine', 'mothers day', 'fathers day'],
    phrases: ['anniversary gift', 'birthday present', 'valentine gift'],
    specificity: 8,
    response: "Perfect! Our handcrafted silver jewelry makes a thoughtful, lasting gift for any special occasion. Each piece tells a story and will be treasured for years. Would you like to see our collection?",
    quickReplies: [
      { id: 'q82', text: 'View jewelry', intent: 'navigate-shop' },
      { id: 'q83', text: 'Gift wrapping', intent: 'packaging' },
      { id: 'q84', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['gift card', 'voucher', 'gift certificate'],
    phrases: ['gift card', 'gift voucher', 'gift certificate'],
    specificity: 9,
    response: "For gift cards or vouchers, please contact us directly. We can discuss options to create a special gift certificate for your loved one!",
    quickReplies: [
      { id: 'q85', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q86', text: 'Browse jewelry', intent: 'navigate-shop' },
    ],
  },

  // 🛠️ Care & Maintenance
  {
    keywords: ['care', 'maintain', 'maintenance', 'clean', 'cleaning', 'polish', 'tarnish'],
    phrases: ['how to care', 'care instructions', 'how to clean', 'maintain jewelry'],
    specificity: 8,
    response: "Oxidized silver develops character over time! To maintain it: (1) Store in a dry place, (2) Clean gently with a soft cloth, (3) Avoid harsh chemicals. The oxidized finish is meant to age beautifully—embrace the patina! Want more detailed care tips?",
    quickReplies: [
      { id: 'q87', text: 'Contact for details', intent: 'navigate-contact' },
      { id: 'q88', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['water', 'shower', 'swim', 'waterproof', 'water resistant'],
    phrases: ['wear in water', 'shower with jewelry', 'waterproof jewelry'],
    specificity: 9,
    response: "While sterling silver won't be damaged by water, we recommend removing your jewelry before showering, swimming, or exercising. This helps preserve the oxidized finish and prevents exposure to chemicals in soaps and chlorine.",
    quickReplies: [
      { id: 'q89', text: 'More care tips', intent: 'care' },
      { id: 'q90', text: 'Browse collection', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['warranty', 'guarantee', 'lifetime', 'durability'],
    phrases: ['warranty period', 'lifetime guarantee', 'how long last'],
    specificity: 8,
    response: "Our jewelry is crafted to last! Sterling silver is durable and, with proper care, will be beautiful for years. For specific warranty details or concerns about a piece, please contact us directly.",
    quickReplies: [
      { id: 'q91', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q92', text: 'Care instructions', intent: 'care' },
    ],
  },
  {
    keywords: ['repair', 'fix', 'broken', 'resize', 'resizing'],
    phrases: ['repair jewelry', 'fix broken', 'resize ring', 'resizing service'],
    specificity: 9,
    response: "We can help with repairs and resizing! Please contact us with details about what needs to be done, and we'll let you know the options, timeline, and cost. We want your jewelry to last a lifetime!",
    quickReplies: [
      { id: 'q93', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q94', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },

  // 🏆 Quality & Materials
  {
    keywords: ['material', 'materials', 'made of', 'silver', 'sterling', 'metal'],
    phrases: ['what material', 'made from', 'sterling silver', 'silver quality'],
    specificity: 7,
    response: "All our jewelry is crafted from genuine sterling silver (92.5% pure silver). The oxidized finish is a professional treatment that creates the signature darkened patina, highlighting intricate details. It's authentic, high-quality silver!",
    quickReplies: [
      { id: 'q95', text: 'Quality details', intent: 'quality' },
      { id: 'q96', text: 'Browse collection', intent: 'navigate-shop' },
      { id: 'q97', text: 'Care tips', intent: 'care' },
    ],
  },
  {
    keywords: ['quality', 'craftsmanship', 'handmade', 'handcrafted', 'artisan'],
    phrases: ['quality assurance', 'handcrafted quality', 'artisan made'],
    specificity: 7,
    response: "Every piece is handcrafted by skilled artisans with attention to detail. We use premium sterling silver and traditional oxidation techniques. Each piece is unique, showcasing the beauty of handmade craftsmanship. Quality is our promise!",
    quickReplies: [
      { id: 'q98', text: 'About our craft', intent: 'navigate-about' },
      { id: 'q99', text: 'View products', intent: 'navigate-shop' },
      { id: 'q100', text: 'Materials info', intent: 'materials' },
    ],
  },
  {
    keywords: ['oxidized', 'oxidation', 'black', 'dark', 'antique', 'vintage'],
    phrases: ['oxidized finish', 'why black', 'antique look', 'vintage style'],
    specificity: 8,
    response: "The oxidized finish is what makes our jewelry special! It's a controlled darkening process that creates depth and highlights intricate details. This 'antique' or 'vintage' look is intentional and adds character. The patina will evolve beautifully over time!",
    quickReplies: [
      { id: 'q101', text: 'View collection', intent: 'navigate-shop' },
      { id: 'q102', text: 'Care instructions', intent: 'care' },
      { id: 'q103', text: 'About us', intent: 'navigate-about' },
    ],
  },
  {
    keywords: ['hypoallergenic', 'allergy', 'allergic', 'sensitive skin', 'nickel free'],
    phrases: ['hypoallergenic jewelry', 'nickel free', 'sensitive skin', 'cause allergy'],
    specificity: 9,
    response: "Sterling silver (92.5% pure silver) is generally hypoallergenic and safe for most people with sensitive skin. It's nickel-free! However, if you have specific metal allergies, please consult with us before purchasing.",
    quickReplies: [
      { id: 'q104', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q105', text: 'Browse earrings', intent: 'earring' },
      { id: 'q106', text: 'Materials info', intent: 'materials' },
    ],
  },
  {
    keywords: ['hallmark', 'stamp', 'certification', 'certified', 'authentic'],
    phrases: ['hallmark stamp', 'certified silver', 'authenticity certificate'],
    specificity: 9,
    response: "Our sterling silver jewelry meets quality standards for 92.5% pure silver. For specific questions about hallmarking or certification, please contact us directly and we'll provide detailed information!",
    quickReplies: [
      { id: 'q107', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q108', text: 'Quality details', intent: 'quality' },
    ],
  },

  // 📞 Contact & Support
  {
    keywords: ['contact', 'reach', 'call', 'email', 'phone', 'talk', 'speak'],
    phrases: ['contact you', 'how to reach', 'contact details', 'get in touch'],
    specificity: 7,
    response: `You can reach us at:\n📧 Email: ${CONTACT_INFO.email}\n📱 Phone: ${CONTACT_INFO.phoneFormatted}\n📍 Location: ${CONTACT_INFO.location}\n\nWe're here to help with any questions!`,
    quickReplies: [
      { id: 'q109', text: 'Go to contact page', intent: 'navigate-contact' },
      { id: 'q110', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['hours', 'open', 'timing', 'business hours', 'when open'],
    phrases: ['business hours', 'opening hours', 'when are you open'],
    specificity: 8,
    response: "Our business hours are:\nMonday - Friday: 10am - 6pm\nSaturday: 11am - 4pm\nSunday: Closed\n\nFeel free to contact us during these times, or submit an inquiry anytime!",
    quickReplies: [
      { id: 'q111', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q112', text: 'Browse shop', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['visit', 'store', 'showroom', 'physical store', 'location', 'address'],
    phrases: ['visit store', 'physical location', 'showroom address', 'where located'],
    specificity: 8,
    response: `We're located in ${CONTACT_INFO.location}! For our exact address and to schedule a visit, please contact us directly. We'd love to show you our collection in person!`,
    quickReplies: [
      { id: 'q113', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q114', text: 'Browse online', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['whatsapp', 'social media', 'instagram', 'facebook'],
    phrases: ['whatsapp number', 'social media', 'instagram page', 'facebook page'],
    specificity: 8,
    response: `For the fastest response, reach us at:\n📧 ${CONTACT_INFO.email}\n📱 ${CONTACT_INFO.phoneFormatted}\n\nFor social media and other contact options, please visit our contact page!`,
    quickReplies: [
      { id: 'q115', text: 'Contact page', intent: 'navigate-contact' },
      { id: 'q116', text: 'Browse jewelry', intent: 'navigate-shop' },
    ],
  },

  // 🛒 Ordering Process
  {
    keywords: ['order', 'buy', 'purchase', 'how to order', 'place order'],
    phrases: ['how to order', 'place an order', 'how to buy', 'purchase process'],
    specificity: 7,
    response: "Ordering is easy! Browse our collection, add items to your cart, and submit an order request with your details. We'll confirm availability, finalize pricing, and arrange payment and delivery. Ready to start?",
    quickReplies: [
      { id: 'q117', text: 'Browse shop', intent: 'navigate-shop' },
      { id: 'q118', text: 'Submit order request', intent: 'navigate-order' },
      { id: 'q119', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['bulk', 'wholesale', 'bulk order', 'large quantity', 'multiple pieces'],
    phrases: ['bulk order', 'wholesale price', 'large quantity', 'buy multiple'],
    specificity: 9,
    response: "We welcome bulk orders! For wholesale pricing or large quantity purchases, please contact us directly with your requirements. We'll provide a custom quote and discuss timelines!",
    quickReplies: [
      { id: 'q120', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'q121', text: 'View products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['cancel', 'cancellation', 'cancel order'],
    phrases: ['cancel order', 'cancellation policy', 'can i cancel'],
    specificity: 9,
    response: "If you need to cancel an order, please contact us as soon as possible. If the order hasn't been processed or shipped yet, we can usually accommodate cancellations. Reach out and we'll help!",
    quickReplies: [
      { id: 'q122', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // ℹ️ About & General Info
  {
    keywords: ['about', 'who are you', 'story', 'brand', 'company'],
    phrases: ['about you', 'your story', 'about lunara', 'who is lunara'],
    specificity: 6,
    response: "Lunara Jewels specializes in handcrafted oxidized silver jewelry. Each piece is created with passion and attention to detail, blending traditional craftsmanship with modern design. We believe jewelry should tell your story! Want to learn more?",
    quickReplies: [
      { id: 'q123', text: 'About us', intent: 'navigate-about' },
      { id: 'q124', text: 'View collection', intent: 'navigate-shop' },
      { id: 'q125', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
  {
    keywords: ['review', 'reviews', 'testimonial', 'feedback', 'customer review'],
    phrases: ['customer reviews', 'what customers say', 'testimonials', 'feedback'],
    specificity: 7,
    response: "Our customers love our handcrafted jewelry! Many appreciate the unique oxidized finish, quality craftsmanship, and personal touch. Want to see what they're saying?",
    quickReplies: [
      { id: 'q126', text: 'Read reviews', intent: 'navigate-reviews' },
      { id: 'q127', text: 'Browse products', intent: 'navigate-shop' },
    ],
  },
  {
    keywords: ['faq', 'frequently asked', 'common questions'],
    phrases: ['frequently asked', 'common questions', 'faq page'],
    specificity: 7,
    response: "I can answer many common questions right here! But if you'd like to browse our full FAQ, I can direct you there. What would you like to know?",
    quickReplies: [
      { id: 'q128', text: 'View FAQ', intent: 'navigate-faq' },
      { id: 'q129', text: 'Ask me anything', intent: 'help' },
      { id: 'q130', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },

  // 🧭 Navigation Intents (for quick replies)
  {
    keywords: ['navigate-shop'],
    specificity: 10,
    response: "Taking you to our shop...",
    quickReplies: [],
  },
  {
    keywords: ['navigate-about'],
    specificity: 10,
    response: "Taking you to our about page...",
    quickReplies: [],
  },
  {
    keywords: ['navigate-contact'],
    specificity: 10,
    response: "Taking you to our contact page...",
    quickReplies: [],
  },
  {
    keywords: ['navigate-order'],
    specificity: 10,
    response: "Taking you to the order request page...",
    quickReplies: [],
  },
  {
    keywords: ['navigate-faq'],
    specificity: 10,
    response: "Taking you to our FAQ page...",
    quickReplies: [],
  },
  {
    keywords: ['navigate-reviews'],
    specificity: 10,
    response: "Taking you to customer reviews...",
    quickReplies: [],
  },

  // 🤷 Fallback & Help
  {
    keywords: ['help', 'assist', 'support', 'question'],
    phrases: ['need help', 'can you help', 'i have question'],
    specificity: 2,
    response: "I'm here to help! I can answer questions about our products, shipping, returns, customization, care instructions, and more. What would you like to know?",
    quickReplies: [
      { id: 'q131', text: 'Browse products', intent: 'navigate-shop' },
      { id: 'q132', text: 'Shipping info', intent: 'shipping' },
      { id: 'q133', text: 'Contact us', intent: 'navigate-contact' },
    ],
  },
];

// Get initial quick replies for the welcome message
export function getInitialQuickReplies(): QuickReply[] {
  return [
    { id: 'init1', text: 'Browse products', intent: 'navigate-shop' },
    { id: 'init2', text: 'Shipping info', intent: 'shipping' },
    { id: 'init3', text: 'Place an order', intent: 'navigate-order' },
    { id: 'init4', text: 'Contact us', intent: 'navigate-contact' },
  ];
}

// Find best matching intent
export function getBotResponse(userMessage: string): { response: string; quickReplies?: QuickReply[] } {
  const scores = intents.map((intent) => ({
    intent,
    score: scoreIntent(intent, userMessage),
  }));

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  const bestMatch = scores[0];
  const CONFIDENCE_THRESHOLD = 5; // Minimum score to consider a match

  if (bestMatch && bestMatch.score >= CONFIDENCE_THRESHOLD) {
    return {
      response: bestMatch.intent.response,
      quickReplies: bestMatch.intent.quickReplies,
    };
  }

  // Fallback response with helpful suggestions
  return {
    response:
      "I'm not quite sure about that. Could you rephrase your question? I can help with product info, shipping, returns, customization, care tips, and more. Or feel free to contact us directly for personalized assistance!",
    quickReplies: [
      { id: 'fallback1', text: 'Browse products', intent: 'navigate-shop' },
      { id: 'fallback2', text: 'Contact us', intent: 'navigate-contact' },
      { id: 'fallback3', text: 'Shipping info', intent: 'shipping' },
      { id: 'fallback4', text: 'Care tips', intent: 'care' },
    ],
  };
}
