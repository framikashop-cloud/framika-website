/*
 * Product catalogue & Lookup helper.
 * Products can be customized directly in the root file: `config.js`
 */

const VIDEOS_FOLDER = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.videos) ? SITE_CONFIG.videos : [];
const CARDS_FOLDER = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.cards) ? SITE_CONFIG.cards : [];

function findProductByTitle(title) {
  return VIDEOS_FOLDER.find(item => item.title === title || item.whatsappName === title) ||
         CARDS_FOLDER.find(item => item.title === title || item.whatsappName === title);
}
