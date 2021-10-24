<template>
  <CardList5/>
</template>

<script>
const CardList5 = () =>
  import(/* webpackChunkName: "CardList5" */ '~/components/CardList/CardList5.vue')

export default {
  name: "LazyCardList5",
  components: {CardList5},
}
</script>
