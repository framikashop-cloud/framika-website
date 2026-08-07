# 🛠️ Framika Invites - Easy Content & Store Management Guide

All website content, discount coupons, products, photos, videos, prices, and live ticker notifications can now be managed easily from **ONE single file**:

📌 **File Path:** [`config.js`](file:///D:/antigravity/my%20site/config.js)

---

## 🎟️ 1. How to Add or Change Coupon Codes

Open [`config.js`](file:///D:/antigravity/my%20site/config.js) and look for `promoCodes`:

```javascript
promoCodes: {
  'FIRST50': { type: 'fixed', value: 50, label: '₹50 OFF (Welcome Offer)' },
  'FRAMIKA10': { type: 'percent', value: 10, label: '10% OFF' },
  'MYDISCOUNT': { type: 'fixed', value: 100, label: '₹100 OFF' } // <-- ADD NEW COUPON HERE
}
```
* **Fixed Discount (₹ off):** Set `type: 'fixed'` and `value: 50` (gives ₹50 discount).
* **Percentage Discount (% off):** Set `type: 'percent'` and `value: 15` (gives 15% discount).

---

## 📹 2. How to Add a New Video Invitation

To add a new video to your website, copy and paste this template inside the `videos: [ ... ]` list in [`config.js`](file:///D:/antigravity/my%20site/config.js):

```javascript
{
  title: 'NM-MR-B-06',
  description: 'Royal Marathi Naming Ceremony invitation video for baby boy.',
  oldPrice: '399',
  newPrice: '299',
  directVideoUrl: 'https://your-server.com/path-to-video.mp4',
  thumbnailImage: 'https://your-server.com/path-to-thumbnail.jpg',
  whatsappName: 'NM-MR-B-06',
  badge: 'NEW', // Options: 'BEST VALUE', 'PREMIUM', 'NEW', 'Best seller', or ''
  gender: 'boy', // Options: 'boy', 'girl', or 'both'
  type: 'video'
},
```

---

## 🖼️ 3. How to Add a New Digital Card / Photo

To add a new single-page digital invitation card or photo, copy and paste this template inside the `cards: [ ... ]` list in [`config.js`](file:///D:/antigravity/my%20site/config.js):

```javascript
{
  title: 'Card 10',
  description: 'Festive traditional Marathi naming ceremony digital invitation card.',
  oldPrice: '199',
  newPrice: '149',
  image: 'https://your-server.com/path-to-card-image.png',
  whatsappName: 'Card 10',
  badge: 'NEW', // Options: 'NEW', 'POPULAR', or ''
  gender: 'girl', // Options: 'boy', 'girl', or 'both'
  type: 'card'
},
```

---

## 🗑️ 4. How to Delete a Video or Card

Simply open [`config.js`](file:///D:/antigravity/my%20site/config.js) and delete the object block `{ ... }` corresponding to the video or card you wish to remove.

---

## 🔔 5. How to Edit Social Proof Ticker Notifications

Look for `socialProofEvents` in [`config.js`](file:///D:/antigravity/my%20site/config.js):

```javascript
socialProofEvents: [
  { name: 'Sneta P.', city: 'Pune', item: 'NM-MR-B-01', type: 'ordered', time: '4 mins ago' },
  { name: 'Rahul M.', city: 'Nashik', item: 'Card 2', type: 'added', time: '2 mins ago' }
]
```
Add or change customer names, cities, items, or times to customize live order popups.

---

## 📲 6. How to Change Your WhatsApp Number

In [`config.js`](file:///D:/antigravity/my%20site/config.js), change:
```javascript
whatsappNumber: '919431817472', // Enter your 12-digit number with country code (e.g. 91...)
```
