<template>
  <div>
    <img src="/Pdb/10025791b.jpg.webp" alt="main-image" class="w-full main-image">
    <LazyHydrate when-visible>
      <LazyCardList1 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList2 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList3 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList4 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList5 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList6 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList7 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList8 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList9 :products-group="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LazyCardList10 :products-group="2" />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import LazyCardList10 from "@/components/CardList/LazyCardList10";
import LazyCardList9 from "@/components/CardList/LazyCardList9";
import LazyCardList8 from "@/components/CardList/LazyCardList8";
import LazyCardList7 from "@/components/CardList/LazyCardList7";
import LazyCardList6 from "@/components/CardList/LazyCardList6";
import LazyCardList5 from "@/components/CardList/LazyCardList5";
import LazyCardList4 from "@/components/CardList/LazyCardList4";
import LazyCardList3 from "@/components/CardList/LazyCardList3";
import LazyCardList2 from "@/components/CardList/LazyCardList2";
import LazyCardList1 from "@/components/CardList/LazyCardList1";


export default {
  name: 'HomePage',
  components: {
    LazyCardList1,
    LazyCardList2,
    LazyCardList3,
    LazyCardList4,
    LazyCardList5,
    LazyCardList6,
    LazyCardList7,
    LazyCardList8,
    LazyCardList10,
    LazyCardList9,
    LazyHydrate,
  },
}
</script>
<style>
  .main-image {
    width: 375px;
    height: 375px;
  }
</style>
