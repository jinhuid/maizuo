<template>
  <div>
    <Films-heater></Films-heater>
    <router-view></router-view>
    <Section-tag></Section-tag>
  </div>
</template>
<script>
import FilmsHeater from "@/components/FilmsHeater"
import SectionTag from '@/components/SectionTag'
export default{
  components: {
    FilmsHeater,
    SectionTag
  },
  data(){
    return {
      dataList:null
    }
  },
}
</script>
<style  scoped>
img{
  text-align: center;
  height: 100%;
  width: 100vmin;
}
</style>