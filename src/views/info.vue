<template>
    <div class="main">
        Hello World.....
    </div>
</template>
<script>
export default {
    methods: {
        handle() {
            console.log(5555);
            if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
        }
    }
}
</script>
<style scoped>
.main {
    height: 100%;
    width: 100%;

}
</style>