<template>
  <div>
    <br />
    <br />
    <br />
    <splitpanes
      @resized="plotcharts($event)"
      class="default-theme"
      horizontal
      style="height: 92vh"
    >
      <pane>
        <span><div class="p" id="Chart_TM"></div></span>
      </pane>
      <pane>
        <span><div class="p" id="Chart_STDCount"></div></span>
      </pane>
      <pane>
        <span><div class="p" id="Chart_MMQ"></div></span>
      </pane>
    </splitpanes>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Plotly from "plotly.js-dist";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  name: "dashborad_chart",
  components: {
    Plotly,
    Splitpanes,
    Pane,
  },
  mixins: [],
  props: {},
  data() {
    return {
      refreshchart: 0,
      config: { responsive: true },
      layout_stdconut: {
        autosize: true,
        margin: {
          b: 30,
          l: 25,
          r: 25,
          t: 0,
        },
        yaxis: { tickfont: { color: "#1f77b4" }, side: "left" },
        yaxis2: {
          tickfont: { color: "#ff7f0e" },
          overlaying: "y",
          side: "right",
        },
        shapes: [],
        showlegend: true,
        legend: { orientation: "h", x: 0, y: 1 },
        paper_bgcolor: null,
        plot_bgcolor: null,
      },
      layout_tm: {
        autosize: true,
        margin: {
          b: 30,
          l: 25,
          r: 25,
          t: 20,
        },
        padding: {
          b: 0,
          l: 0,
          r: 0,
          t: 0,
        },
        xaxis: { range: [] },
        shapes: [],
        showlegend: true,
        legend: { orientation: "h", x: 0, y: 1 },
        paper_bgcolor: [],
        plot_bgcolor: [],
      },
      layout_mmq: {
        autosize: true,
        margin: {
          b: 30,
          l: 25,
          r: 25,
          t: 0,
        },
        shapes: [],
        showlegend: true,
        legend: { orientation: "h", x: 0, y: 1 },
        paper_bgcolor: [],
        plot_bgcolor: [],
      },
      sheet: true,
      show: false,

      // dataTMdate_filter: [],
      // dataChart_TM: [],
      // dataChart_MMQ: [],
      // dataCart_STDcount: [],
      // show_details: [],
    };
  },
  computed: {
    ...mapGetters({
      dataTMdate_filter: "DashboardChart/dataTMdatefilter",
      dataChart_TM: "datachartTM/dataChartTM",
      dataChart_MMQ: "datachartMMQ/dataChartMMQ",
      dataChart_STDcount: "datachartSTDCount/dataChartSTDcount",
      show_details: "DashboardChart/showDetails",
    }),
  },
  watch: {
    dataTMdate_filter: "splitdatachart", // call for other time click search
    dataChart_STDcount: "plotcharts",
  },
  created() {
    this.splitdatachart(); // call for 1st time click search
    console.log("Map Actions");
  },
  methods: {
    ...mapActions({
      prepare_TMdata: "datachartTM/prepare_TMdata",
      prepare_MMQdata: "datachartMMQ/prepare_MMQdata",
      prepare_STDcount: "datachartSTDCount/prepare_STDcount",
      showDetails: "DashboardChart/showDetails",
    }),

    splitdatachart() {
      console.log("start plot => ", this.dataTMdate_filter);
      this.layout_tm["shapes"] = this.dataTMdate_filter.bar_ano_filter;
      this.layout_tm["xaxis"]["range"] = [this.dataTMdate_filter['utc_filter'][0], this.dataTMdate_filter["utc_filter"][this.dataTMdate_filter["utc_filter"].length - 1]]
      this.layout_mmq["shapes"] = this.dataTMdate_filter.bar_ano_filter;
      this.layout_stdconut["shapes"] = this.dataTMdate_filter.bar_ano_filter;
      console.log("Shapes => ", this.dataTMdate_filter.bar_ano_filter);
      this.prepare_TMdata(this.dataTMdate_filter);

      this.prepare_MMQdata(this.dataTMdate_filter);
      this.prepare_STDcount(this.dataTMdate_filter);
      this.refreshchart += 1;

      console.log("Split = ", this.layout_stdconut["shapes"]);
      // console.log("Range = ", this.dataTMdate_filter["utc_filter"][0], this.dataTMdate_filter["utc_filter"][this.dataTMdate_filter["utc_filter"].length - 1])

      // Plotly.newPlot("Chart_TM", this.dataChart_TM, this.layout, this.config)
    },

    plotcharts() {
      Plotly.newPlot(
        "Chart_TM",
        this.dataChart_TM,
        this.layout_tm,
        this.config
      );
      Plotly.newPlot(
        "Chart_MMQ",
        this.dataChart_MMQ,
        this.layout_mmq,
        this.config
      );
      Plotly.newPlot(
        "Chart_STDCount",
        this.dataChart_STDcount,
        this.layout_stdconut,
        this.config
      );
    },

    closedetails() {
      this.showDetails();
    },
  },
};
</script>
<style>
.p {
  width: 100%;
  height: 100%;
  background: #f7fdfd;
}
</style>
