<template>
  <!-- component -->
  <div class="w-full bg-gray-800">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div class="text-center pb-12">
        <h2 class="text-base font-bold text-indigo-600">
          We have the best equipment in the market
        </h2>
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
          Check our awesome team memwhite
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CatCard
          v-for="product in products"
          :key="product.productId"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CatCard from "~/components/CatCard/CatCard";
export default {
  name: "CardList",
  components: {CatCard},
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
