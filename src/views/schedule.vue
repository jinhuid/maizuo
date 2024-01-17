<template>
  <div v-if="schedule" class="main">
    <header ref="header">
      <span
        ><van-icon name="arrow-left" size="24" @click="$router.back()"
      /></span>
      {{ schedule.cinema.name }}
    </header>

    <section ref="section">
      <Notice :noticeMsg="schedule.noticeMsg" />
      <SeatingChart ref="map" :maxSeat="maxSeat">
        <span v-if="sessions">{{ sessions[currentSession].hallName }}</span>
      </SeatingChart>
    </section>

    <footer v-if="sessions" ref="footer">
      <TagExplain v-show="!$store.state.chosen.length" class="tag" />
      <FilmDetail
        :schedule="schedule"
        :sessions="sessions"
        :currentSession="currentSession" />
        
      <Submit :getTotal="getTotal" :session="sessions[currentSession]" />
    </footer>
  </div>
</template>
<script>
import { Icon } from "vant"
import http from "@/util/http.js"
import SeatingChart from "@/components/schedule/seatMap/map.vue"
import TagExplain from "@/components/schedule/others/tagExplain"
import Notice from "../components/schedule/others/notice.vue"
import FilmDetail from "../components/schedule/filmDetail/filmDetail.vue"
import Submit from "@/components/schedule/others/submit.vue"
import EventBus from "@/util/eventBus"
import { Toast } from "vant"
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("userPhone")) {
      next()
    } else {
      next({
        path: "/Login",
        query: { redirect: to.fullPath },
      })
    }
  },
  data() {
    return {
      schedule: null,
      sessions: null,
      currentSession: 0,
      maxSeat: 5,
      ob: null,
    }
  },
  components: {
    [Icon.name]: Icon,
    SeatingChart,
    TagExplain,
    Notice,
    FilmDetail,
    Submit
},
  mounted() {
    EventBus.$on("update:currentSession", this.updateSession)
    this.getSchedule(this.$route.params.scheduleId)
  },
  beforeDestroy() {
    EventBus.$off("update:currentSession")
    this.$store.commit("emptyChoices")
    this.ob.unobserve(this.$refs.footer)
  },
  methods: {
    getTotal() {
      if (this.$store.state.chosen.length) Toast("敬请期待!")
    },
    updateSession(index) {
      this.currentSession = index
      this.$refs.map.getSeatingChart(this.sessions[index].scheduleId)
      // 刷新seats数据
    },
    getSchedule(scheduleId) {
      http({
        url: `/gateway/?scheduleId=${scheduleId}&k=4878872`,
        headers: {
          "X-Host": "mall.film-ticket.schedule.info",
        },
      }).then((res) => {
        res = res.data.data.schedule
        this.schedule = res
        this.getSession(res.film.filmId, res.cinema.cinemaId, res.showAt)
      })
    },
    getSession(filmId, cinemaId, date) {
      http({
        url: `/gateway/?filmId=${filmId}&cinemaId=${cinemaId}&date=${date}&k=1024902`,
        headers: {
          "X-Host": "mall.film-ticket.schedule.list",
          "X-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudElkIjoiMzAwMCIsInRpbWVzdGFtcCI6MTY2NDM0NzU3NCwidXNlcklkIjozMTkyMDU5N30.25T6y93Pt5RFo5U-Z5jJBtkKIo4RATWrY-vcHHmXSD4",
        },
      }).then((res) => {
        this.sessions = res.data.data.schedules
        this.currentSession = this.sessions.findIndex(
          (index) => index.showAt === date
        )
        this.$nextTick(() => {
          let headerHeight = this.$refs.header.clientHeight
          this.ob = new ResizeObserver((entries) => {
            // entries是所有被观察的元素的数组
            const { height } = entries[0].contentRect
            this.$refs.section.style.height =
              window.innerHeight - headerHeight - height + "px"
          })
          this.ob.observe(this.$refs.footer)
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
header {
  background: #fff;
  height: 44px;
  position: relative;
  text-align: center;
  line-height: 44px;
  color: #191a1b;
  font-size: 17px;

  span {
    line-height: 24px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}

footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #f6f6f6;
  width: 100%;
  position: fixed;
  bottom: 10px;
  z-index: 20;
}

.tag {
  margin-top: 10px;
}
</style>
