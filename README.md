# Framika Invites website

## Where to make changes

- `index.html` contains the page structure, wording, SEO details, and the footer.
- `assets/css/styles.css` contains custom visual styles.
- `assets/js/products.js` is the product catalogue. Add, remove, or update invitation designs here.
- `assets/js/app.js` contains the website behaviour: filters, video playback, image preview, and WhatsApp ordering.

## Add a video invitation

In `assets/js/products.js`, add an item inside `VIDEOS_FOLDER` using this pattern:

```js
{
  title: 'NM-MR-B-06',
  description: 'Short description of the invitation.',
  oldPrice: '299',
  newPrice: '199',
  directVideoUrl: 'https://your-video-url.mp4',
  thumbnailImage: 'https://your-thumbnail-url.jpg',
  whatsappName: 'NM-MR-B-06',
  badge: 'NEW',
  gender: 'boy'
}
```

## Add a digital card

Add an item inside `CARDS_FOLDER` using this pattern:

```js
{
  title: 'Card 7',
  description: 'Short description of the card.',
  oldPrice: '199',
  newPrice: '149',
  image: 'https://your-image-url.png',
  whatsappName: 'Card 7',
  badge: 'NEW',
  gender: 'girl'
}
```

Use `boy`, `girl`, or `both` for `gender`. Leave `badge` as an empty string when there is no label.
