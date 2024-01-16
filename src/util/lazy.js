import Vue from 'vue';
export default {
    inserted(el, binding) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio > 0) {
                Vue.set(binding.value, "show", true);
                observer.unobserve(el)
            }
        })
        observer.observe(el)
    }
}