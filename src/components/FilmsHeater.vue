<template>
<div class="sticky">
    <ul ref="routerUl">
        <router-link :to="'/films/nowPlaying'" custom v-slot="{navigate,isActive}" >
                    <li @click="navigate" :class="isActive?'linkColor':''">
                        <span>正在上映</span>
                    </li>
        </router-link>
        <router-link :to="'/films/comingSoon'" custom v-slot="{navigate,isActive}" >
                    <li @click="navigate" :class="isActive?'linkColor':''">
                        <span>即将上映</span>
                    </li>
        </router-link>
        <div class="ink"><span></span></div>
    </ul>
    </div>
</template>
<script>
export default {
    mounted(){
        if(this.$refs.routerUl.children[1].className.includes('linkColor'))
            this.$refs.routerUl.lastChild.lastChild.classList.toggle('toggle');
        this.$refs.routerUl.addEventListener('click',()=>{
            this.$refs.routerUl.lastChild.lastChild.classList.toggle('toggle');
        })
    }
}
</script>
<style lang="scss" scoped>
.sticky{
    position: sticky;
    top: 0;
}
ul{
    font: 14px;
    position: relative;
    height: 49px; 
    background-color: #fff; 
    li{
        line-height:47px;
        text-align: center;
        float: left;
        width: 50%;
        font-size: 14px;
    }
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #ededed;
      color: #ededed;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
}
.ink{
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    padding: 0 calc(25% - 28px);
    box-sizing: border-box;

}
.ink span{
    width: 56px;
    height: 2px;
    display: block;
    background: var(--textColor);
    transition: .3s all;
}
.toggle{
    margin-left: calc(100% - 56px);
}
.linkColor{
    color: var(--textColor);
}
</style>