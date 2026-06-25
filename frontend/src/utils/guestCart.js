const KEY = 'guestCartItems';
const notify = () => window.dispatchEvent(new Event('guestCart'));

export const getItems = () => JSON.parse(sessionStorage.getItem(KEY) || '[]');

export const addItem = (item) => {
  const items = getItems();
  const idx = items.findIndex(i => i.product._id === item.product._id && i.size === item.size && i.color.name === item.color.name);
  idx >= 0 ? items[idx].quantity++ : items.push(item);
  sessionStorage.setItem(KEY, JSON.stringify(items));
  notify();
};

export const removeItem = (pid, size, colorName) => {
  sessionStorage.setItem(KEY, JSON.stringify(getItems().filter(i => !(i.product._id === pid && i.size === size && i.color.name === colorName))));
  notify();
};

export const updateItem = (pid, size, colorName, qty) => {
  sessionStorage.setItem(KEY, JSON.stringify(getItems().map(i => i.product._id === pid && i.size === size && i.color.name === colorName ? { ...i, quantity: qty } : i)));
  notify();
};

export const clearItems = () => { sessionStorage.removeItem(KEY); notify(); };

export const subscribe = (cb) => { window.addEventListener('guestCart', cb); return () => window.removeEventListener('guestCart', cb); };
export const getCount = () => getItems().reduce((t, i) => t + i.quantity, 0);
