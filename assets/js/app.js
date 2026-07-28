/* Page behaviour. Product details live in products.js. */
const WHATSAPP_NUMBER = '919431817472';
let currentTab = 'video';
let currentFilter = 'all';

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

function getFilteredItems(items) {
  return items.filter((item) => currentFilter === 'all' || item.gender === currentFilter || item.gender === 'both');
}

function openOrderForm(itemName) {
  const modal = document.getElementById('order-form-modal');
  const titleSpan = document.getElementById('modal-design-title');
  const designInput = document.getElementById('selectedDesign');
  
  if (titleSpan) titleSpan.textContent = itemName;
  if (designInput) designInput.value = itemName;

  // Auto-select gender if title indicates gender
  if (itemName.includes('NM-MR-B') || itemName.toLowerCase().includes('boy')) {
    const boyRadio = document.getElementById('gender-boy');
    if (boyRadio) boyRadio.checked = true;
  } else if (itemName.includes('NM-MR-G') || itemName.toLowerCase().includes('girl')) {
    const girlRadio = document.getElementById('gender-girl');
    if (girlRadio) girlRadio.checked = true;
  }

  // Set minimum date for datetime-local to today
  const dateTimeInput = document.getElementById('eventDateTime');
  if (dateTimeInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateTimeInput.min = now.toISOString().slice(0, 16);
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeOrderForm() {
  const modal = document.getElementById('order-form-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function createProductCard(product, type) {
  const highlighted = product.badge || product.isCombo;
  const background = product.badge === 'BEST VALUE' ? 'bg-amber-50 border-2 border-amber-400' : highlighted ? 'bg-amber-50 border-2 border-amber-300' : 'bg-white border border-gray-100';
  const badge = product.badge ? `<div class="absolute top-0 right-0 bg-amber-500 text-white font-bold py-1 px-2 sm:px-3 rounded-bl-lg z-10 text-[10px] sm:text-xs shadow-sm">${escapeHtml(product.badge)}</div>` : '';
  const ratio = type === 'video' ? 'aspect-[9/16]' : 'aspect-[3/4]';
  const safeTitle = escapeHtml(product.title);
  const safeDescription = escapeHtml(product.description);
  const safeName = escapeHtml(product.whatsappName);
  const media = type === 'video'
    ? `<button type="button" class="video-preview relative w-full ${ratio} bg-gray-200 group overflow-hidden cursor-pointer" data-video-url="${escapeHtml(product.directVideoUrl)}" aria-label="Play ${safeTitle}">
         <img src="${escapeHtml(product.thumbnailImage)}" alt="Marathi Baby ${product.gender === 'boy' ? 'Boy' : 'Girl'} Naamkaran Video Invitation Design ${safeTitle}" class="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300">
         <span class="play-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-10 transition z-20"><span class="w-10 h-10 sm:w-14 sm:h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg text-white text-xl">&#9654;</span></span>
       </button>`
    : `<button type="button" class="image-preview relative w-full ${ratio} bg-gray-200 cursor-pointer group overflow-hidden" data-image-url="${escapeHtml(product.image)}" data-image-title="${safeTitle}" aria-label="Open ${safeTitle} preview">
         <img src="${escapeHtml(product.image)}" alt="Marathi Naming Ceremony Digital Invitation Card Design ${safeTitle}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
         <span class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"><span class="bg-black bg-opacity-60 text-white rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-all">View</span></span>
       </button>`;

  return `<article class="${background} rounded-2xl shadow-md overflow-hidden card-hover flex flex-col relative">
    ${badge}${media}
    <div class="p-3 sm:p-5 flex flex-col flex-grow">
      <h3 class="text-sm sm:text-lg font-bold text-gray-900 mb-1 leading-tight">${safeTitle}</h3>
      <p class="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 flex-grow line-clamp-2">${safeDescription}</p>
      <div class="mb-3 sm:mb-4"><span class="text-gray-400 line-through text-xs sm:text-sm mr-1">&#8377;${escapeHtml(product.oldPrice)}</span><span class="text-base sm:text-2xl font-bold text-green-600">&#8377;${escapeHtml(product.newPrice)}</span></div>
      <button type="button" class="order-button w-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold py-2 sm:py-3 px-2 sm:px-4 rounded-xl transition shadow-sm" data-item-name="${safeName}">Order on WhatsApp</button>
    </div>
  </article>`;
}

function renderItems() {
  const videoGrid = document.getElementById('video-grid');
  const cardGrid = document.getElementById('card-grid');
  const videos = getFilteredItems(VIDEOS_FOLDER);
  const cards = getFilteredItems(CARDS_FOLDER);
  videoGrid.innerHTML = videos.length ? videos.map((product) => createProductCard(product, 'video')).join('') : '<p class="col-span-full text-center py-10 text-gray-500">No videos found for this category.</p>';
  cardGrid.innerHTML = cards.length ? cards.map((product) => createProductCard(product, 'card')).join('') : '<p class="col-span-full text-center py-10 text-gray-500">No cards found for this category.</p>';
}

function updateControls() {
  document.getElementById('section-videos').classList.toggle('hidden', currentTab !== 'video');
  document.getElementById('section-cards').classList.toggle('hidden', currentTab !== 'card');
  ['video', 'card'].forEach((tab) => document.getElementById(`tab-${tab}`).className = `px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all ${tab === currentTab ? 'active-tab shadow' : 'inactive-tab'}`);
  ['all', 'boy', 'girl'].forEach((filter) => {
    const button = document.getElementById(`filter-${filter}`);
    button.className = filter === currentFilter ? 'px-4 py-1.5 rounded-full border-2 border-amber-400 bg-amber-50 font-semibold text-sm text-amber-800 transition shadow-sm' : `px-4 py-1.5 rounded-full border border-gray-300 bg-white ${filter === 'boy' ? 'hover:bg-blue-50' : filter === 'girl' ? 'hover:bg-pink-50' : 'hover:bg-gray-50'} font-medium text-sm text-gray-700 transition`;
  });
}

function openImageModal(url, title) {
  const modal = document.getElementById('image-modal');
  const image = document.getElementById('modal-image');
  image.src = url;
  image.alt = title;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  document.getElementById('image-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
  const tabButton = event.target.closest('[data-tab]');
  const filterButton = event.target.closest('[data-filter]');
  const orderButton = event.target.closest('.order-button');
  const videoButton = event.target.closest('.video-preview');
  const imageButton = event.target.closest('.image-preview');

  if (tabButton) { currentTab = tabButton.dataset.tab; updateControls(); renderItems(); }
  if (filterButton) { currentFilter = filterButton.dataset.filter; updateControls(); renderItems(); }
  if (orderButton) openOrderForm(orderButton.dataset.itemName);
  if (imageButton) openImageModal(imageButton.dataset.imageUrl, imageButton.dataset.imageTitle);

  if (videoButton) {
    document.querySelectorAll('video').forEach((video) => video.pause());
    const video = document.createElement('video');
    video.src = videoButton.dataset.videoUrl;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    video.className = 'absolute inset-0 w-full h-full object-cover z-30';
    videoButton.replaceWith(video);
  }

  if (event.target === document.getElementById('image-modal') || event.target.closest('#close-modal')) closeImageModal();
  if (event.target === document.getElementById('order-form-modal') || event.target.closest('#close-order-modal')) closeOrderForm();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeImageModal();
    closeOrderForm();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('naming-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const selectedDesign = document.getElementById('selectedDesign').value || 'Namkaran Invitation';
      const motherName = "सौ. " + document.getElementById('motherName').value.trim();
      const fatherName = "श्री " + document.getElementById('fatherName').value.trim();
      const genderEl = document.querySelector('input[name="babyGender"]:checked');
      const gender = genderEl ? genderEl.value : 'N/A';
      const rawDateTime = document.getElementById('eventDateTime').value;
      const venue = document.getElementById('venue').value.trim();
      const inviter = document.getElementById('inviter').value.trim();

      let formattedDateTime = rawDateTime;
      if (rawDateTime) {
        const eventDateObj = new Date(rawDateTime);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        formattedDateTime = eventDateObj.toLocaleString('en-US', options);
      }

      const rawMessage = `*New Naming Ceremony Details*\n\n` +
                         `*Selected Design:* ${selectedDesign}\n` +
                         `*Mother's Name:* ${motherName}\n` +
                         `*Father's Name:* ${fatherName}\n` +
                         `*Baby Gender:* ${gender}\n` +
                         `*Date & Time:* ${formattedDateTime}\n` +
                         `*Venue:* ${venue}\n` +
                         `*Inviter:* ${inviter}`;

      const encodedMessage = encodeURIComponent(rawMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank', 'noopener');
      closeOrderForm();
    });
  }
});

updateControls();
renderItems();
