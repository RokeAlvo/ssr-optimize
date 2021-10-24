<template>
  <CardList5 :products-group="productsGroup"/>
</template>

<script>
const CardList5 = () =>
  import(/* webpackChunkName: "CardList5" */ '~/components/CardList/CardList5.vue')

export default {
  name: "LazyCardList5",
  components: {CardList5},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
