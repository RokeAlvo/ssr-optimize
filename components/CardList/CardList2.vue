<template>
  <!-- component -->
  <div class="w-full bg-gray-800">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div class="text-center pb-12">
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
          CardList2
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CatCard2
          v-for="product in products"
          :key="product.productId"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CatCard2 from "~/components/CatCard/CatCard2";
import {mapApiProductsToProducts} from "@/components/utils/mapProducts";

export default {
  name: "CardList2",
  components: {CatCard2},
  data() {
    return {
      products: [],
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get(`/api-mocks/products1.json`)
      this.products = mapApiProductsToProducts(response.body.products)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('CardList.fetch', e)
    }
  }
}
</script>
