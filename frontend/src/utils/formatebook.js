/**
 * Formats a Date object or date string into a standard format: DD MMM YYYY (e.g. 10 JUN 2026).
 * @param {string|Date} dateStr - The date to format
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = d.getDate();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Formats a shipping address object into a single line string.
 * @param {object} shippingInfo - Shipping address object
 * @returns {string}
 */
export const formatAddress = (shippingInfo) => {
  if (!shippingInfo) return '';
  const { address, city, state, postalCode, country } = shippingInfo;
  return `${address}, ${city}, ${state} - ${postalCode}, ${country}`;
};

/**
 * Generates a uppercase display tag for a product (e.g. "NEW IN / SHIRTS").
 * @param {object} product - Product object
 * @returns {string}
 */
export const getProductTag = (product) => {
  if (!product) return '';
  const statusPart = (product.status || 'New In').toUpperCase();
  const categoryPart = (product.category || '').toUpperCase();
  return `${statusPart} / ${categoryPart}`;
};
