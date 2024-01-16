<template>
    <div>
        <button @click="myclick">退出登录</button>
    </div>
</template>
<script>

export default({
    methods:{
        myclick(){
            localStorage.removeItem("token")
            console.log(this.$route);
            // this.$router.push('/center') 
            this.$router.push('/login')
        }
    }
})
</script>
