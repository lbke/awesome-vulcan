import values from "lodash/values";
const menuItems = {};

export const registerMenuItem = (itemId, config) => {
  menuItems[itemId] = { id: itemId, ...config };
};
export const removeMenuItem = itemId => {
  delete menuItems[itemId];
};

export const getMenuItemsConfig = () => menuItems;
export const getMenuItems = () => values(menuItems);
