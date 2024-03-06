export const createEmployeeID = (
  firstName: string,
  lastName: string,
): string => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000;
  return `${firstName}-${lastName}-${randomNumber}`;
};

export const createEmployeeEmail = (
  firstName: string,
  lastName: string,
): string => {
  return `${firstName}-${lastName}@lrsolutions.com`;
};

export const incrementCartItemQuantity = (cartItem: any) => {
  const newQuantity = cartItem.quantity + 1;
  return newQuantity;
};

export const decrementCartItemQuantity = (cartItem: any) => {
  const newQuantity = cartItem.quantity - 1;
  return newQuantity;
};
