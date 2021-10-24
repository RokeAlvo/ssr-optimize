<template>
  <CardList7/>
</template>

<script>
const CardList7 = () =>
  import(/* webpackChunkName: "CardList7" */ '~/components/CardList/CardList7.vue')

export default {
  name: "LazyCardList7",
  components: {CardList7},
}
</script>
