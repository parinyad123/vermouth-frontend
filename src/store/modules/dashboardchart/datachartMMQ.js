const state = {
  trace_max: {
    x: [],
    y: [],
    name: "Maximum",
    mode: "lines",
  },
  trace_min: {
    x: [],
    y: [],
    name: "Minimum",
    mode: "lines",
  },
  trace_q1: {
    x: [],
    y: [],
    name: "Quartile 1",
    mode: "lines",
  },
  trace_q2: {
    x: [],
    y: [],
    name: "Quartile 2",
    mode: "lines",
  },
  trace_q3: {
    x: [],
    y: [],
    name: "Quartile 3",
    mode: "lines",
  },
  data_chartMMQ: [],
};
const getters = { dataChartMMQ: (state) => state.data_chartMMQ };
const actions = {
  prepare_MMQdata: ({ commit }, dataTM_payload) => {
    // console.log("prepare_MMQdata action = ", dataTM_payload);
    commit("PREPAREDTM_MMQ", dataTM_payload);
  },
};
const mutations = {
  PREPAREDTM_MMQ: (state, dataTM_payload) => {
    state.trace_max.x = dataTM_payload.utc_filter;
    state.trace_max.y = dataTM_payload.max_filter;
    state.trace_min.x = dataTM_payload.utc_filter;
    state.trace_min.y = dataTM_payload.min_filter;

    state.trace_q1.x = dataTM_payload.utc_filter;
    state.trace_q1.y = dataTM_payload.q1_filter;
    state.trace_q2.x = dataTM_payload.utc_filter;
    state.trace_q2.y = dataTM_payload.q2_filter;
    state.trace_q3.x = dataTM_payload.utc_filter;
    state.trace_q3.y = dataTM_payload.q3_filter;

    state.data_chartMMQ = [
      state.trace_max,
      state.trace_min,
      state.trace_q1,
      state.trace_q2,
      state.trace_q3,
    ];
    // console.log("PREPAREDTM_MMQ", state.data_chartMMQ);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
