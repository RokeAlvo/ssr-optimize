export function mapApiProductsToProducts(productList) {
  return productList.map(product => ({
    name: product.name,
    category: product.category.name,
    image: product.image
  }))
}
