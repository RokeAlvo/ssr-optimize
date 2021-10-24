<template>
  <CardList6/>
</template>

<script>
const CardList6 = () =>
  import(/* webpackChunkName: "CardList6" */ '~/components/CardList/CardList6.vue')

export default {
  name: "LazyCardList6",
  components: {CardList6},
}
</script>
