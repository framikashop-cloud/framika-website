/* ==========================================================================
   FRAMIKA INVITES - EASY CONTENT & STORE CONFIGURATION FILE
   ==========================================================================
   Use this file to easily ADD, EDIT, or REMOVE:
   - Promo / Coupon Codes (Discounts)
   - Video Invitations (Add new MP4 videos, change prices/thumbnails)
   - Digital Cards (Add new JPG/PNG photos, change prices)
   - Social Proof Order Notifications (Customer ticker)
   - WhatsApp Contact Number & Combo Offer Settings
   ========================================================================== */

const SITE_CONFIG = {

  // ------------------------------------------------------------------------
  // 1. WHATSAPP & BUSINESS CONTACT
  // ------------------------------------------------------------------------
  whatsappNumber: '919431817472', // WhatsApp number where orders are sent (with country code, no +)


  // ------------------------------------------------------------------------
  // 2. PROMO & DISCOUNT COUPON CODES
  // Add new coupons, change discount values, or remove coupons here.
  // - type: 'fixed' (amount in ₹) or 'percent' (percentage OFF)
  // ------------------------------------------------------------------------
  promoCodes: {
    'FIRST50': { type: 'fixed', value: 50, label: '₹50 OFF (Welcome Offer)' },
    'FRAMIKA10': { type: 'percent', value: 10, label: '10% OFF' },
    'SPECIAL30': { type: 'fixed', value: 30, label: '₹30 OFF' },
    'COMBO299': { type: 'fixed', value: 25, label: '₹25 Extra Combo Bonus' }
  },


  // ------------------------------------------------------------------------
  // 3. COMBO OFFER SETTINGS
  // ------------------------------------------------------------------------
  comboOffer: {
    enabled: true,
    comboPrice: 349, // Total bundle price when 1 Video + 1 Card are in cart
    standardVideoPrice: 299,
    standardCardPrice: 149
  },


  // ------------------------------------------------------------------------
  // 4. VIDEO INVITATIONS CATALOGUE
  // To ADD a new video invitation: Copy one video object, paste below, and edit details.
  // To REMOVE a video: Delete its object block from the list.
  // ------------------------------------------------------------------------
  videos: [
    {
      title: 'NM-MR-B-01',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby boy designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780067/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-01_pcdvei.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780067/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-01_pcdvei.jpg',
      whatsappName: 'NM-MR-B-01',
      badge: 'Best seller',
      gender: 'boy', // Options: 'boy', 'girl', or 'both'
      type: 'video'
    },
    {
      title: 'NM-MR-B-05',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby boy designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780066/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-05_r6gfyi.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780066/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-05_r6gfyi.jpg',
      whatsappName: 'NM-MR-B-05',
      badge: 'BEST VALUE',
      isCombo: true,
      gender: 'boy',
      type: 'video'
    },
    {
      title: 'NM-MR-B-02',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby boy designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780067/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-02_rsoqxu.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780067/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-02_rsoqxu.jpg',
      whatsappName: 'NM-MR-B-02',
      badge: 'PREMIUM',
      gender: 'boy',
      type: 'video'
    },
    {
      title: 'NM-MR-B-03',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby boy designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780066/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-03_fsmppj.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780066/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-03_fsmppj.jpg',
      whatsappName: 'NM-MR-B-03',
      badge: 'PREMIUM',
      gender: 'boy',
      type: 'video'
    },
    {
      title: 'NM-MR-B-04',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby boy designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780066/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-04_glbdnm.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783780066/%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80/NM-MR-B-04_glbdnm.jpg',
      whatsappName: 'NM-MR-B-04',
      badge: 'PREMIUM',
      gender: 'boy',
      type: 'video'
    },
    {
      title: 'NM-MR-G-02',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby girl designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783788299/NM-MR-G-02_neifnd.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783788299/NM-MR-G-02_neifnd.jpg',
      whatsappName: 'NM-MR-G-02',
      badge: 'PREMIUM',
      gender: 'girl',
      type: 'video'
    },
    {
      title: 'NM-MR-G-01',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby girl designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783788297/NM-MR-G-01_q2hkkg.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783788297/NM-MR-G-01_q2hkkg.jpg',
      whatsappName: 'NM-MR-G-01',
      badge: 'PREMIUM',
      gender: 'girl',
      type: 'video'
    },
    {
      title: 'NM-MR-TG-01',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby girl designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783788299/NM-MR-TG-01_orkpe7.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1783788299/NM-MR-TG-01_orkpe7.jpg',
      whatsappName: 'NM-MR-TG-01',
      badge: 'PREMIUM',
      gender: 'girl',
      type: 'video'
    },
    {
      title: 'NM-MR-BG-03',
      description: 'Premium Marathi Naming Ceremony invitation video featuring traditional baby girl designs.',
      oldPrice: '399',
      newPrice: '299',
      directVideoUrl: 'https://res.cloudinary.com/hic9igq3/video/upload/v1785203477/NM-MR-BG-03_zbi8pu.mp4',
      thumbnailImage: 'https://res.cloudinary.com/hic9igq3/video/upload/v1785203477/NM-MR-BG-03_zbi8pu.jpg',
      whatsappName: 'NM-MR-BG-03',
      badge: 'NEW',
      gender: 'girl',
      type: 'video'
    }
  ],


  // ------------------------------------------------------------------------
  // 5. DIGITAL CARDS / PHOTOS CATALOGUE
  // To ADD a new digital card or photo: Copy one card object, paste below, and edit details.
  // To REMOVE a card: Delete its object block from the list.
  // ------------------------------------------------------------------------
  cards: [
    {
      title: 'Card 1',
      description: 'A beautiful single-page digital card with floral borders.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1783788274/card_2_at2ktb.png',
      whatsappName: 'Card 1',
      badge: '',
      gender: 'boy', // Options: 'boy', 'girl', or 'both'
      type: 'card'
    },
    {
      title: 'Card 2',
      description: 'Traditional Marathi welcome and Naamkaran digital card design.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1783788273/%E0%A4%B8%E0%A5%8D%E0%A4%B2%E0%A4%BE%E0%A4%97%E0%A4%A4%E0%A4%B8%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A5%81%E0%A4%95_%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80._%E0%A4%B9%E0%A4%B0%E0%A5%80%E0%A4%B6_%E0%A4%9A%E0%A4%82%E0%A4%A6%E0%A5%8D%E0%A4%B0_%E0%A4%A8%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%AF%E0%A4%A3_%E0%A4%AA%E0%A4%B5%E0%A4%BE%E0%A4%B0_%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80._%E0%A4%AC%E0%A4%AC%E0%A4%BF%E0%A4%A4%E0%A4%BE_%E0%A4%A8%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%AF%E0%A4%A3_%E0%A4%AA%E0%A4%B5%E0%A4%BE%E0%A4%B0_kaodud.png',
      whatsappName: 'Card 2',
      badge: '',
      gender: 'boy',
      type: 'card'
    },
    {
      title: 'Card 3',
      description: 'Lovely pink themed baby girl naming ceremony invitation card.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1783788273/card_4_zonw8v.jpg',
      whatsappName: 'Card 3',
      badge: '',
      gender: 'girl',
      type: 'card'
    },
    {
      title: 'Card 4',
      description: 'Classic royal blue design with gold accents for baby boy.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1783788275/card_3_jckabn.png',
      whatsappName: 'Card 4',
      badge: '',
      gender: 'boy',
      type: 'card'
    },
    {
      title: 'Card 5',
      description: 'Festive pastel digital invitation card for baby girl naming ceremony.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1783788273/card_1_jyfhix.png',
      whatsappName: 'Card 5',
      badge: '',
      gender: 'girl',
      type: 'card'
    },
    {
      title: 'Card 6',
      description: 'Modern floral baby naming ceremony card for WhatsApp.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1784266023/Untitled_design_19_zpjxye.png',
      whatsappName: 'Card 6',
      badge: '',
      gender: 'girl',
      type: 'card'
    },
    {
      title: 'Card 7',
      description: 'Premium digital Naamkaran invitation card with elegant traditional motifs.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1785201709/card_7_z8ite0.png',
      whatsappName: 'Card 7',
      badge: 'NEW',
      gender: 'boy',
      type: 'card'
    },
    {
      title: 'Card 8',
      description: 'Elegant Marathi baby naming ceremony digital card for WhatsApp.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1785201710/card_8_jytfjd.jpg',
      whatsappName: 'Card 8',
      badge: 'NEW',
      gender: 'girl',
      type: 'card'
    },
    {
      title: 'Card 9',
      description: 'Beautiful single-page digital invitation card for baby naming ceremony.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1785201711/Card_9_tw2i1y.png',
      whatsappName: 'Card 9',
      badge: 'NEW',
      gender: 'both',
      type: 'card'
    }
    {
      title: 'Card 10',
      description: 'Beautiful single-page digital invitation card for baby naming ceremony.',
      oldPrice: '199',
      newPrice: '149',
      image: 'https://res.cloudinary.com/hic9igq3/image/upload/v1786284022/card_10_moysdo.png',
      whatsappName: 'Card 10',
      badge: 'NEW',
      gender: 'both',
      type: 'card'
    }
  ],


  // ------------------------------------------------------------------------
  // 6. LIVE ORDER SOCIAL PROOF TICKER NOTIFICATIONS
  // Add or edit customer order notifications shown in the bottom-left popup.
  // ------------------------------------------------------------------------
  socialProofEvents: [
    { name: 'Sneta P.', city: 'Pune', item: 'NM-MR-B-01', type: 'ordered', time: '4 mins ago' },
    { name: 'Rahul M.', city: 'Nashik', item: 'Card 2', type: 'added', time: '2 mins ago' },
    { name: 'Priya S.', city: 'Mumbai', item: 'NM-MR-G-02', type: 'ordered', time: '10 mins ago' },
    { name: 'Vikram K.', city: 'Nagpur', item: 'Card 7', type: 'added', time: 'Just now' },
    { name: 'Anjali D.', city: 'Thane', item: 'NM-MR-TG-01', type: 'ordered', time: '7 mins ago' },
    { name: 'Sanjay R.', city: 'Kolhapur', item: 'Card 3', type: 'added', time: '14 mins ago' },
    { name: 'Amol B.', city: 'PCMC', item: 'NM-MR-B-05', type: 'ordered', time: '3 mins ago' }
  ]

};
