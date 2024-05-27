<template>
  <div>
    <div id="app" class="text-center">
      <v-menu
        bottom
        rounded
        offset-y
        :close-on-content-click="false"
        v-if="showicons"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                icon
                class="mx-2"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon color="#009688"> mdi-information-variant-circle-outline </v-icon>
              </v-btn>
            </template>
            <span>Details of telemetry</span>
          </v-tooltip>
        </template>

        <v-card elevation="16" max-width="500" height="700" class="mx-auto">
          <v-row class="pt-5 px-4">
            <v-col cols="5">
              <div class="grey--text text-caption mb-0">Satellite Name</div>
              <p class="text-h6 text--primary">
                {{ searchParams[0][0] }}
              </p></v-col
            >
            <v-col cols="7">
              <div class="grey--text text-caption mb-0">
                Telemetry Parameter Name
              </div>
              <p class="text-h6 text--primary">
                {{ searchParams[0][1] }}
              </p></v-col
            ></v-row
          >
          <v-divider></v-divider>

          <v-card
            v-for="item in dataDetails"
            :key="item.id"
            class="mx-auto py-4 my-0 px-4"
          >
            <div class="grey--text text-caption mb-0">Subsystem Name</div>
            <p class="text-h5 text--primary font-weight-bold mb-2">
              {{ item.subsystemname }}
            </p>
            <div class="grey--text text-caption mb-0 pt-3">Description</div>

            {{ item.description }}

            <div class="grey--text text-caption mb-0 pt-3">Operation Name</div>

            {{ item.operationname }}

            <div class="grey--text text-caption mb-0 pt-3">Property</div>

            {{ item.property }}
          </v-card>
        </v-card>
      </v-menu>

      <v-icon class="mx-5" v-else disabled> mdi-information-variant-circle-outline </v-icon>

      <v-tooltip bottom v-if="showicons">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="download_tm_data_csv">
            <v-icon color="#009688"> mdi-download </v-icon></v-btn
          >
        </template>
        <span>Download .csv</span>
      </v-tooltip>

      <v-icon class="mx-3" v-else disabled> mdi-download </v-icon>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "menu_icons",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      VUE_APP_SERVICE_API: process.env.VUE_APP_SERVICE_API,

      // dialog: false,
      showicons: false,

      show: false,
      benched: 0,
    };
  },
  computed: {
    ...mapGetters({
      dataDetails: "DashboardChart/dataDetails",
      GetreqDownloadcsv: "DashboardChart/GetreqDownloadcsv",
      searchParams: "DashboardChart/searchParams",
    }),

    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 6;
    },
  },
  watch: { dataDetails: "show_Icons" },
  mounted() {},
  methods: {
    // show_dialog() {
    //     this.dialog =! this.dialog
    // }

    ...mapActions({
      showDetails: "DashboardChart/showDetails",
    }),
    show_Icons() {
      if (this.dataDetails.lenght != 0) {
        this.showicons = true;
      } else {
        this.showicons = false;
      }
    },


    async download_tm_data_csv() {
      
      const getreq =  this.GetreqDownloadcsv.split("/");
      const date1 = getreq[5].split(" ")[0].split("-");
      const date2 = getreq[6].split(" ")[0].split("-");
      const date = date1.join('').concat("_",date2.join(''))
      const file_name_csv = getreq[0].concat('_', getreq[1], '_', getreq[2], '_', date,'.csv')
      console.log("File name = ", file_name_csv)
      // Perform the GET request
      axios
        .get(
          this.VUE_APP_SERVICE_API.concat(
            "/GET_THEOSDownload_staticscsv", this.GetreqDownloadcsv
          ),
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          // Create a blob object from the response data
          const blob = new Blob([response.data], { type: "text/csv" });

          // Create a temporary URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Create a link element to trigger the download
          const link = document.createElement("a");
          link.href = url;

          // Set the download attribute with the desired file name
          link.setAttribute("download", file_name_csv);

          // Trigger a click event to start the download
          link.click();

          // Clean up by revoking the URL
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error downloading the CSV:", error);
        });
    },

    // download_tm_data_csv() {
    //   axios({
    //     url: this.VUE_APP_SERVICE_API.concat(
    //       "THEOSgetDownloadcsv" + this.GetreqDownloadcsv
    //     ),
    //     method: "GET",
    //     responseType: "blob",
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": " GET, PUT, POST, DELETE, OPTIONS",
    //       "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    //       "Access-Control-Allow-Credentials": "false",
    //     },
    //   }).then((res) => {
    //     var FILE = window.URL.createObjectURL(new Blob([res.data]));
    //     var docUrl = document.createElement('x');
    //     docUrl.href = FILE;
    //     docUrl.setAttribute('download', 'file.csv');
    //     document.body.appendChild(docUrl)
    //     docUrl.click();
    //   });
    // },
  },
};
</script>
<style lang="" scoped></style>
