<template>
  <CardList3 :products-group="productsGroup"/>
</template>

<script>
const CardList3 = () =>
  import(/* webpackChunkName: "CardList3" */ '~/components/CardList/CardList3.vue')

export default {
  name: "LazyCardList3",
  components: {CardList3},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
