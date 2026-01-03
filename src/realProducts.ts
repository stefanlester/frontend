export type Product = {
  id: number;
  name: string;
  price: number;
  priceMin?: number;
  priceMax?: number;
  duration: number;
  category: string;
  image: string;
  description: string;
};

export const realProducts: Product[] = [
  // CORNROWS (EXTENSIONS)
  {
    id: 1,
    name: 'Shuku Braids',
    price: 90,
    duration: 180, // 3hrs
    category: 'Cornrows (Extensions)',
    image: '/New folder (3)/Shuku braids/Shuku_Pony.jpeg',
    description: 'Traditional Shuku cornrow braids with extensions.'
  },
  {
    id: 2,
    name: 'Cornrow Rasta',
    price: 100,
    duration: 180, // 3hrs
    category: 'Cornrows (Extensions)',
    image: '/New folder (3)/Conrow into twist/conrow into twist.jpeg',
    description: 'Cornrow rasta style with extensions.'
  },
  {
    id: 3,
    name: 'Curl Cornrows',
    price: 100,
    duration: 180, // 3hrs
    category: 'Cornrows (Extensions)',
    image: '/HAIR PICS/STITCH CORNROW WEAVES/PHOTO-2025-12-18-18-57-46_2.jpg',
    description: 'Cornrows with curly extensions.'
  },
  {
    id: 4,
    name: 'Lemonade / Fulani / Half Up',
    price: 100,
    duration: 240, // 4hrs
    category: 'Cornrows (Extensions)',
    image: '/LEMONADES, FULANI BRAIDS/WhatsApp Image 2025-12-21 at 15.20.30 (1).jpeg',
    description: 'Lemonade braids, Fulani braids, or half-up styles.'
  },
  {
    id: 5,
    name: 'Picture / Freestyling Rows',
    price: 80,
    duration: 180, // 3hrs
    category: 'Cornrows (Extensions)',
    image: '/HAIR PICS/STITCH CORNROW WEAVES/PHOTO-2025-12-18-18-57-47.jpg',
    description: 'Picture-perfect or freestyle cornrow designs.'
  },

  // WEAVES / SEW INS
  {
    id: 6,
    name: 'Take Out / Restyling',
    price: 40,
    duration: 120, // 2hrs
    category: 'Weaves / Sew Ins',
    image: '/images/new/weaves-sew-inn/whatsapp-image-2025-12-22-at-08-56-12.jpeg',
    description: 'Take out old weave and restyle service.'
  },
  {
    id: 7,
    name: 'Closure / Frontal Weaves',
    price: 80,
    duration: 180, // 3hrs
    category: 'Weaves / Sew Ins',
    image: '/HAIR PICS/FRONTAL LACE INSTALL/WhatsApp Image 2025-12-21 at 12.22.45 (1).jpeg',
    description: 'Closure or frontal weave installation.'
  },
  {
    id: 8,
    name: 'Leave Out Sew Ins',
    price: 80,
    duration: 150, // 2hrs 30mins
    category: 'Weaves / Sew Ins',
    image: '/images/new/leave-out-weaves/whatsapp-image-2025-12-22-at-09-14-25-1-1.jpeg',
    description: 'Leave out sew-in weave style.'
  },
  {
    id: 9,
    name: 'Double Track Weaves',
    price: 100,
    duration: 180, // 3hrs
    category: 'Weaves / Sew Ins',
    image: '/images/new/weaves-sew-inn/whatsapp-image-2025-12-22-at-08-56-12-2.jpeg',
    description: 'Double track weave installation.'
  },
  {
    id: 10,
    name: 'Full Head / Sealing Weaves',
    price: 80,
    duration: 180, // 3hrs
    category: 'Weaves / Sew Ins',
    image: '/images/new/weaves-sew-inn/whatsapp-image-2025-12-22-at-08-56-12-1.jpeg',
    description: 'Full head or sealed weave installation.'
  },
  {
    id: 11,
    name: 'Tonging / Straightening',
    price: 25,
    duration: 40, // 40mins
    category: 'Weaves / Sew Ins',
    image: '/New folder (3)/tonging/Tonging.jpeg',
    description: 'Hair tonging or straightening service.'
  },

  // COLOURING / REVAMPING
  {
    id: 12,
    name: 'Own Colour',
    price: 75,
    priceMin: 50,
    priceMax: 100,
    duration: 120, // 2hrs
    category: 'Colouring / Revamping',
    image: '/New folder (3)/Single colour application/Single colour application.jpeg',
    description: 'Single color application with your own color.'
  },
  {
    id: 13,
    name: 'Double Colour',
    price: 105,
    priceMin: 60,
    priceMax: 150,
    duration: 180, // 3hrs
    category: 'Colouring / Revamping',
    image: '/New folder (3)/Double tone applicator/Double tone applicator.jpeg',
    description: 'Two-tone color application.'
  },
  {
    id: 14,
    name: 'Bleaching / Tips',
    price: 125,
    priceMin: 50,
    priceMax: 200,
    duration: 180, // 3hrs
    category: 'Colouring / Revamping',
    image: '/New folder (3)/coloring bleach_taps/Coloring bleach  _ taps.jpeg',
    description: 'Hair bleaching or tip highlights.'
  },
  {
    id: 15,
    name: 'Wig Revamping',
    price: 100,
    priceMin: 80,
    priceMax: 120,
    duration: 480, // Full day (approx 8hrs)
    category: 'Colouring / Revamping',
    image: '/New folder (3)/Wig revamping/Wig revamping.jpeg',
    description: 'Professional wig revamping and customization.'
  },

  // LACE INSTALLS
  {
    id: 16,
    name: 'Frontal Install',
    price: 65,
    priceMin: 50,
    priceMax: 80,
    duration: 120, // 2hrs
    category: 'Lace Installs',
    image: '/HAIR PICS/FRONTAL LACE INSTALL/WhatsApp Image 2025-12-21 at 12.22.45.jpeg',
    description: 'Professional frontal lace installation.'
  },
  {
    id: 17,
    name: '360 Lace Install',
    price: 87,
    priceMin: 75,
    priceMax: 100,
    duration: 120, // 2hrs
    category: 'Lace Installs',
    image: '/HAIR PICS/FRONTAL LACE INSTALL/WhatsApp Image 2025-12-21 at 12.22.46.jpeg',
    description: '360 lace wig installation.'
  },
  {
    id: 18,
    name: 'Glueless Install',
    price: 45,
    duration: 60, // 1hr
    category: 'Lace Installs',
    image: '/New folder (3)/glueless install/Glueless install.jpeg',
    description: 'Glueless lace wig installation.'
  },

  // GODDESS / BOHO / KNOTLESS
  {
    id: 19,
    name: 'Spiral Braids',
    price: 145,
    priceMin: 90,
    priceMax: 200,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/HAIR PICS/SPIRAL BRAIDS/WhatsApp Image 2025-12-21 at 12.22.14 (1).jpeg',
    description: 'Beautiful spiral braids with goddess style.'
  },
  {
    id: 20,
    name: 'Tip Curls',
    price: 112,
    priceMin: 75,
    priceMax: 150,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Tip curls/Tip curls.jpeg',
    description: 'Knotless braids with curled tips.'
  },
  {
    id: 21,
    name: 'Boho Braids',
    price: 145,
    priceMin: 90,
    priceMax: 200,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Bohoo braids/Boohoo braids.jpeg',
    description: 'Trendy Boho knotless braids.'
  },
  {
    id: 22,
    name: 'Goddess Braids',
    price: 140,
    priceMin: 80,
    priceMax: 200,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Goddess braids/Goddess braids.jpeg',
    description: 'Classic goddess knotless braids.'
  },
  {
    id: 23,
    name: 'Pick and Drop',
    price: 115,
    priceMin: 80,
    priceMax: 150,
    duration: 210, // 3hrs 30mins
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Pick _ drop/Pick_drop.jpeg',
    description: 'Pick and drop knotless style.'
  },
  {
    id: 24,
    name: 'Diva Braids',
    price: 170,
    priceMin: 90,
    priceMax: 250,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Diva braids/Diva braids.jpeg',
    description: 'Glamorous diva knotless braids.'
  },
  {
    id: 25,
    name: 'Milano Curl Braids',
    price: 250,
    priceMin: 100,
    priceMax: 400,
    duration: 360, // 6hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Milano curls braids/Milano curls.jpeg',
    description: 'Premium Milano curl knotless braids.'
  },
  {
    id: 26,
    name: 'Bantu Knots',
    price: 75,
    priceMin: 50,
    priceMax: 100,
    duration: 120, // 2hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/bantu knots/Bantu knots.jpeg',
    description: 'Traditional Bantu knot style.'
  },
  {
    id: 27,
    name: 'Fulani Braids',
    price: 142,
    priceMin: 85,
    priceMax: 200,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/LEMONADES, FULANI BRAIDS/WhatsApp Image 2025-12-21 at 15.20.30 (2).jpeg',
    description: 'Authentic Fulani tribal braids.'
  },
  {
    id: 28,
    name: 'Lemonade Braids',
    price: 142,
    priceMin: 85,
    priceMax: 200,
    duration: 240, // 4hrs
    category: 'Goddess / Boho / Knotless',
    image: '/LEMONADES, FULANI BRAIDS/WhatsApp Image 2025-12-21 at 15.20.30.jpeg',
    description: 'Trendy lemonade side braids.'
  },
  {
    id: 29,
    name: 'African Queen',
    price: 92,
    priceMin: 85,
    priceMax: 100,
    duration: 150, // 2½hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/African queen/african queen.jpeg',
    description: 'African queen knotless style.'
  },
  {
    id: 30,
    name: 'Crochet Braids',
    price: 80,
    priceMin: 60,
    priceMax: 100,
    duration: 180, // 3hrs
    category: 'Goddess / Boho / Knotless',
    image: '/New folder (3)/Crochet braids/Crochet braids.jpeg',
    description: 'Quick and beautiful crochet braids.'
  },

  // LOCS
  {
    id: 31,
    name: 'Starter Locs',
    price: 210,
    priceMin: 120,
    priceMax: 300,
    duration: 240, // 4hrs
    category: 'Locs',
    image: '/New folder (3)/starter locs/Starter locs.jpeg',
    description: 'Begin your loc journey with starter locs.'
  },
  {
    id: 32,
    name: 'Sister Locs / Micro Locs',
    price: 450,
    priceMin: 300,
    priceMax: 600,
    duration: 540, // 9hrs
    category: 'Locs',
    image: '/New folder (3)/Sister locs_micro/Sister locs_micro locs.jpeg',
    description: 'Intricate sister or micro locs installation.'
  },
  {
    id: 33,
    name: 'Palm Rolls',
    price: 87,
    priceMin: 75,
    priceMax: 100,
    duration: 120, // 2hrs
    category: 'Locs',
    image: '/New folder (3)/Palm rolls/Palm rolls.jpeg',
    description: 'Palm rolling loc maintenance.'
  },
  {
    id: 34,
    name: 'Comb Locs',
    price: 75,
    priceMin: 50,
    priceMax: 100,
    duration: 90, // 1hr 30mins
    category: 'Locs',
    image: '/images/new/dread-sister-locs/whatsapp-image-2025-12-22-at-08-46-53-1.jpeg',
    description: 'Comb coil loc technique.'
  },
  {
    id: 35,
    name: 'Dread Locking',
    price: 100,
    priceMin: 80,
    priceMax: 120,
    duration: 180, // 3hrs
    category: 'Locs',
    image: '/New folder (3)/Dread locking/dread locking.jpeg',
    description: 'Professional dreadlock installation.'
  },
  {
    id: 36,
    name: 'Inter-Locs',
    price: 80,
    duration: 120, // 2hrs
    category: 'Locs',
    image: '/New folder (3)/Inter lock/Inter lock.jpeg',
    description: 'Interlocking loc maintenance.'
  },
  {
    id: 37,
    name: 'Barrel Twists',
    price: 60,
    duration: 120, // 2hrs
    category: 'Locs',
    image: '/HAIR PICS/BARREL TWIST/PHOTO-2025-12-18-18-33-23.jpg',
    description: 'Barrel twist protective style.'
  },
  {
    id: 38,
    name: 'Loc Restyling',
    price: 60,
    duration: 60, // 1hr
    category: 'Locs',
    image: '/HAIR PICS/BARREL TWIST/PHOTO-2025-12-18-18-33-23_1.jpg',
    description: 'Restyle your existing locs.'
  },
  {
    id: 39,
    name: 'Detoxing',
    price: 80,
    duration: 120, // 2hrs
    category: 'Locs',
    image: '/New folder (3)/Detoxing/detoxing.jpeg',
    description: 'Loc detoxing and deep cleansing.'
  },

  // SERVICE (General Services)
  {
    id: 40,
    name: 'Wash & Blowdry',
    price: 25,
    duration: 80, // 1hr 20mins
    category: 'Service',
    image: '/New folder (3)/Wash_blowdry/Wash and blowdry.jpeg',
    description: 'Professional wash and blow dry service.'
  },
  {
    id: 41,
    name: 'Wash & Treatment',
    price: 35,
    duration: 120, // 2hrs
    category: 'Service',
    image: '/New folder (3)/Detoxing/detoxing.jpeg',
    description: 'Deep cleansing wash with hair treatment.'
  },
  {
    id: 42,
    name: 'Detangling',
    price: 20,
    duration: 40, // 40mins
    category: 'Service',
    image: '/New folder (3)/Detangling/Detangling_curl.jpeg',
    description: 'Gentle detangling service for all hair types.'
  },
  {
    id: 43,
    name: 'Trim and Blowdry',
    price: 30,
    duration: 40, // 40mins
    category: 'Service',
    image: '/New folder (3)/Trim_blowdry/Trim_blowdry.jpeg',
    description: 'Trim and professional blow dry.'
  },
  {
    id: 44,
    name: 'Sleek Ponytail',
    price: 60,
    duration: 80, // 1hr 20mins
    category: 'Service',
    image: '/New folder (3)/Sleek ponytail/Sleek ponytail.jpeg',
    description: 'Sleek and polished ponytail style.'
  },
  {
    id: 45,
    name: 'Cutting / Fringe / Style',
    price: 30,
    duration: 30, // 30mins
    category: 'Service',
    image: '/New folder (3)/Pixie cuttingtrim _style/Pixie cuttingtrim _style.jpeg',
    description: 'Hair cutting, fringe, or styling service.'
  },
  {
    id: 46,
    name: 'Curl Defining / Style',
    price: 30,
    duration: 60, // 1hr
    category: 'Service',
    image: '/New folder (3)/Curling style/Curlingstyle.jpeg',
    description: 'Curl defining and styling service.'
  },

  // CORNROWS (NO EXTENSIONS)
  {
    id: 47,
    name: 'Big Cornrows',
    price: 25,
    duration: 40, // 40mins
    category: 'Cornrows (No Extensions)',
    image: '/WhatsApp Image 2025-12-27 at 19.22.15 (1).jpeg',
    description: 'Simple big cornrows without extensions.'
  },
  {
    id: 48,
    name: 'Stitch Cornrows',
    price: 35,
    duration: 60, // 1hr
    category: 'Cornrows (No Extensions)',
    image: '/New folder (3)/Shuku Conrows/Shuku Conrows.jpeg',
    description: 'Stitch cornrows without extensions.'
  },
  {
    id: 49,
    name: 'Freestyling Cornrows',
    price: 45,
    priceMin: 30,
    priceMax: 60,
    duration: 60, // 1hr
    category: 'Cornrows (No Extensions)',
    image: '/New folder (3)/Free styling Conrows/Free styling Conrows.jpeg',
    description: 'Creative freestyle cornrow patterns.'
  },

  // TWISTS
  {
    id: 50,
    name: 'Marley Twist',
    price: 110,
    priceMin: 70,
    priceMax: 150,
    duration: 210, // 3hrs 30mins
    category: 'Twists',
    image: '/New folder (3)/Marley  twist/Marley  twist.jpeg',
    description: 'Classic Marley twist protective style.'
  },
  {
    id: 51,
    name: 'Comb Twist',
    price: 72,
    priceMin: 45,
    priceMax: 100,
    duration: 90, // 1hr 30mins
    category: 'Twists',
    image: '/HAIR PICS/INVISIBLE 2 STRAND TWISTS/PHOTO-2025-12-18-18-34-27_1.jpg',
    description: 'Comb twist technique for natural hair.'
  },
  {
    id: 52,
    name: 'Senegalese Twist',
    price: 200,
    priceMin: 150,
    priceMax: 250,
    duration: 240, // 4hrs
    category: 'Twists',
    image: '/New folder (3)/Senegalese rope/Senegalese rope.jpeg',
    description: 'Elegant Senegalese rope twists.'
  },
  {
    id: 53,
    name: 'Passion Twist',
    price: 95,
    priceMin: 70,
    priceMax: 120,
    duration: 210, // 3hrs 30mins
    category: 'Twists',
    image: '/HAIR PICS/INVISIBLE 2 STRAND TWISTS/PHOTO-2025-12-18-18-34-28_1.jpg',
    description: 'Trendy passion twist hairstyle.'
  },
  {
    id: 54,
    name: 'Two Strand / Plug Twist',
    price: 62,
    priceMin: 45,
    priceMax: 80,
    duration: 80, // 1hr 20mins
    category: 'Twists',
    image: '/New folder (3)/Plug twist/Plug twist.jpeg',
    description: 'Classic two strand twist style.'
  },
  {
    id: 55,
    name: 'Kinky Twist',
    price: 162,
    priceMin: 75,
    priceMax: 250,
    duration: 180, // 3hrs
    category: 'Twists',
    image: '/New folder (3)/Kinky twist/Kinky twist.jpeg',
    description: 'Textured kinky twist protective style.'
  },

  // KNOTLESS
  {
    id: 56,
    name: 'French Curls',
    price: 120,
    priceMin: 90,
    priceMax: 150,
    duration: 240, // 4hrs
    category: 'Knotless',
    image: '/New folder (3)/French curls/French curl.jpeg',
    description: 'French curl knotless braids.'
  },
  {
    id: 57,
    name: 'Jumbo / Regular Straight Tip',
    price: 115,
    priceMin: 80,
    priceMax: 150,
    duration: 180, // 3hrs
    category: 'Knotless',
    image: '/New folder (3)/Regular straight tips/Regular straight tips.jpeg',
    description: 'Jumbo or regular knotless with straight tips.'
  },
  {
    id: 58,
    name: 'Expressions / Ultra',
    price: 105,
    priceMin: 60,
    priceMax: 150,
    duration: 240, // 4hrs
    category: 'Knotless',
    image: '/New folder (3)/Expressionultra/Expression -ultra.jpeg',
    description: 'Expressions or ultra knotless braids.'
  }
];

