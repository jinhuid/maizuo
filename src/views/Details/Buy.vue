<template>
    <div>
        
        <div class="goSchedule" @click="buyTicket(dataList.filmId, dataList.name)"> 选座购票 </div>
    </div>
</template>
<script>
export default {
    props: ['dataList'],
    methods: {
        buyTicket(id, filmName) {
            this.$store.commit('setFilmInfo', {id,filmName})
            this.$router.push({
                // name: "详情", //跳往组件的名字
                name: '电影视图',
                params: {
                    // path: `/detail/${id}/cinemas`,
                    filmName,
                    myID: id,
                },
            });
        }
    }
}
</script>
<style scoped>


.goSchedule {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
    z-index: 1;
}
</style>