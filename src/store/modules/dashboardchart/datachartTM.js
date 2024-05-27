const state = {
    data_chartTM: [],
    trace_nor: {
      x: [],
      y: [],
      name: "Telemetry",
      // mode: "lines",
      type: "scatter",
    },
    trace_ano1: {
      x: [],
      y: [],
      name: "Anomaly 1",
      mode: "markers",
      opacity: 1,
      marker: {
        color: "rgb(255, 255, 26)",
      },
      type: "scatter",
    },
    trace_ano2: {
      x: [],
      y: [],
      name: "Anomaly 2",
      mode: "markers",
      opacity: 0.8,
      marker: {
        color: "rgb(255, 165, 0)",
      },
      type: "scatter",
    },
    trace_ano3: {
      x: [],
      y: [],
      name: "Anomaly 3",
      mode: "markers",
      opacity: 0.8,
      marker: {
        color: "rgb(255, 0, 0)",
      },
      type: "scatter",
    },
  };
  const getters = {
    dataChartTM: (state) => state.data_chartTM,
  };
  const actions = {
    prepare_TMdata: ({ commit }, dataTM_payload) => {
      console.log("dataTM_payload actions = ", dataTM_payload);
      commit("PREPAREDTM", dataTM_payload);
    },
  };
  const mutations = {
    PREPAREDTM: (state, dataTM_payload) => {
      state.trace_nor.x = dataTM_payload.utc_filter;
      state.trace_nor.y = dataTM_payload.avg_filter;
  
      state.trace_ano1.x = dataTM_payload.utc_ano1_filter;
      state.trace_ano1.y = dataTM_payload.ano1_filter;
      state.trace_ano2.x = dataTM_payload.utc_ano2_filter;
      state.trace_ano2.y = dataTM_payload.ano2_filter;
      state.trace_ano3.x = dataTM_payload.utc_ano3_filter;
      state.trace_ano3.y = dataTM_payload.ano3_filter;
  
      state.data_chartTM = [
        state.trace_nor,
        state.trace_ano1,
        state.trace_ano2,
        state.trace_ano3,
      ];
  
      console.log("PREPAREDTM = ", state.data_chartTM);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
