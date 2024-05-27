import axios from "axios";
const state = {
    VUE_APP_SERVICE_API: process.env.VUE_APP_SERVICE_API,
    showchart: false,
    overlayfilter: false,
    searchparams: [],
    searchurl: "",
    searchdate: [],
    resdata: {},
    data_tm: {},
    anomaly_tablename: "",
    analysis_tablename: "",
    data_tm_datefilters: {},
    data_detail: [],
    showdetails: false,
    progresslinear_loadingchart: false,
    getdatareq_downloadcsv: "",
};

const getters = {
    showChart: (state) => state.showchart,
    overlayFilter: (state) => state.overlayfilter,
    searchParams: (state) => state.searchparams,
    analysisTable: (state) => state.analysis_tablename,
    anomalyTable: (state) => state.anomaly_tablename,
    dataDetails: (state) => state.data_detail,
    dataTMdatefilter: (state) => state.data_tm_datefilters,
    showDetails: (state) => state.showdetails,
    GetreqDownloadcsv: (state) => state.getdatareq_downloadcsv,
    progressLoadingchart: (state) => state.progresslinear_loadingchart,
};

const actions = {
    filter_overlay: ({ commit }, overlay_payload) => {
        commit("FILTER_OVERLAYER", overlay_payload);
      },
    
      async fetch_anomalyTHEOS({ commit }, search_payload) {
        console.log("fetch_anomalyTHEOS")
        commit("LOADINGCHART");
        if (
          state.searchurl == search_payload[0].join("/") &&
          search_payload[1] != state.searchdate
        ) {
          // if same url
          // console.log(
          //   "No fetch",
          //   search_payload[0],
          //   search_payload[1],
          //   state.searchdate
          // );
    
          commit("SERACHCHANGEDATE", search_payload[1]);
        } else if (state.searchurl != search_payload[0].join("/")) {
          // console.log("action = ", search_payload);
          const response = await axios.get(
            state.VUE_APP_SERVICE_API.concat("/THEOS_chartanomaly/" + search_payload[0].join("/"))
            // "dbapi/THEOS_chartanomaly/" + search_payload[0].join("/")
          );
          console.log(state.VUE_APP_SERVICE_API.concat("/THEOS_chartanomaly/" + search_payload[0].join("/")), response.data);
          commit("SEARCHNEWTM", [search_payload, response.data]);
        }
    
        commit("LOADCHARTCOMPLETED");
      },
      
      showDetails({ commit }) {
        commit("SHOWDETAIL");
      },
};

const mutations = {
    FILTER_OVERLAYER: (state, overlay_payload) => {
        state.overlayfilter = overlay_payload;
        // console.log("filter = t ", state.overlayfilter);
      },
    
      LOADINGCHART: (state) => {
        state.showchart = false;
        state.progresslinear_loadingchart = true;
      },
    
      LOADCHARTCOMPLETED: (state) => {
        state.showchart = true;
        state.progresslinear_loadingchart = false;
      },
    
    
      SEARCHNEWTM: (state, searchres_payload) => {
        state.searchparams = searchres_payload[0];
        state.searchurl = searchres_payload[0][0].join("/");
        state.searchdate = searchres_payload[0][1];
    
        state.data_detail = searchres_payload[1]["data_detail"];
        state.data_tm = searchres_payload[1]["data_tm"];
        state.analysis_tablename = searchres_payload[1]["analysis_table"];
        state.anomaly_tablename = searchres_payload[1]["anomaly_table"];
    
        //  add id in data detail (id is use for loop)
        for (let i = 0; i < state.data_detail.length; i++) {
          state.data_detail[i]["id"] = i;
        }
    
        state.getdatareq_downloadcsv =
          "/" +
          state.searchparams[0][0] +
          "/" +
          state.searchparams[0][1] +
          "/" +
          state.searchparams[0][2] +
          "/" +
          state.analysis_tablename +
          "/" +
          state.anomaly_tablename +
          "/" +
          state.searchparams[1][0] +
          "/" +
          state.searchparams[1][1];
    
        console.log("mutation = ", state.searchparams);
        console.log("mutation 1 = ", state.searchurl, state.searchdate);
        console.log("mutation data detail = ", state.data_detail);
    
        state.data_tm_datefilters = datefilters(state.data_tm, state.searchdate);
    
        console.log("SEARCHNEWTM = ", state.data_tm_datefilters);
      },
    
      SERACHCHANGEDATE: (state, searchdate_payload) => {
        state.searchdate = searchdate_payload;
        state.data_tm_datefilters = datefilters(state.data_tm, state.searchdate);
        // console.log("SERACHCHANGEDATE = ", state.data_tm_datefilters);
      },
    
      SHOWDETAIL: (state) => {
        state.showdetails = !state.showdetails;
        // console.log("showdetails = ", state.showdetails);
      },
    };
    
    function datefilters(data_tm, rangedate) {
      let mindate = rangedate[0] + " 00:00:00";
      let maxdate = rangedate[1] + " 00:00:00";
      // console.log("Date filter = ", mindate, maxdate);
      // console.log("TM filters = ", typeof data_tm["tm_utc"]);
      let keymindate = Object.keys(data_tm["tm_utc"]).find(
        (key) => data_tm["tm_utc"][key] === mindate
      );
      let keymaxdate = Object.keys(data_tm["tm_utc"]).find(
        (key) => data_tm["tm_utc"][key] === maxdate
      );
    
      //  if mindate is first date and is not xx-xx-xx 00:00:00, so keymindate is null
      if (keymindate == null) {
        // console.log(" --- min null ---");
        keymindate = 0;
        mindate = data_tm["tm_utc"][keymindate];
      }
    
      // statistical data
      let maxdatesplit = data_tm["tm_utc"][keymaxdate].split(" ")[0];
      for (let i = keymaxdate; data_tm["tm_utc"].length > i; i++) {
        if (maxdatesplit == data_tm["tm_utc"][i].split(" ")[0]) {
          keymaxdate = i;
        } else {
          keymaxdate = i - 1;
          break;
        }
      }
    
      let utc_filter = [];
      let avg_filter = [];
      let std_filter = [];
      let count_filter = [];
      let min_filter = [];
      let max_filter = [];
      let q1_filter = [];
      let q2_filter = [];
      let q3_filter = [];
      for (let i = keymindate; i <= keymaxdate; i++) {
        // converse 0 value to Nan
        if (data_tm["tm_avg"][i] == 0) {
          data_tm["tm_avg"][i] = Number.NaN;
          data_tm["tm_std"][i] = Number.NaN;
          data_tm["tm_count"][i] = Number.NaN;
          data_tm["tm_min"][i] = Number.NaN;
          data_tm["tm_max"][i] = Number.NaN;
          data_tm["tm_q1"][i] = Number.NaN;
          data_tm["tm_q2"][i] = Number.NaN;
          data_tm["tm_q3"][i] = Number.NaN;
        }
    
        utc_filter.push(data_tm["tm_utc"][i]);
        avg_filter.push(data_tm["tm_avg"][i]);
        std_filter.push(data_tm["tm_std"][i]);
        count_filter.push(data_tm["tm_count"][i]);
        min_filter.push(data_tm["tm_min"][i]);
        max_filter.push(data_tm["tm_max"][i]);
        q1_filter.push(data_tm["tm_q1"][i]);
        q2_filter.push(data_tm["tm_q2"][i]);
        q3_filter.push(data_tm["tm_q3"][i]);
      }
      // console.log(
      //   "Find = ",
      //   keymindate,
      //   keymaxdate,
      //   data_tm["tm_utc"][keymindate],
      //   data_tm["tm_utc"][keymaxdate]
      // );
      // console.log("Stat = ", utc_filter, avg_filter);
    
      // anomaly data
      // calculate range date to epoch
      let mindate_epoch = Number(new Date(utc_filter[0]));
      let maxdate_epoch = Number(new Date(utc_filter[utc_filter.length - 1]));
    
      // check null value from api
    
      if (data_tm["tm_utc_ano1"] == null) {
        // if dict is null convers to []
        data_tm["tm_utc_ano1"] = [];
      }
      if (data_tm["tm_utc_ano2"] == null) {
        data_tm["tm_utc_ano2"] = [];
      }
      if (data_tm["tm_utc_ano3"] == null) {
        data_tm["tm_utc_ano3"] = [];
      }
      if (data_tm["bar_ano"] == null) {
        data_tm["bar_ano"] = [];
      }
    
      // anomaly level 1
      let utc_ano1 = [];
      let ano1 = [];
      for (let i = 0; i < data_tm["tm_utc_ano1"].length; i++) {
        let ano1_epoch = Number(new Date(data_tm["tm_utc_ano1"][i]));
        if (ano1_epoch >= mindate_epoch && ano1_epoch <= maxdate_epoch) {
          utc_ano1.push(data_tm["tm_utc_ano1"][i]);
          ano1.push(data_tm["tm_ano1"][i]);
        }
      }
      // console.log("Anomaly1 = ", utc_ano1, ano1);
      // anomaly level 2
      let utc_ano2 = [];
      let ano2 = [];
      for (let i = 0; i < data_tm["tm_utc_ano2"].length; i++) {
        let ano2_epoch = Number(new Date(data_tm["tm_utc_ano2"][i]));
        if (ano2_epoch >= mindate_epoch && ano2_epoch <= maxdate_epoch) {
          utc_ano2.push(data_tm["tm_utc_ano2"][i]);
          ano2.push(data_tm["tm_ano2"][i]);
        }
      }
      // console.log("Anomaly2 = ", utc_ano2, ano2);
      // anomaly level 3
      let utc_ano3 = [];
      let ano3 = [];
      for (let i = 0; i < data_tm["tm_utc_ano3"].length; i++) {
        let ano3_epoch = Number(new Date(data_tm["tm_utc_ano3"][i]));
        if (ano3_epoch >= mindate_epoch && ano3_epoch <= maxdate_epoch) {
          utc_ano3.push(data_tm["tm_utc_ano3"][i]);
          ano3.push(data_tm["tm_ano3"][i]);
        }
      }
      // console.log("Anomaly3 = ", utc_ano3, ano3);
    
      // Anomaly Bar
      // console.log("bar_ano = ", data_tm["bar_ano"]);
      let bar_ano = [];
      // let bar_ano_edge = {}
      for (let i = 0; i < data_tm["bar_ano"].length; i++) {
        let x0_epoch = Number(new Date(data_tm["bar_ano"][i]["x0"]));
        let x1_epoch = Number(new Date(data_tm["bar_ano"][i]["x1"]));
    
        // case1: x0 and x1 are between range date
        if (mindate_epoch < x0_epoch && maxdate_epoch > x1_epoch) {
          bar_ano.push(data_tm["bar_ano"][i]);
        } else if (
          mindate_epoch > x0_epoch &&
          maxdate_epoch > x0_epoch &&
          mindate_epoch < x1_epoch &&
          maxdate_epoch > x1_epoch
        ) {
          let bar_ano_edge_x0 = {
            fillcolor: data_tm["bar_ano"][i]["fillcolor"],
            layer: data_tm["bar_ano"][i]["layer"],
            line: data_tm["bar_ano"][i]["line"],
            opacity: data_tm["bar_ano"][i]["opacity"],
            type: data_tm["bar_ano"][i]["type"],
            x0: utc_filter[0],
            x1: data_tm["bar_ano"][i]["x1"],
            xref: data_tm["bar_ano"][i]["xref"],
            y0: data_tm["bar_ano"][i]["y0"],
            y1: data_tm["bar_ano"][i]["y1"],
            yref: data_tm["bar_ano"][i]["yref"],
          };
          bar_ano.push(bar_ano_edge_x0);
        } else if (
          mindate_epoch < x0_epoch &&
          maxdate_epoch > x0_epoch &&
          mindate_epoch < x1_epoch &&
          maxdate_epoch < x1_epoch
        ) {
          let bar_ano_edge_x0 = {
            fillcolor: data_tm["bar_ano"][i]["fillcolor"],
            layer: data_tm["bar_ano"][i]["layer"],
            line: data_tm["bar_ano"][i]["line"],
            opacity: data_tm["bar_ano"][i]["opacity"],
            type: data_tm["bar_ano"][i]["type"],
            x0: data_tm["bar_ano"][i]["x0"],
            x1: utc_filter[utc_filter.length - 1],
            xref: data_tm["bar_ano"][i]["xref"],
            y0: data_tm["bar_ano"][i]["y0"],
            y1: data_tm["bar_ano"][i]["y1"],
            yref: data_tm["bar_ano"][i]["yref"],
          };
          bar_ano.push(bar_ano_edge_x0);
        }
      }
      // console.log("bar_ano = ", data_tm["bar_ano"]);
      // console.log("bar_ano between = ", bar_ano);
    
      // console.log(data_tm);
    
      // state.utcfilter = utc_filter
      // console.log("utcfilter = ", state.utcfilter);
    
      return {
        // statistic
        utc_filter: utc_filter,
        avg_filter: avg_filter,
        std_filter: std_filter,
        count_filter: count_filter,
        min_filter: min_filter,
        max_filter: max_filter,
        q1_filter: q1_filter,
        q2_filter: q2_filter,
        q3_filter: q3_filter,
    
        // bar anomaly
        bar_ano_filter: bar_ano,
    
        // anomaly
        ano1_filter: ano1,
        utc_ano1_filter: utc_ano1,
        ano2_filter: ano2,
        utc_ano2_filter: utc_ano2,
        ano3_filter: ano3,
        utc_ano3_filter: utc_ano3,
      };
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};