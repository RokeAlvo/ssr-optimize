<template>
  <CardList2/>
</template>

<script>
const CardList2 = () =>
  import(/* webpackChunkName: "CardList2" */ '~/components/CardList/CardList2.vue')

export default {
  name: "LazyCardList2",
  components: {CardList2},
}
</script>
