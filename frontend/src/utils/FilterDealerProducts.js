function filterDealerProducts (initialProducts, searchQuery) {
  if (!initialProducts) {
    return [];
  } else {
    return initialProducts.filter((product) => product.product_name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
}

export { filterDealerProducts };
