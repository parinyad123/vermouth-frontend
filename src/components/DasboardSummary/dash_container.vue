<template>
  <div>
    <v-card tile>
      <v-row no-gutters align="center" class="mt-4">
        <v-col sm="2"></v-col>
        <v-col sm="8">
          <div style="margin-top: 5px">
            <div class="pt-10" style="font-family: Helvetica">
              <datetime class="font-weight-bold display-0.5" />
            </div>
            <report_weekly />
          </div>
        </v-col>
        <v-col sm="2"></v-col>
      </v-row>
    </v-card>
    <report_daily_filter />
  </div>
</template>
<script>
import datetime from "../DasboardSummary/datetime.vue";
import report_weekly from "../DasboardSummary/report_weekly.vue";
import report_daily_filter from "./report_daily_filter.vue"
export default {
  name: "dash_container",
  components: {
    datetime,
    report_weekly,
    report_daily_filter,
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="" scoped></style>
