<template>
  <div>
    
    <v-progress-linear
      v-if="reportweekly.length == 0"
      color="#B2EBF2"
      indeterminate
    ></v-progress-linear>
    <v-card color="card" class="pa-10 mb-15" elevation="5" id="inspire">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="pt-0 justify-center"
        ><h3>
          Number of anomaly telemetry each satellite per a week
        </h3></v-card-title
      >
      <v-spacer></v-spacer>
      <v-data-table
        :headers="headers"
        :items="reportweekly"
        :items-per-page="10"
        style="padding-left: 30px; padding-right: 30px; padding-top: 10px; padding-bottom: 10px;"
      >
      </v-data-table>
    </v-card>
    
   </div>
</template>
<script>
import axios from "axios";

export default {
  name: "report_weekly",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      VUE_APP_SERVICE_API: process.env.VUE_APP_SERVICE_API,
      data_ano_sat: "erer",
      headers: [
        {
          text: "Week",
          align: "center",
          sortable: false,
          value: "week",
          width: "40%",
        },
        { text: "THEOS (TM)", value: "theos", width: "20%", align: "center" },
        {
          text: "THEOS-2 (TM)",
          value: "theosmain",
          width: "20%",
          align: "center",
        },
        {
          text: "THEOS-2A (TM)",
          value: "theossmall",
          width: "20%",
          align: "center",
        },
      ],
      reportweeklytable: [],

      reportweekly: [],
    };
  },
  created() {},
  computed: {},
  watch: {},
  mounted() {
    axios
      .get(this.VUE_APP_SERVICE_API.concat("/anomalyweekly"))
      .then((response) => {
        this.reportweekly = response.data.anomalyweekly;
        console.log("all = ", this.reportweekly)
        console.log("data = ", this.reportweekly[0]);
        console.log("type = ", typeof this.reportweekly);
        console.log("type = ", typeof this.reportweekly[0]);
        console.log(this.reportweekly.length);
        console.log(typeof this.anomalyweekly);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {},
};
</script>
<style lang="" scoped></style>
