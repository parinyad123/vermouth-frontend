<template>
  <div>
    <v-progress-linear
      class="mt-5"
      v-if="reportdailytable.length == 0"
      color="#B2EBF2"
      indeterminate
    ></v-progress-linear>
    <v-card color="card" class="pa-10 mb-15" elevation="3" id="inspire">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-data-table
        :headers="headers"
        :items="reportdailytable"
        :items-per-page="10"
        style="
          padding-left: 30px;
          padding-right: 30px;
          padding-top: 10px;
          padding-bottom: 10px;
        "
      >
      </v-data-table
    ></v-card>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "report_daily_table",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      VUE_APP_SERVICE_API: process.env.VUE_APP_SERVICE_API,
      reportdailytable: [],
      sat_name: null,
      headers: [
        {
          text: "Date",
          align: "center",

          value: "date",
          width: "15%",
        },
        {
          text: "Name",
          align: "center",

          value: "name",
          width: "20%",
        },
        {
          text: "Subsystem",
          align: "center",

          value: "subsystem",
          width: "30%",
        },

        {
          text: "Frequency",
          align: "center",

          value: "freq",
          width: "15%",
        },
        {
          text: "Anomaly_points",
          align: "center",

          value: "anomaly_points",
          width: "20%",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      satellite_name: "AnomalyDaily/satellite_name",
      postreportdaily: "AnomalyDaily/postreportdaily",
      regetreporttable: "AnomalyDaily/regetreporttable",
    }),},
  watch: {
    satellite_name: "fetch_proviousmonth", // used to call first table of each sat
    postreportdaily: "post_reportdaily",
    regetreporttable: "reget_proviousmonth",
},
  mounted() {
    this.fetch_proviousmonth();
  },
  created() {
    // this.fetch_proviousmonth();
  },
  methods: {
    ...mapActions({
      reget_reporttable_complete: "AnomalyDaily/reget_reporttable_complete",
    }),
    async fetch_proviousmonth() {
      if (this.satellite_name == "THEOS") {
        const response = await axios.get(
          this.VUE_APP_SERVICE_API.concat("/reportalldaily_proviousmonth")
        );
        this.reportdailytable = response.data.reportdailytable;
        console.log("get", this.satellite_name);
        // console.log(this.reportdailytable);
      } else if (this.satellite_name == "THEOS-2") {
        // wait to coding
        console.log("get", this.satellite_name);
      } else if (this.satellite_name == "THEOS-2A") {
        // wait to coding
        console.log("get", this.satellite_name);
      }
    },
    async post_reportdaily() {
      // console.log("Report table getter = ", this.postreportdaily);
      const response = await axios.post(
        this.VUE_APP_SERVICE_API.concat("/postreportdaily"),
        // "dbapi/postreportdaily",
        this.postreportdaily
      );
      // console.log("Report table getter = ", response.data.reportdailytable);
      this.reportdailytable = response.data.reportdailytable;
    },

    reget_proviousmonth() {
      // use if condition to avoid for loop from changing reget_reporttable value in store.js
      if (this.regetreporttable == true) {
        // console.log("reget_proviousmonth");
        this.reportdailytable = [];
        this.fetch_proviousmonth();
        this.reget_reporttable_complete(false);
      }
    },
  },
};
</script>
<style lang="" scoped></style>
