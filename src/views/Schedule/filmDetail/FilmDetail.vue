<template>
  <CinemaInfo :session="sessions[currentSession]">
    <template #default>{{ schedule.film.name }}</template>
    <template #SwitchList="{ isDown }">
      <SwitchList :isDown="isDown" :sessions="sessions" :currentSession="currentSession">
      </SwitchList>
    </template>
    <template #Chosen>
      <Chosen>
        {{ price }}
      </Chosen>
    </template>
  </CinemaInfo>
</template>
<script>
import SwitchList from './component/switchList.vue'
import Chosen from './component/chosen.vue'
import CinemaInfo from './component/cinemaInfo.vue'
export default {
  props: ['schedule', 'sessions', 'currentSession'],
  computed: {
    price() {
      return this.sessions[this.currentSession].salePrice / 100
    }
  },
  components: {
    SwitchList,
    Chosen,
    CinemaInfo
  }
}
</script>
<style lang="scss" scoped>
// ::-webkit-scrollbar {
//   display: none;
// }
</style>
