<template>
  <div>
    <v-radio-group v-model="selectedOption" row >
      <v-radio
      
        v-for="r in options_dates"
        :key="r"
        :label="r"
        :value="r"
      ></v-radio>
    </v-radio-group>

  
        <v-date-picker 
        v-model="dates"
            elevation="1"
            :disabled="all_state"
            :multiple="multiple_state"
            :range="range_state"
            full-width
            :min="startend_Dates[0]"
            :max="startend_Dates[1]"
            ></v-date-picker>
            <!-- <v-card-actions> -->
            <v-row class="ma-0 pa-0">
                <v-col sm="6"><v-btn
                block
                depressed
                color="#E53935"
                class="ma-2 white--text"
                @click="clickClearBotton"
              ><v-icon>mdi-delete-forever</v-icon>
                clear
              </v-btn></v-col>
                <v-col sm="6"><v-btn
                block
                depressed
                :disabled="disabled_searchbotton"
                color="#1A237E"
                class="ma-2 white--text"
                @click="clickSearchBotton"
              ><v-icon>mdi-text-search</v-icon>
                search
              </v-btn></v-col>
              
            </v-row>
          <!-- </v-card-actions> -->
          
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "report_daily_filter_date",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      options_dates: ["range", "multiple", "all"],
      selectedOption: "range",
      startend_dates: ["2021-07-01", "2022-08-22"],
      dates: null,
      range_state: true,
      multiple_state: false,
      all_state: false,
      disabled_searchbotton: true,
      clear: false,
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },

    ...mapGetters({
      startend_Dates: "AnomalyDaily/startend_Dates",
      selected_tms_tosearch: "AnomalyDaily/selected_tms_tosearch",
      satellite_name: "AnomalyDaily/satellite_name",
    }),
  },
  watch: {
    selectedOption: "change_datestate",
    selected_tms_tosearch: "selected_tmsdate",
    dates: "selected_tmsdate",
  },
  mounted() {},
  methods: {
    change_datestate() {
      if (this.selectedOption == "range") {
        this.dates = [];
        this.range_state = true;
        this.multiple_state = false;
        this.all_state = false;
      } else if (this.selectedOption == "multiple") {
        this.dates = [];
        this.range_state = false;
        this.multiple_state = true;
        this.all_state = false;
      } else {
        this.multiple_state = false;
        this.range_state = true;
        this.dates = this.startend_Dates;
        this.all_state = true;
      }
    },

    selected_tmsdate() {
      // console.log("search not work = ", this.selected_tms_tosearch, this.dates);
      if (this.selected_tms_tosearch.length > 0 && this.dates.length > 0) {
        if (this.selectedOption == "range" && this.dates.length == 2) {
          // sort dates
          if (new Date(this.dates[0]) - new Date(this.dates[1]) > 0) {
            this.dates = [this.dates[1], this.dates[0]];
          }
          // console.log("search work = ", this.selected_tms_tosearch, this.dates);
          this.disabled_searchbotton = false;
        } else if (this.selectedOption == "multiple" && this.dates.length > 0) {
          // console.log("search work = ", this.selected_tms_tosearch, this.dates);
          this.disabled_searchbotton = false;
        } else if (this.selectedOption == "all") {
          // console.log("search work = ", this.selected_tms_tosearch, this.dates);
          this.disabled_searchbotton = false;
        } else {
          this.disabled_searchbotton = true;
        }
      } else {
        this.disabled_searchbotton = true;
      }
      console.log("tm -->", this.selected_tms_tosearch)
    },

    ...mapActions({
      port_reportdaily: "AnomalyDaily/port_reportdaily",
      clear_filter: "AnomalyDaily/clear_filter",
    }),
    clickSearchBotton() {
      this.postreport_dict = {
        satname: this.satellite_name,
        tmnames: this.selected_tms_tosearch,
        optiondate: this.selectedOption,
        dates: this.dates,
      };

      // console.log("click = ", this.satellite_name, this.postreport_dict);

      this.port_reportdaily(this.postreport_dict);
    },

    clickClearBotton() {
      this.dates = [];
      this.selectedOption = "range";
      this.clear = true;
      this.clear_filter(this.clear);
      console.log("Click clear")
    },
  },
};
</script>
<style lang="" scoped></style>
