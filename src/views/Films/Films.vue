<template>
  <div style="padding-bottom:49px;">
    <film-nav></film-nav>
    <router-view></router-view>
  </div>
</template>
<script>
import FilmNav from "@/views/Films/FilmNav.vue"
export default{
  components: {
    FilmNav,
  }
}
</script>