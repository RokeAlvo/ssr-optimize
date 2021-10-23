<template>
<div class="default-layout relative">
  <div class="absolute bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
      <a title="Follow me on twitter" href="https://www.twitter.com/asad_codes" target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
        <img class="object-cover object-center w-full h-full rounded-full" src="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg"/>
      </a>
    </div>
  </div>
  <TheHeader/>
  <div class="body container">
    <Nuxt />
  </div>
</div>
</template>

<script>
import TheHeader from "~/components/TheHeader/TheHeader";
export default {
  name: "DefaultLayout",
  components: {TheHeader}
}
</script>
