<template>
  <CardList2 :products-group="productsGroup"/>
</template>

<script>
const CardList2 = () =>
  import(/* webpackChunkName: "CardList2" */ '~/components/CardList/CardList2.vue')

export default {
  name: "LazyCardList2",
  components: {CardList2},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
