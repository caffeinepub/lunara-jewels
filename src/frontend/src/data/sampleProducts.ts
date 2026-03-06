import type { Product } from "../backend";

export type ProductWithGender = Product & {
  gender: "women" | "men" | "unisex";
};

export const sampleProducts: ProductWithGender[] = [
  {
    id: BigInt(1),
    name: "Tribal Heritage Textured Cuff Bangles",
    gender: "women",
    description:
      "The Tribal Heritage Textured Cuff Bangles are inspired by traditional tribal jewelry aesthetics known for their bold textures and handcrafted appeal. Designed in a classic oxidised finish, these open cuff bangles feature geometric and engraved patterns that add depth and character to the design. Their minimal yet rustic look makes them versatile for everyday wear as well as ethnic styling. The adjustable open design ensures comfort and easy wear, while the antique finish enhances their vintage charm. Perfect for stacking or wearing individually, these bangles add a touch of heritage elegance to any outfit. Material: Oxidised metal alloy | Finish: Antique oxidised silver | Style: Tribal cuff bangles | Size: Adjustable open cuff | Quantity: Set of 3",
    price: BigInt(2399),
    imageUrl:
      "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.58-AM-2--1.jpeg",
  },
  {
    id: BigInt(2),
    name: "Vintage Pearl Blossom Chandbali Earrings",
    gender: "women",
    description:
      "Elegant and graceful, the Vintage Pearl Blossom Chandbali Earrings combine floral artistry with timeless charm. Designed with delicate embossed flower motifs in oxidised silver, the earrings create a beautiful half-moon chandbali silhouette. Clusters of lustrous pearl beads cascade from the base, adding a soft and feminine touch while creating gentle movement. The floral stud at the top adds a vintage aesthetic that complements the handcrafted design. Lightweight yet eye-catching, these earrings are ideal for festive gatherings, brunches, traditional outfits, and Indo-western styling. Material: Oxidised silver finish alloy | Embellishment: Pearl bead clusters | Design: Floral engraved chandbali | Finish: Vintage oxidised silver | Closure: Push back",
    price: BigInt(2699),
    imageUrl: "/assets/uploads/WhatsApp-Image-2026-03-03-at-12.02.06-PM-2.jpeg",
  },
  {
    id: BigInt(3),
    name: "Sapphire Veil Jhumkas",
    gender: "women",
    description:
      "Oxidized silver jhumkas with blue stone teardrop tops, intricate heart-shaped chandbali bodies, and a row of pearl ghungroos at the hem. These statement earrings blend heritage craftsmanship with contemporary elegance, making them ideal for festive occasions, weddings, and cultural celebrations. The deep blue stones add a regal contrast against the antique silver finish. Material: Premium oxidised metal alloy | Stones: Blue semi-precious style stones | Embellishment: Pearl ghungroo drops | Finish: Antique oxidised silver | Style: Statement jhumka | Closure: Push back",
    price: BigInt(3499),
    imageUrl: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.58-AM-3.jpeg",
  },
  {
    id: BigInt(4),
    name: "Moonveil Pearl Haar",
    gender: "women",
    description:
      "A multi-strand pearl and silver necklace featuring round oxidized medallion pendants with Goddess motifs and cascading pearl chains. This heirloom-quality necklace is inspired by traditional South Indian temple jewelry, crafted with meticulous attention to detail. Perfect for bridal wear, festive occasions, and cultural celebrations where timeless elegance is desired. Material: Premium oxidised metal alloy | Embellishment: Freshwater pearl strands | Design: Temple medallion Goddess motifs | Finish: Antique oxidised silver | Style: Heritage statement necklace",
    price: BigInt(4999),
    imageUrl:
      "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.57-AM-1--4.jpeg",
  },
  {
    id: BigInt(5),
    name: "Maharani Temple Statement Bangles",
    gender: "women",
    description:
      "Bold, intricate, and regal, the Maharani Temple Statement Bangles are inspired by traditional South Indian temple jewelry. These beautifully detailed bangles feature intricate carvings and miniature temple-style motifs that showcase exceptional craftsmanship. The antique oxidised finish enhances the vintage aesthetic while the bold circular structure makes them a powerful statement accessory. These bangles are designed to elevate festive outfits, bridal wear, and traditional attire. Whether styled with silk sarees or ethnic ensembles, these bangles bring a royal elegance to your jewelry collection. Material: Premium oxidised metal alloy | Finish: Antique temple oxidised finish | Style: Traditional temple bangles | Size: Standard bangle size | Occasion: Festive, wedding, cultural events",
    price: BigInt(4299),
    imageUrl:
      "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.58-AM-1--5.jpeg",
  },
  {
    id: BigInt(6),
    name: "Crimson Bloom Drops",
    gender: "women",
    description:
      "Statement earrings with a circular oxidized silver base, deep ruby petal inlays, a ring of pearls around the edge, and a long decorative stem. These bold, eye-catching earrings are crafted to make an impression at festive gatherings, weddings, and cultural events. The crimson stone accents create a dramatic contrast against the antique silver finish, while the cascading pearl border adds a touch of feminine grace. Material: Premium oxidised metal alloy | Stones: Deep red semi-precious style stones | Embellishment: Pearl border | Finish: Antique oxidised silver | Style: Statement drop earrings | Closure: Push back",
    price: BigInt(3799),
    imageUrl: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.57-AM-6.jpeg",
  },
  {
    id: BigInt(7),
    name: "Radha Krishna Heritage Statement Earrings",
    gender: "women",
    description:
      "Celebrate divine love and timeless artistry with the Radha Krishna Heritage Statement Earrings. These intricately designed earrings depict the iconic Radha-Krishna motif, symbolizing love, harmony, and devotion. Crafted in an antique oxidised finish, the design features hand-carved purple stone accents that add a regal charm to the piece. The detailed metalwork highlights the graceful figures of Radha and Krishna playing the flute, making these earrings not only jewelry but a wearable piece of art. Delicate pearl drops at the base add movement and elegance, making them ideal for festive occasions, temple visits, weddings, and cultural celebrations. Material: Premium oxidised metal alloy | Stones: Purple semi-precious style stones | Embellishment: Pearl drops | Finish: Antique oxidised silver | Style: Temple jewelry statement earrings | Closure: Push back",
    price: BigInt(4799),
    imageUrl: "/assets/uploads/WhatsApp-Image-2026-03-03-at-12.03.30-PM-7.jpeg",
  },
  {
    id: BigInt(8),
    name: "Emerald Lotus Royal Jhumka Earrings",
    gender: "women",
    description:
      "Inspired by traditional Indian temple jewelry, the Emerald Lotus Royal Jhumka Earrings blend heritage craftsmanship with modern elegance. The earrings feature a beautifully carved square mint-green stone stud that adds a soft yet luxurious touch. Intricate oxidised silver carvings with floral and lotus motifs enhance the vintage aesthetic. The centerpiece showcases delicate stone detailing framed in oxidised metal, leading to a majestic gold-toned jhumka dome adorned with tiny ghungroo drops that create graceful movement. The dual-tone finish of antique silver and warm gold makes these earrings versatile enough to complement festive outfits, sarees, lehengas, and fusion wear. Material: High-quality oxidised alloy | Stones: Mint green carved stone accents | Finish: Dual tone (Antique silver & gold polish) | Style: Traditional statement jhumka | Closure: Push back | Weight: Medium-heavy statement piece",
    price: BigInt(4499),
    imageUrl: "/assets/uploads/WhatsApp-Image-2026-03-03-at-12.03.39-PM-8.jpeg",
  },
  {
    id: BigInt(9),
    name: "Celestial Orbit Bracelet",
    gender: "men",
    description:
      "A timeless oxidized silver bracelet inspired by planetary orbits and celestial beauty. The interlocking link design symbolizes eternal connection, while the oxidation process gives each piece unique depth and character. The fine engraving along each link adds a subtle texture that catches the light beautifully. Material: Oxidised silver alloy | Finish: Antique oxidised | Style: Contemporary stackable bracelet | Closure: Toggle clasp | Occasion: Everyday wear and festive",
    price: BigInt(2999),
    imageUrl:
      "/assets/generated/lunara-product-eternal-bracelet.dim_1024x1024.png",
  },
  {
    id: BigInt(10),
    name: "Stellar Dust Studs",
    gender: "men",
    description:
      "Delicate stud earrings featuring tiny star motifs in oxidized silver. The fine oxidized detailing makes each star shimmer with subtle sophistication, perfect for daily wear or gifting. These lightweight studs are crafted for comfort and elegance — a versatile addition to any jewelry collection. Material: Oxidised silver alloy | Style: Minimalist star studs | Finish: Antique oxidised | Closure: Butterfly push back | Occasion: Everyday and casual wear",
    price: BigInt(2200),
    imageUrl: "/assets/generated/lunara-product-starry-studs.dim_1024x1024.png",
  },
  {
    id: BigInt(11),
    name: "Dual Orbit Pendant Necklace",
    gender: "men",
    description:
      "A celestial-inspired necklace with two interlocking circular pendants representing planetary orbits. Handcrafted with intricate oxidized silver detailing, the pendant rests beautifully on a fine chain. The layered ring design symbolizes harmony and balance, making this piece both meaningful and elegant. Material: Oxidised silver alloy | Style: Geometric pendant necklace | Finish: Antique oxidised | Chain Length: Adjustable 16–18 inches | Occasion: Everyday and evening wear",
    price: BigInt(3299),
    imageUrl:
      "/assets/generated/lunara-product-dual-orbit-necklace.dim_1024x1024.png",
  },
  {
    id: BigInt(12),
    name: "Midnight Noir Choker",
    gender: "men",
    description:
      "A sophisticated choker necklace with oxidized silver links that sit close to the neck for a bold, modern look. The deep dark patina of the oxidized metal creates a striking contrast, making this piece ideal for evening wear, cocktail events, and special occasions. Each link is hand-finished for a smooth, comfortable fit. Material: Oxidised silver alloy | Style: Contemporary link choker | Finish: Deep antique oxidised | Length: 14–15 inches | Occasion: Evening and special events",
    price: BigInt(3599),
    imageUrl:
      "/assets/generated/lunara-product-midnight-choker.dim_1024x1024.png",
  },
  {
    id: BigInt(13),
    name: "Lunara Moon Charm Bracelet",
    gender: "men",
    description:
      "A delicate chain bracelet adorned with crescent moon charms that catch the light with every movement. The oxidized finish adds vintage warmth to this modern design, while the lightweight structure makes it comfortable for all-day wear. Stack it with other bracelets or wear it alone for a clean, elegant look. Material: Oxidised silver alloy | Embellishment: Crescent moon charms | Finish: Antique oxidised | Closure: Lobster clasp | Occasion: Everyday and festive",
    price: BigInt(2499),
    imageUrl:
      "/assets/generated/lunara-product-mooncharm-chain.dim_1024x1024.png",
  },
  {
    id: BigInt(14),
    name: "Celestial Charm Anklet",
    gender: "women",
    description:
      "A graceful anklet featuring an arrangement of celestial charms — stars, moons, and geometric shapes — that dance gently with every step. The oxidized silver finish adds beautiful depth and character to each charm. Lightweight and comfortable for extended wear, this anklet is perfect for beach days, festive occasions, and everyday elegance. Material: Oxidised silver alloy | Embellishment: Celestial multi-charm | Finish: Antique oxidised | Closure: Adjustable extension chain | Occasion: Everyday and festive",
    price: BigInt(2299),
    imageUrl: "/assets/generated/lunara-product-charm-anklet.dim_1024x1024.png",
  },
  {
    id: BigInt(15),
    name: "Bloom Nose Pin",
    gender: "women",
    description:
      "A delicate nose pin with a fine floral motif in oxidized silver. The miniature flower design is intricately crafted with subtle petal detailing that sits beautifully on the nose. Subtle, elegant, and easy to wear, this nose pin adds a graceful finishing touch to traditional and fusion outfits alike. Material: Oxidised silver alloy | Style: Floral nose pin | Finish: Antique oxidised | Closure: Screw back | Occasion: Everyday and ethnic wear",
    price: BigInt(2099),
    imageUrl:
      "/assets/generated/lunara-product-floral-nose-ring.dim_1024x1024.png",
  },
  {
    id: BigInt(16),
    name: "Verdant Leaf Hairpin",
    gender: "women",
    description:
      "An elegant hairpin featuring a cluster of oxidized silver leaves with detailed vein engravings. Nature-inspired and artfully crafted, this hairpin adds sophistication to any hairstyle — from loose waves to a classic bun. The sturdy pin ensures a secure hold while the leaf design adds a refined, botanical charm. Material: Oxidised silver alloy | Style: Leaf cluster hairpin | Finish: Antique oxidised | Occasion: Everyday, festive, and bridal styling",
    price: BigInt(2199),
    imageUrl: "/assets/generated/lunara-product-leaf-hairpin.dim_1024x1024.png",
  },
  {
    id: BigInt(17),
    name: "Constellation Story Brooch",
    gender: "unisex",
    description:
      "A stunning brooch mapping your favourite constellation in oxidized silver. Wearable art that tells a celestial story — each star point is individually crafted and connected with fine silver bridges. Pin it to sarees, shawls, blazers, or bags for an unexpected touch of elegance. Material: Oxidised silver alloy | Style: Celestial constellation brooch | Finish: Antique oxidised | Dimensions: Approx. 4 cm diameter | Occasion: Festive, formal, and gifting",
    price: BigInt(3199),
    imageUrl:
      "/assets/generated/lunara-product-constellation-brooch.dim_1024x1024.png",
  },
  {
    id: BigInt(18),
    name: "Shadowplay Band Ring",
    gender: "men",
    description:
      "A sleek band ring with artfully etched shadow-play engravings that shift beautifully with the light. The oxidized silver finish creates contrast within the engraved grooves, giving depth to the minimal design. Perfect for everyday elegance with a touch of mystery and understated luxury. Material: Oxidised silver alloy | Style: Engraved band ring | Finish: Antique oxidised | Size: Adjustable | Occasion: Everyday and casual wear",
    price: BigInt(2299),
    imageUrl:
      "/assets/generated/lunara-product-shadowband-ring.dim_1024x1024.png",
  },
  {
    id: BigInt(19),
    name: "Moon Phase Statement Ring",
    gender: "men",
    description:
      "A striking oxidized silver ring featuring continuous moon phase engravings around the band. Each lunar phase is carefully crafted to capture the cycle's mystical beauty — from new moon to full moon. A meaningful piece for those who feel connected to lunar energy and timeless design. Material: Oxidised silver alloy | Style: Moon phase engraved ring | Finish: Antique oxidised | Size: Adjustable | Occasion: Everyday, gifting, and festive",
    price: BigInt(2799),
    imageUrl: "/assets/generated/lunara-product-moonlit-ring.dim_1024x1024.png",
  },
  {
    id: BigInt(20),
    name: "Lunara Celestial Pendant",
    gender: "men",
    description:
      "An elegant pendant showcasing a star constellation design in oxidized silver. The deep dark patina creates rich depth and dimension, making each star appear to shine from within the metal. Suspended on a fine adjustable chain, this pendant is a refined everyday piece and a beautiful gift for the stargazer in your life. Material: Oxidised silver alloy | Style: Constellation pendant | Finish: Antique oxidised | Chain Length: Adjustable 16–18 inches | Occasion: Everyday, gifting, and festive",
    price: BigInt(3499),
    imageUrl:
      "/assets/generated/lunara-product-celestial-pendant.dim_1024x1024.png",
  },
];
