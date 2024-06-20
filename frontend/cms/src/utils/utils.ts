export const capitalizeFormater = (s: string) => {
<<<<<<< HEAD
  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};


=======
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

>>>>>>> c502f9a0aaf150257e3d73230c63d44c487c9b0d
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
});