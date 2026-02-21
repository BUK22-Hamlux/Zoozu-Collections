export const getCategoryCounts = (products) => {
  return products.reduce((acc, product) => {
    const category = product.category;

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});
};
