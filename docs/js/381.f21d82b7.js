"use strict";(self["webpackChunkmaizuo"]=self["webpackChunkmaizuo"]||[]).push([[381],{5772:function(t,e,i){i(2760),i(4800),i(8603)},8006:function(t,e,i){i.d(e,{Bn:function(){return s},TL:function(){return r},kw:function(){return o},n_:function(){return a},pT:function(){return h}});var n="van-hairline",s=n+"--top",r=n+"--left",a=n+"--bottom",o=n+"--surround",h=n+"--top-bottom"},4381:function(t,e,i){i.r(e),i.d(e,{default:function(){return v}});i(3297);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("van-nav-bar",{attrs:{title:"影院"},on:{"click-left":()=>{const e="/city";this.$route.path!==e&&t.$router.push(e)},"click-right":()=>{const e="/cinemas/search";this.$route.path!==e&&t.$router.push(e)}},scopedSlots:t._u([{key:"left",fn:function(){return[t._v(" "+t._s(t.$store.state.cityName)+" "),e("van-icon",{attrs:{name:"arrow-down",color:"black"}})]},proxy:!0},{key:"right",fn:function(){return[e("van-icon",{attrs:{name:"search",size:"22",color:"black"}})]},proxy:!0}])}),e("transition",{attrs:{name:"h",appear:"",mode:"out-in"}},[e("router-view",{attrs:{height:t.getCinemaListHeight()}})],1)],1)},s=[],r=(i(5772),i(8394)),a=(i(2760),i(4800),i(8603),i(6483)),o=i(8006),h=(0,a.Y)("nav-bar"),l=h[0],c=h[1],u=l({props:{title:String,fixed:Boolean,zIndex:[Number,String],leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean,border:{type:Boolean,default:!0}},data:function(){return{height:null}},mounted:function(){var t=this;if(this.placeholder&&this.fixed){var e=function(){t.height=t.$refs.navBar.getBoundingClientRect().height};e(),setTimeout(e,100)}},methods:{genLeft:function(){var t=this.$createElement,e=this.slots("left");return e||[this.leftArrow&&t(r.A,{class:c("arrow"),attrs:{name:"arrow-left"}}),this.leftText&&t("span",{class:c("text")},[this.leftText])]},genRight:function(){var t=this.$createElement,e=this.slots("right");return e||(this.rightText?t("span",{class:c("text")},[this.rightText]):void 0)},genNavBar:function(){var t,e=this.$createElement;return e("div",{ref:"navBar",style:{zIndex:this.zIndex},class:[c({fixed:this.fixed,"safe-area-inset-top":this.safeAreaInsetTop}),(t={},t[o.n_]=this.border,t)]},[e("div",{class:c("content")},[this.hasLeft()&&e("div",{class:c("left"),on:{click:this.onClickLeft}},[this.genLeft()]),e("div",{class:[c("title"),"van-ellipsis"]},[this.slots("title")||this.title]),this.hasRight()&&e("div",{class:c("right"),on:{click:this.onClickRight}},[this.genRight()])])])},hasLeft:function(){return this.leftArrow||this.leftText||this.slots("left")},hasRight:function(){return this.rightText||this.slots("right")},onClickLeft:function(t){this.$emit("click-left",t)},onClickRight:function(t){this.$emit("click-right",t)}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:c("placeholder"),style:{height:this.height+"px"}},[this.genNavBar()]):this.genNavBar()}}),f={name:"cinemas",components:{[u.name]:u,[r.A.name]:r.A},data(){return{height:window.outerHeight}},methods:{getCinemaListHeight(){let t=this.height>window.outerHeight?this.height:window.outerHeight;return t-46-49+"px"}},activated(){0===this.$store.state.cinemasData.length&&this.$store.dispatch("getCinemasData",this.$store.state.cityId)}},g=f,d=i(4068),p=(0,d.A)(g,n,s,!1,null,"711d9ac8",null),v=p.exports}}]);