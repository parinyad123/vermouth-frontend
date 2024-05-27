<template>
  <div>
    <v-app-bar absolute elevation="1" color="white">
      <v-app-bar-nav-icon
        color="write"
        @click.stop="sidebarMenu = !sidebarMenu"
      ></v-app-bar-nav-icon>
      <!-- <appbar_search /> -->
      <v-spacer></v-spacer>

      <appbar_search />

      <v-spacer></v-spacer>
      <!-- Helo {{ showChart }} -->
      <menu_icons />
    </v-app-bar>

    <v-overlay :z-index="zIndex" :value="overlay">
      <v-btn class="white--text" color="teal" @click="overlay = false">
        Hide Overlay
      </v-btn>
    </v-overlay>

    <v-navigation-drawer
      v-model="sidebarMenu"
      overlay-opacity
      absolute
      temporary
      app
      floating
      :permanemt="sidebarMenu"
    >
      <v-list dense class="secondary" dark>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebarMenu = !sidebarMenu"
              >mdi-chevron-left</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-h7">
              Anomaly Charts
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <SidebarLink />
    </v-navigation-drawer>
    <!-- page empty -->
    <v-main v-if="showChart == false">
      <br />
      <br />

      <v-progress-linear
        v-if="Loadingchart"
        class="mt-4"
        indeterminate
        color="#B2EBF2"
      ></v-progress-linear>

      <filter_overlayer />
    </v-main>

    <!-- page chart -->
    <v-main v-else>
        <filter_overlayer />
        <dashboard_chart />
      </v-main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarLink from "../components/sidebarMenu/SidebarLink.vue";
import appbar_search from "../components/DashboardCharts/appbar_search.vue";
import filter_overlayer from "../components/DashboardCharts/filter_overlayer.vue";
import dashboard_chart from "../components/DashboardCharts/dashboard_chart.vue"
import menu_icons from "../components/DashboardCharts/menu_icons.vue"
export default {
  name: "DashboradCharts",
  components: {
    SidebarLink,
    appbar_search,
    filter_overlayer,
    dashboard_chart,
    menu_icons
  },
  mixins: [],
  props: {},
  data() {
    return {
      sidebarMenu: false,
      mag: "Search",
      buttonappear: false,
      zIndex: 1,
      overlay: false,
      overlay1: true,
      displaychart: false,
      // showChart: false
    };
  },
  computed: {
    ...mapGetters({
      showChart: "DashboardChart/showChart",
      Loadingchart: "DashboardChart/progressLoadingchart",
    }),
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="" scoped></style>
