<template>
  <CardList10 :products-group="productsGroup"/>
</template>

<script>
const CardList10 = () =>
  import(/* webpackChunkName: "CardList10" */ '~/components/CardList/CardList10.vue')

export default {
  name: "LazyCardList10",
  components: {CardList10},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
