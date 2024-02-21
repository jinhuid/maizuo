import Vue from 'vue';
export default {
    inserted(el, binding) {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                Vue.set(binding.value, "show", true);
                observer.unobserve(el)
            }
        },{
            // 当目标元素与视口重叠至以下比例时 执行回调函数
            threshold:[0]
        })
        observer.observe(el)
    }
}