const state = {
  trace_std: {
    x: [],
    y: [],
    name: "Standard Deviation",
    mode: "lines",
    opacity: 0.5,
  },

  trace_count: {
    x: [],
    y: [],
    name: "Count",
    mode: "lines",
    opacity: 0.5,
    yaxis: "y2",
  },

  data_chartSTDcount: [],
};
const getters = { dataChartSTDcount: (state) => state.data_chartSTDcount };
const actions = {
	prepare_STDcount: ({ commit }, dataTM_payload) => {
		commit("PREPAREDTM_STD_COUNT", dataTM_payload)
	}
};
const mutations = {
	PREPAREDTM_STD_COUNT: (state, dataTM_payload) => {
		state.trace_count.x = dataTM_payload.utc_filter;
		state.trace_count.y = dataTM_payload.count_filter;
		state.trace_std.x = dataTM_payload.utc_filter;
		state.trace_std.y = dataTM_payload.std_filter;

		state.data_chartSTDcount = [
			state.trace_std,
			state.trace_count,
		]
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
