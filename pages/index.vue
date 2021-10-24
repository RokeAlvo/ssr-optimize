<template>
  <div>
    <div v-for="i in 10" :key="i">
      <img src="/Pdb/10025791b.jpg">
      <CardList :products-group="1" title="Группа 1"/>
      <CardList :products-group="2" title="Группа 2"/>
    </div>
  </div>
</template>

<script>
import CardList from "~/components/CardList/CardList";

export default {
  name: 'HomePage',
  components: {CardList},
}
</script>
