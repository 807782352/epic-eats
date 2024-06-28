export const capitalizeFormater = (s: string) => {
  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};


export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
});