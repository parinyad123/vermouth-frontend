<template>
  <div>
    <template>
      <v-tabs
        v-model="selectedSat"
        centered
        background-color="#B2DFDB"
        color="#D50000"
      >
        <v-tabs-slider color="tabslide"></v-tabs-slider>
        <v-tab
          v-model="selectedSat"
          style="text-align: center"
          v-for="item in satitems"
          :key="item.satname"
          @click="changeSat(item.satname)"
          :disabled="item.state"
        >
          {{ item.satname }}
        </v-tab>
      </v-tabs>
    </template>

    <v-row class="mt-5">
      <v-col sm="1"></v-col>
      <v-col sm="10">
        <v-row>
          <v-col sm="5"
            ><h3 style="text-align: center" class="mt-5 mb-8">
              Amount anomaly of telemetry parameters in daily
            </h3>
            <v-autocomplete
                filled
                chips
                deletable-chips
                clearable
                v-model="selectedSubsystem"
                :items="subsystems"
                label="Sub-Systems"
                color="red"
                multiple
                outlined
              >
                <template v-slot:prepend-item>
                  <v-list-item ripple @mousedown.prevent @click="toggle">
                    <v-list-item-action>
                      <v-icon
                        :color="
                          selectedSubsystem.length > 0 ? 'indigo darken-4' : ''
                        "
                      >
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Select All Subsystems
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-autocomplete>
              
              <v-autocomplete
                filled
                deletable-chips
                clearable
                :disabled="disabled_selectedtm"
                :items="selectedTM_items"
                v-model="selectedTM"
                chips
                label="Telemetry parameters"
                color="blue-grey lighten-2"
                item-text="name"
                item-value="name"
                multiple
                outlined
              >
              </v-autocomplete>

              <report_daily_filter_date />
              
              
              </v-col
          >
          <v-col sm="7">
            <report_daily_table />
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="1">
    </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import report_daily_filter_date from "./report_daily_filter_date.vue";
import report_daily_table from "./report_daily_table.vue"
export default {
  name: "report_daily_filter",
  components: {
    report_daily_filter_date,
    report_daily_table
  },
  mixins: [],
  props: {},
  data() {
    return {
      VUE_APP_SERVICE_API: process.env.VUE_APP_SERVICE_API,
      selectedSat: "THEOS",
      selectedSat_ref: "THEOS",
      satitems: [
        { satname: "THEOS", state: false },
        { satname: "THEOS-2", state: true },
        { satname: "THEOS-2A", state: true },
      ],
      subsystems: [
        "SUBSYSTEM1",
        "SUBSYSTEM2",
        "SUBSYSTEM3",
        "SUBSYSTEM4",
        "SUBSYSTEM5",
        "SUBSYSTEM6",
      ],
      selectedSubsystem: [],

      tm: {
        SUBSYSTEM1: ["sub1_tm1", "sub1_tm2", "sub1_tm3"],
        SUBSYSTEM2: ["sub2_tm1", "sub2_tm2", "sub2_tm3"],
        SUBSYSTEM3: ["sub3_tm1", "sub3_tm2", "sub3_tm3"],
        SUBSYSTEM4: ["sub4_tm1", "sub4_tm2", "sub4_tm3"],
        SUBSYSTEM5: ["sub5_tm1", "sub5_tm2", "sub5_tm3"],
        SUBSYSTEM6: ["sub6_tm1", "sub6_tm2", "sub6_tm3"],
      },
      startend_date: [],
      selectedTM_items: [],
      selectedTM: [],
      disabled_selectedtm: true,

    };
  },
  computed: {
    likesAllSubsystem() {
      return this.selectedSubsystem.length === this.subsystems.length;
    },
    likesSomeSubsystem() {
      return this.selectedSubsystem.length > 0 && !this.likesAllSubsystem;
    },
    icon() {
      if (this.likesAllSubsystem) return "mdi-close-box";
      if (this.likesSomeSubsystem) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    ...mapGetters({
      clearstate_filters: "AnomalyDaily/clearstate_filters",
    }),
  },
  watch: {
    selectedSat_ref: "send_cerrentSat", // send new sat name to vuex
    selectedSubsystem: "create_tmfilter", // when user select subsystem(s), tm filter will be create
    startend_date: "update_startenddate", 
    selectedTM: "selectedtm_tosearch",
    clearstate_filters: "clear_subsystems", 
},
  mounted() {
    this.get_dailyfilterTHEOS();
    this.send_cerrentSat();
  },
  
  methods: {
    changeSat(item) {
      //it will work when change satellite
      if (this.selectedSat_ref != item) {
        if (item == "THEOS") {
          this.selectedSubsystem = [];
          this.selectedTM = [];
          this.disabled_selectedtm = true;
          this.selectedSat_ref = item;
          this.get_dailyfilterTHEOS();

          // console.log("Update Table = ", item);
        } else if (item == "THEOS-2") {
          // wait to coding for THEOS-2
          this.selectedSat_ref = item;
        } else if (item == "THEOS-2A") {
          // wait to coding for THEOS-2A
          this.selectedSat_ref = item;
        }
      }
    },

    toggle() {
      this.$nextTick(() => {
        if (this.likesAllSubsystem) {
          this.selectedSubsystem = [];
        } else {
          this.selectedSubsystem = this.subsystems.slice();
        }
      });

      console.log('sub = ', )
    },

    async get_dailyfilterTHEOS() {
      const response = await axios.get(
        this.VUE_APP_SERVICE_API.concat("/reportdailyfilter")
      );
      this.subsystems = response.data.subsystems;
      this.tm = response.data.tm;
      this.startend_date = response.data.startend_dates;
      console.log("get_dailyfilterTHEOS = ",this.startend_date);
    },

    create_tmfilter() {
      if (this.selectedSubsystem.length > 0) {
        this.selectedTM_items = [];
        for (let i = 0; i < this.selectedSubsystem.length; i++) {
          let dict_header = { header: this.selectedSubsystem[i] };
          this.selectedTM_items = this.selectedTM_items.concat(dict_header);
          for (let j = 0; j < this.tm[this.selectedSubsystem[i]].length; j++) {
            let dict_tm = {
              name: this.tm[this.selectedSubsystem[i]][j],
              value:
                this.tm[this.selectedSubsystem[i]][j] +
                this.selectedSubsystem[i],
              group: this.selectedSubsystem[i],
            };
            this.selectedTM_items = this.selectedTM_items.concat(dict_tm);
          }
          let dict_divider = { divider: true };
          this.selectedTM_items = this.selectedTM_items.concat(dict_divider);
        }
        // this.selectedTM_items.pop();
        this.disabled_selectedtm = false;
      } else {
        this.disabled_selectedtm = true;
        this.selectedTM_items = [];
        this.selectedTM = [];
      }

      // console.log("TM = ", this.selectedTM_items);
    },

    ...mapActions({
      cerrent_Satellite: "AnomalyDaily/cerrent_Satellite",
      startendDate: "AnomalyDaily/startendDate",
      selectedtms_tosearch: "AnomalyDaily/selectedtms_tosearch",
      clear_tm_complete: "AnomalyDaily/clear_tm_complete",
    }),
    send_cerrentSat() {
      this.cerrent_Satellite(this.selectedSat_ref);
    },
    update_startenddate() {
      this.startendDate(this.startend_date);
    },
    selectedtm_tosearch() {
      this.selectedtms_tosearch(this.selectedTM);
    },
    cleartm_complete() {
      this.clear_tm_complete(true);
    },
    clear_subsystems() {
      // use if condition to avoid for loop from changing clear value in store.js
      if (this.clearstate_filters == true) {
        // console.log("clear subsystem ===== ", this.clearstate_filters);
        this.selectedSubsystem = [];
        this.selectedTM = [];
        this.cleartm_complete();
      }
    },
  },
};
</script>
<style lang="" scoped></style>
