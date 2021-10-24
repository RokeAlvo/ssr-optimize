<template>
  <CardList3/>
</template>

<script>
const CardList3 = () =>
  import(/* webpackChunkName: "CardList3" */ '~/components/CardList/CardList3.vue')

export default {
  name: "LazyCardList3",
  components: {CardList3},
}
</script>
