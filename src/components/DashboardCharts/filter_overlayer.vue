<template>
  <div>
    <v-overlay :z-index="zIndex" :value="overlay" :dark="false">
      <v-card
        elevation="3"
        class="mx-auto text_filter--text"
        width="700"
        outlined
        color=""
      >
        <v-row class="my-1">
          <v-col sm="1"></v-col>
          <v-col sm="10" class="text-center">
            Search for Telemetry parameter of Satellite
          </v-col>

          <v-col sm="1"
            ><v-icon class="text_filter--text" @click="closefilter"
              >mdi-close</v-icon
            ></v-col
          >
        </v-row>
        <v-divider color="#EEEEEE"></v-divider>
        <v-progress-linear
          v-if="progresslinear"
          indeterminate
          color="#B2EBF2"
        ></v-progress-linear>
        <v-row class="mt-1">
          <v-col sm="1"></v-col>
          <v-col sm="10">
            <v-row>
              <v-col col="6">
                <v-autocomplete
                  v-model="SelectedSatellite"
                  :items="satellite_items"
                  :disabled="satellite_items.disabled"
                  item-text="name"
                  dense
                  filled
                  rounded
                  label="Satellite"
                ></v-autocomplete>
              </v-col>
              <v-col col="6">
                <v-autocomplete
                  v-model="SelectedSubsystem"
                  :items="createsubsystemfilters"
                  dense
                  filled
                  rounded
                  label="Subsystem"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="SelectedTelemetry"
                  :disabled="!SelectedSubsystem"
                  :items="telemetriesfilter"
                  dense
                  filled
                  rounded
                  label="Telemetry"
                ></v-autocomplete
              ></v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="SelectedFrequency"
                  :disabled="!SelectedTelemetry"
                  :items="frequenciesfilter"
                  dense
                  filled
                  rounded
                  label="Frequency"
                ></v-autocomplete
              ></v-col>
            </v-row>

            <v-row>
              <v-col cols="9">
                <v-menu
                  :close-on-content-click="false"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      @click="toggletextfield"
                      :disabled="!SelectedFrequency"
                      v-model="dateRangeText"
                      label="Date range"
                      readonly
                      outlined
                      prepend-inner-icon="mdi-calendar-blank-multiple"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field
                  ></template>

                  <v-date-picker
                    v-model="Selectedpickerdate"
                    @input="menu2 = false"
                    color=""
                    range
                    
                    :min="startend_dates[0]"
                    :max="startend_dates[1]"
                  >
                  </v-date-picker
                ></v-menu>
              </v-col>
              <v-col cols="3"
                ><v-btn
                  class="botton_filter py-7"
                  large
                  color="#C8E6C9"
                  block
                  @click="selectalldatebotton"
                  :disabled="!SelectedFrequency"
                >
                  <v-icon left>
                    mdi-clock-check-outline
                  </v-icon>
                  All Date
                </v-btn></v-col
              >
            </v-row>

            <v-row>
              <v-col cols="12" class="py-0">
                <v-subheader class="pl-0">
                  Range of
                  {{ Selectedrangeslider[1] - Selectedrangeslider[0] }} month
                  (Start date -> End date)
                </v-subheader>
                <v-range-slider
                  @mousedown="toggleslider"
                  :disabled="!SelectedFrequency"
                  v-model="Selectedrangeslider"
                  :max="maxmin_slider[1]"
                  :min="maxmin_slider[0]"
                ></v-range-slider> </v-col
            ></v-row>

            <v-row class="my-0 py-0">
              <v-col class="pt-0 pb-8 body-2 grey--text text-right">
                Today</v-col
              >
            </v-row>

            <v-row class="mb-4">
              <!-- <v-col cols="6"></v-col> -->
              <!-- <v-col cols="3"
                >
                <v-btn
                  class="botton_filter py-7"
                  large
                  block
                  @click="clearbotton"
                >
                  <v-icon left>
                    mdi-clock-check-outline
                  </v-icon>
                  clear
                </v-btn>
              </v-col> -->
              <v-col cols="12"
                ><v-btn
                  class="botton_filter py-7"
                  large
                  block
                  color="#BBDEFB"
                  @click="searchbotton"
                  :disabled="!SelectedFrequency"
                >
                  <v-icon left>
                    mdi-magnify
                  </v-icon>
                  search
                </v-btn>
              </v-col>
            </v-row>

          </v-col>
          
          <v-col sm="1"></v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "filter_overlayer",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      VUE_APP_SERVICE_API: process.env.VUE_APP_SERVICE_API,
      progresslinear: true,
      zIndex: 1,
      overlay: true,
      satellite_items: [
        { name: "THEOS", disabled: false },
        { name: "THEOS-2", disabled: true },
        { name: "THEOS-2A", disabled: true },
      ],
      SelectedSatellite: "THEOS",

      THEOSchartfilter: {},

      objtm: {},
      SelectedSubsystem: null,
      SelectedTelemetry: null,
      SelectedFrequency: null,
      telemetriesfilter: [],
      frequenciesfilter: [],

      count_sat: 0,

      Selectedrangedate: [],
      Selectedpickerdate: [],
      menudatepicker: true,

      menu2: false,

      switchtextfield: false,
      switchslider: false,

      datetoggle: false,
      active: false,
      startend_dates: ["2021-07-01", "2022-09-22"],

      maxmin_slider: [0, 72],
      Selectedrangeslider: [72, 72],

      THEOSfilter: {},
    };
  },
  computed: {
    ...mapGetters({
      overlayFilter: "DashboardChart/overlayFilter",
    }),
    dateRangeText() {
      // console.log(
      //   "date range",
      //   this.Selectedrangedate.length,
      //   this.Selectedrangedate
      // );
      if (this.Selectedrangedate.length === 1) {
        return this.Selectedrangedate[0];
      } else if (this.Selectedrangedate.length === 2) {
        // console.log("range text = ", this.Selectedrangedate.join(" ~ "));
        return this.Selectedrangedate.join(" ~ ");
      } else {
        return "";
      }
    },

    createsubsystemfilters() {
      let subsystems = Object.keys(this.THEOSchartfilter);
      return subsystems;
    },
  },
  watch: {
    THEOSfilter: "get_THEOSchartfilter",
    overlayFilter: "togglefilter",
    SelectedSubsystem: "createTelemetryitems",
    SelectedTelemetry: "createfreqitems",
    SelectedFrequency: "manageinitdate",
    Selectedpickerdate: "writetextfieldBypicker",
    Selectedrangeslider: "writetextfieldByslider",
  },
  created() {
    this.fetchTHEOSchartfilters();
  },
  mounted() {
    // this.fetchTHEOSchartfilters();
  },
  methods: {
    async fetchTHEOSchartfilters() {
      axios
        .get(this.VUE_APP_SERVICE_API.concat("/THEOSchartfilter"))
        .then((res) => (this.THEOSfilter = res.data.THEOSchartfilter))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },

    ...mapActions({
      filter_overlay: "DashboardChart/filter_overlay",
      fetch_anomalyTHEOS: "DashboardChart/fetch_anomalyTHEOS",
    }),
    togglefilter() {
      // console.log("toggle filter = ", this.overlay, this.overlayFilter);
      this.overlay = this.overlayFilter;
    },
    closefilter() {
      this.overlay = false;
      this.filter_overlay(false);
    },
    toggle() {
      this.datetoggle = !this.datetoggle;
    },

    toggletextfield() {
      this.switchtextfield = true;
      this.switchslider = false;
      // console.log("text toggle");
    },
    toggleslider() {
      this.switchtextfield = false;
      this.switchslider = true;
      // console.log("slider toggle");
    },

    createTelemetryitems() {
      this.telemetriesfilter = [];
      this.SelectedTelemetry = null;
      this.frequenciesfilter = [];
      this.Selectedrangedate = [];

      // disable
      this.SelectedFrequency = null;
      // this.Selectedrangedate = []
      // this.Selectedrangeslider = [72, 72]
      // this.Selectedpickerdate = []

      for (const sub of Object(this.THEOSchartfilter[this.SelectedSubsystem])) {
        this.telemetriesfilter.push(sub.tm);
      }
    },

    createfreqitems() {
      if (this.SelectedTelemetry != null) {
        this.SelectedFrequency = null;
        this.frequenciesfilter = [];
        let arraysub = Object(this.THEOSchartfilter[this.SelectedSubsystem]);
        this.objtm = arraysub.find((e) => e.tm === this.SelectedTelemetry);
        // console.log("Obj tm = ", this.SelectedTelemetry, this.objtm);

        // new
        let objsfreqdate = this.objtm.freq_dates;
        // console.log("freq_dates = ", objsfreqdate[0].maxDate);
        for (let i = 0; i < objsfreqdate.length; i++) {
          this.frequenciesfilter.push(objsfreqdate[i].freq);
        }

        // console.log("freq = ", this.frequenciesfilter);

        this.manageinitdate();

        for (let i = 0; i < this.frequenciesfilter.length; i++) {
          // auto show 1H freq
          if (this.frequenciesfilter[i] == "1H") {
            this.SelectedFrequency = this.frequenciesfilter[i];
            break;
          } else {
            // if frequenciesfilter has not 1H, show another
            this.SelectedFrequency = this.frequenciesfilter[0];
          }
        }

        // old
        // this.startend_dates = this.objtm["dates_" + this.SelectedFrequency];
        // new
        let objfreqselect = objsfreqdate.find(
          (e) => e.freq === this.SelectedFrequency
        );
        this.startend_dates = [objfreqselect.minDate, objfreqselect.maxDate];
        // console.log("startend_dates = ", this.startend_dates);
      }
    },

    dateISO(datetime) {
      return datetime.toISOString().split("T")[0];
    },

    shifttMonth(date, num) {
      // console.log("start shiftt", date);
      date = new Date(date);
      let dateshift = new Date(date.setMonth(date.getMonth() + num));
      // console.log("date = ", date);
      return this.dateISO(dateshift);
    },

    calculatediffMonth(startend) {
      let startsplit = startend[0].split("-");
      let firstdate = startsplit[0] + "-" + startsplit[1] + "-01";
      let start = new Date(firstdate);

      let endsplit = startend[1].split("-");
      let end = new Date(parseInt(endsplit[0]), parseInt(endsplit[1]), 0);
      // console.log("Diff month = ", start, end);

      let diffmonth =
        end.getMonth() -
        start.getMonth() +
        12 * (end.getFullYear() - start.getFullYear());

      return diffmonth + 1;
    },

    manageinitdate() {
      if (this.SelectedFrequency != null) {
        // new
        let objfreqselect = this.objtm.freq_dates.find(
          (e) => e.freq === this.SelectedFrequency
        );
        this.startend_dates = [objfreqselect.minDate, objfreqselect.maxDate];
      }

      let numbackmonth = 3;
      let backmonth = this.shifttMonth(this.startend_dates[1], -numbackmonth);
      this.Selectedrangedate = [backmonth, this.startend_dates[1]];
      let diffmonth = this.calculatediffMonth(this.startend_dates);
      // console.log("Diff month 1 = ", diffmonth);
      this.maxmin_slider = [0, diffmonth];
      this.Selectedrangeslider = [diffmonth - numbackmonth - 1, diffmonth];
    },

    writetextfieldBypicker() {
      if (this.switchtextfield) {
        this.Selectedrangedate = [];
        if (
          new Date(this.Selectedpickerdate[0]) -
            new Date(this.Selectedpickerdate[1]) >
          0
        ) {
          this.Selectedpickerdate = [
            this.Selectedpickerdate[1],
            this.Selectedpickerdate[0],
          ];
        }
        this.Selectedrangedate = this.Selectedpickerdate;

        // set slider date
        if (this.Selectedpickerdate.length == 2) {
          let refdate_start = this.startend_dates[0];
          let startslider = this.calculatediffMonth([
            refdate_start,
            this.Selectedpickerdate[0],
          ]);
          let endslider = this.calculatediffMonth([
            refdate_start,
            this.Selectedpickerdate[1],
          ]);
          this.Selectedrangeslider = [startslider - 1, endslider];

          // console.log(
          //   "write = ",
          //   this.startend_dates[0],
          //   this.Selectedrangedate,
          //   startslider,
          //   endslider
          // );
        }
      }
    },

    convertsliderpointTOdate(point, pos) {
      if (point[pos] == 0) {
        return this.startend_dates[0];
      } else if (point[pos] == this.maxmin_slider[1]) {
        return this.startend_dates[1];
      } else {
        this.pointdate = this.shifttMonth(
          this.startend_dates[0],
          point[pos]
        ).split("-");
        this.pointdate = this.pointdate[0] + "-" + this.pointdate[1] + "-01";

        return this.pointdate;
      }
    },

    writetextfieldByslider() {
      if (this.switchslider) {
        let arraystartdate = this.convertsliderpointTOdate(
          this.Selectedrangeslider,
          0
        );
        let arrayenddate = this.convertsliderpointTOdate(
          this.Selectedrangeslider,
          1
        );

        this.Selectedrangedate = [arraystartdate, arrayenddate];
      }
    },
    selectalldatebotton() {
      this.switchtextfield = false;
      this.switchslider = false;
      this.Selectedrangedate = this.startend_dates;
      this.Selectedrangeslider = this.maxmin_slider;
      this.Selectedpickerdate = this.startend_dates;
    },

    get_THEOSchartfilter() {
      // console.log("THEOS chart filter = ", this.THEOSfilter);
      this.THEOSchartfilter = this.THEOSfilter;
      this.progresslinear = false;
    },

    searchbotton() {
      // console.log(
      //   this.SelectedSatellite,
      //   this.SelectedTelemetry,
      //   this.SelectedFrequency,
      //   this.Selectedrangedate
      // );
      let searchparams = [
        [
          this.SelectedSatellite,
          this.SelectedTelemetry,
          this.SelectedFrequency,
        ],
        this.Selectedrangedate,
      ];

      this.closefilter();
      this.fetch_anomalyTHEOS(searchparams);
    },
  },
};
</script>
<style lang="" scoped></style>
