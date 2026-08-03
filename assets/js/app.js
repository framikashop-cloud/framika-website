/* Page behaviour & Cart Management with Combo Pricing Logic. Product details live in products.js. */
const WHATSAPP_NUMBER = '919431817472';
let currentTab = 'video';
let currentFilter = 'all';

// Persistent Cart State
let cart = JSON.parse(localStorage.getItem('framika_cart') || '[]');

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

function saveCart() {
  localStorage.setItem('framika_cart', JSON.stringify(cart));
  updateCartUI();
}

function calculateCartTotals() {
  let numVideos = 0;
  let numCards = 0;
  let subtotal = 0;

  cart.forEach(item => {
    const qty = item.quantity || 1;
    const price = Number(item.newPrice) || 0;
    subtotal += price * qty;
    if (item.type === 'video') {
      numVideos += qty;
    } else if (item.type === 'card') {
      numCards += qty;
    }
  });

  // Combo Offer Pricing Logic:
  // Video standard price: ₹299, Card standard price: ₹149 (Total = ₹448).
  // Combo pair (1 Video + 1 Card) = ₹299 total!
  // Combo discount per pair = ₹448 - ₹299 = ₹149 off.
  const numCombos = Math.min(numVideos, numCards);
  const discountPerCombo = 149;
  const comboDiscount = numCombos * discountPerCombo;
  const finalTotal = Math.max(0, subtotal - comboDiscount);
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return {
    numVideos,
    numCards,
    numCombos,
    subtotal,
    comboDiscount,
    finalTotal,
    totalCount
  };
}

function addToCart(title) {
  const product = findProductByTitle(title);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.title === product.title);
  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({
      title: product.title,
      whatsappName: product.whatsappName || product.title,
      newPrice: product.newPrice,
      oldPrice: product.oldPrice,
      type: product.type || (product.directVideoUrl ? 'video' : 'card'),
      image: product.thumbnailImage || product.image,
      gender: product.gender,
      quantity: 1
    });
  }

  saveCart();
  showToast(`Added <strong>${escapeHtml(product.title)}</strong> to cart! 🛒`);

  // Animate cart badge count
  const badges = [document.getElementById('cart-count-badge'), document.getElementById('floating-cart-count')];
  badges.forEach(b => {
    if (b) {
      b.classList.remove('badge-bounce');
      void b.offsetWidth; // trigger reflow
      b.classList.add('badge-bounce');
    }
  });
}

function updateQuantity(title, delta) {
  const index = cart.findIndex(item => item.title === title);
  if (index > -1) {
    cart[index].quantity = (cart[index].quantity || 1) + delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeFromCart(title) {
  cart = cart.filter(item => item.title !== title);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'bg-gray-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-2xl toast-animate mb-2 flex items-center gap-2 border border-gray-700';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function updateCartUI() {
  const totals = calculateCartTotals();
  
  // Badges
  const countBadge = document.getElementById('cart-count-badge');
  const floatingCount = document.getElementById('floating-cart-count');
  if (countBadge) countBadge.textContent = totals.totalCount;
  if (floatingCount) floatingCount.textContent = totals.totalCount;

  // Cart Modal Elements
  const itemsContainer = document.getElementById('cart-items-container');
  const comboBanner = document.getElementById('combo-banner-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('cart-discount-row');
  const discountAmountEl = document.getElementById('cart-discount-amount');
  const finalTotalEl = document.getElementById('cart-final-total');

  if (subtotalEl) subtotalEl.innerHTML = `&#8377;${totals.subtotal}`;
  if (finalTotalEl) finalTotalEl.innerHTML = `&#8377;${totals.finalTotal}`;

  if (discountRow && discountAmountEl) {
    if (totals.comboDiscount > 0) {
      discountRow.classList.remove('hidden');
      discountAmountEl.innerHTML = `-&#8377;${totals.comboDiscount}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  // Render Combo Banner
  if (comboBanner) {
    if (totals.numCombos > 0) {
      comboBanner.innerHTML = `
        <div class="flex items-center gap-2 text-green-800 text-xs sm:text-sm font-semibold">
          <span class="text-xl">🎉</span>
          <div>
            <span>Combo Offer Applied! (${totals.numCombos} Combo Pair${totals.numCombos > 1 ? 's' : ''})</span>
            <p class="text-[11px] text-green-700 font-normal">Card + Video bundle price applied at <strong>₹299</strong> (Saved ₹${totals.comboDiscount})!</p>
          </div>
        </div>`;
    } else if (totals.numVideos > 0 && totals.numCards === 0) {
      comboBanner.innerHTML = `
        <div class="flex items-center gap-2 text-amber-900 text-xs sm:text-sm font-medium">
          <span class="text-xl">💡</span>
          <div>
            <span class="font-bold">Add any Digital Card to get the Combo Offer!</span>
            <p class="text-[11px] text-amber-800">Get 1 Video + 1 Card together for just <span class="font-bold underline">₹299</span> total!</p>
          </div>
        </div>`;
    } else if (totals.numCards > 0 && totals.numVideos === 0) {
      comboBanner.innerHTML = `
        <div class="flex items-center gap-2 text-amber-900 text-xs sm:text-sm font-medium">
          <span class="text-xl">💡</span>
          <div>
            <span class="font-bold">Add any Video Invitation to get the Combo Offer!</span>
            <p class="text-[11px] text-amber-800">Get 1 Card + 1 Video together for just <span class="font-bold underline">₹299</span> total!</p>
          </div>
        </div>`;
    } else {
      comboBanner.innerHTML = `
        <div class="text-center text-xs text-amber-900 font-medium">
          🎁 <span class="font-bold">Special Combo Offer:</span> Add 1 Card + 1 Video for just <span class="font-bold underline">₹299</span>!
        </div>`;
    }
  }

  // Render Items List
  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
          <i class="fa-solid fa-basket-shopping text-5xl mb-3 text-gray-300"></i>
          <p class="text-sm font-semibold text-gray-600">Your cart is currently empty</p>
          <p class="text-xs text-gray-400 mt-1 max-w-xs">Browse our video invitations and digital cards to build your combo!</p>
        </div>`;
    } else {
      itemsContainer.innerHTML = cart.map((item) => {
        const itemTotal = Number(item.newPrice) * item.quantity;
        const isVideo = item.type === 'video';
        return `
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm relative group">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="w-16 h-20 object-cover rounded-xl border border-gray-200 flex-shrink-0">
            
            <div class="flex-grow min-w-0">
              <div class="flex items-center gap-1.5 mb-1">
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${isVideo ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                  ${isVideo ? '📹 Video' : '🎨 Card'}
                </span>
              </div>
              <h4 class="font-bold text-gray-900 text-xs sm:text-sm truncate">${escapeHtml(item.title)}</h4>
              <p class="text-xs font-semibold text-green-600 mt-0.5">&#8377;${item.newPrice} <span class="text-[10px] text-gray-400 font-normal">each</span></p>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2 mt-2">
                <div class="inline-flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-xs">
                  <button type="button" class="cart-qty-btn px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold text-xs" data-action="decrease" data-title="${escapeHtml(item.title)}">-</button>
                  <span class="px-2 py-0.5 text-xs font-bold text-gray-800">${item.quantity}</span>
                  <button type="button" class="cart-qty-btn px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold text-xs" data-action="increase" data-title="${escapeHtml(item.title)}">+</button>
                </div>
                <button type="button" class="cart-remove-btn text-xs text-red-400 hover:text-red-600 ml-auto p-1" data-title="${escapeHtml(item.title)}" aria-label="Remove item">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>`;
      }).join('');
    }
  }
}

function openCartModal() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    updateCartUI();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartModal() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function getFilteredItems(items) {
  return items.filter((item) => currentFilter === 'all' || item.gender === currentFilter || item.gender === 'both');
}

function openOrderForm(itemName) {
  const modal = document.getElementById('order-form-modal');
  const titleSpan = document.getElementById('modal-design-title');
  const designInput = document.getElementById('selectedDesign');
  
  const displayTitle = itemName || 'Custom Order';
  if (titleSpan) titleSpan.textContent = displayTitle;
  if (designInput) designInput.value = displayTitle;

  // Auto-select gender if title indicates gender
  if (displayTitle.includes('NM-MR-B') || displayTitle.toLowerCase().includes('boy')) {
    const boyRadio = document.getElementById('gender-boy');
    if (boyRadio) boyRadio.checked = true;
  } else if (displayTitle.includes('NM-MR-G') || displayTitle.toLowerCase().includes('girl')) {
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
  const badge = product.badge ? `<div class="absolute top-0 right-0 bg-amber-500 text-white font-bold py-1 px-2 sm:px-3 rounded-bl-lg z-30 text-[10px] sm:text-xs shadow-md uppercase tracking-wider">${escapeHtml(product.badge)}</div>` : '';
  const ratio = type === 'video' ? 'aspect-[9/16]' : 'aspect-[3/4]';
  const safeTitle = escapeHtml(product.title);
  const safeDescription = escapeHtml(product.description);
  const safeName = escapeHtml(product.whatsappName);
  const oldP = Number(product.oldPrice);
  const newP = Number(product.newPrice);
  const discountPercent = (oldP && newP && oldP > newP) ? Math.round(((oldP - newP) / oldP) * 100) : 0;
  const discountBadge = discountPercent > 0 ? `<span class="ml-1.5 sm:ml-2 bg-red-500 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">${discountPercent}% OFF</span>` : '';

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
      <div class="mb-3 sm:mb-4 flex items-center flex-wrap gap-1"><span class="text-gray-400 line-through text-xs sm:text-sm mr-1">&#8377;${escapeHtml(product.oldPrice)}</span><span class="text-base sm:text-2xl font-bold text-green-600">&#8377;${escapeHtml(product.newPrice)}</span>${discountBadge}</div>
      
      <!-- Dual Buttons: Add to Cart & Direct WhatsApp Order -->
      <div class="flex flex-col sm:flex-row gap-2 mt-auto">
        <button type="button" class="add-cart-button flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 sm:py-2.5 px-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer" data-item-name="${safeTitle}">
          <i class="fa-solid fa-cart-plus"></i>
          <span>Add to Cart</span>
        </button>
        <button type="button" class="order-button flex-1 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold py-2 sm:py-2.5 px-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer" data-item-name="${safeName}">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Order Now</span>
        </button>
      </div>
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
  const addCartButton = event.target.closest('.add-cart-button');
  const videoButton = event.target.closest('.video-preview');
  const imageButton = event.target.closest('.image-preview');

  const openCartBtn = event.target.closest('#open-cart-btn');
  const floatingCartBtn = event.target.closest('#floating-cart-btn');
  const closeCartBtn = event.target.closest('#close-cart-modal');

  const qtyBtn = event.target.closest('.cart-qty-btn');
  const removeBtn = event.target.closest('.cart-remove-btn');
  const clearBtn = event.target.closest('#clear-cart-btn');
  const checkoutBtn = event.target.closest('#cart-checkout-btn');

  if (tabButton) { currentTab = tabButton.dataset.tab; updateControls(); renderItems(); }
  if (filterButton) { currentFilter = filterButton.dataset.filter; updateControls(); renderItems(); }

  if (addCartButton) {
    addToCart(addCartButton.dataset.itemName);
  }

  if (orderButton) {
    openOrderForm(orderButton.dataset.itemName);
  }

  if (openCartBtn || floatingCartBtn) {
    openCartModal();
  }

  if (closeCartBtn || event.target === document.getElementById('cart-modal')) {
    closeCartModal();
  }

  if (qtyBtn) {
    const title = qtyBtn.dataset.title;
    const action = qtyBtn.dataset.action;
    updateQuantity(title, action === 'increase' ? 1 : -1);
  }

  if (removeBtn) {
    removeFromCart(removeBtn.dataset.title);
  }

  if (clearBtn) {
    clearCart();
  }

  if (checkoutBtn) {
    if (cart.length === 0) {
      showToast('Your cart is empty! Add products first.');
      return;
    }
    const totals = calculateCartTotals();
    const cartTitleSummary = `Cart Order (${totals.totalCount} item${totals.totalCount > 1 ? 's' : ''})`;
    closeCartModal();
    openOrderForm(cartTitleSummary);
  }

  if (imageButton) openImageModal(imageButton.dataset.imageUrl, imageButton.dataset.imageTitle);

  if (videoButton) {
    document.querySelectorAll('video').forEach((video) => video.pause());
    const video = document.createElement('video');
    video.src = videoButton.dataset.videoUrl;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    video.className = 'absolute inset-0 w-full h-full object-cover z-40';
    videoButton.replaceWith(video);
  }

  if (event.target === document.getElementById('image-modal') || event.target.closest('#close-modal')) closeImageModal();
  if (event.target === document.getElementById('order-form-modal') || event.target.closest('#close-order-modal')) closeOrderForm();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeImageModal();
    closeOrderForm();
    closeCartModal();
  }
});

function initNamingForm() {
  const form = document.getElementById('naming-form');
  if (form && !form.dataset.initialized) {
    form.dataset.initialized = 'true';
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

      let orderMessage = '';

      if (selectedDesign.startsWith('Cart Order') && cart.length > 0) {
        const totals = calculateCartTotals();
        const itemsList = cart.map(item => `  • ${item.title} (${item.type === 'video' ? 'Video' : 'Card'}) x${item.quantity} = ₹${Number(item.newPrice) * item.quantity}`).join('\n');
        
        let discountInfo = totals.comboDiscount > 0 ? `\n*Combo Offer Savings:* -₹${totals.comboDiscount} (Card + Video Combo Deal applied!)` : '';

        orderMessage = `*New Naming Ceremony Cart Order*\n\n` +
                       `*Selected Items:*\n${itemsList}\n\n` +
                       `*Subtotal:* ₹${totals.subtotal}` +
                       `${discountInfo}\n` +
                       `*Total Amount:* ₹${totals.finalTotal}\n\n` +
                       `*--- Ceremony Details ---*\n` +
                       `*Mother's Name:* ${motherName}\n` +
                       `*Father's Name:* ${fatherName}\n` +
                       `*Baby Gender:* ${gender}\n` +
                       `*Date & Time:* ${formattedDateTime}\n` +
                       `*Venue:* ${venue}\n` +
                       `*Inviter:* ${inviter}`;
      } else {
        orderMessage = `*New Naming Ceremony Order*\n\n` +
                       `*Selected Design:* ${selectedDesign}\n` +
                       `*Mother's Name:* ${motherName}\n` +
                       `*Father's Name:* ${fatherName}\n` +
                       `*Baby Gender:* ${gender}\n` +
                       `*Date & Time:* ${formattedDateTime}\n` +
                       `*Venue:* ${venue}\n` +
                       `*Inviter:* ${inviter}`;
      }

      const encodedMessage = encodeURIComponent(orderMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank', 'noopener');
      
      if (selectedDesign.startsWith('Cart Order')) {
        clearCart();
      }

      closeOrderForm();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initNamingForm();
    updateControls();
    renderItems();
    updateCartUI();
  });
} else {
  initNamingForm();
  updateControls();
  renderItems();
  updateCartUI();
}
