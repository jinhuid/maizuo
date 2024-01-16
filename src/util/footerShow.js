
const obj = {
    created(){
        
        this.$store.commit('footerHide')
    },
    beforeDestroy(){
        this.$store.commit('footerShow')
    }
}
export default obj