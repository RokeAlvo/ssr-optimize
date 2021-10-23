<template>
  <div>
    <CardList :products="products"/>
  </div>
</template>

<script>
import CardList from "~/components/CardList/CardList";

export default {
  name: 'HomePage',
  components: {CardList},
  async asyncData({$axios}) {
    let products = []
    try {
      const response = await $axios.$get('/api/products.json')
      products = response.body.products
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    return {
      products
    }
  }
}
</script>
