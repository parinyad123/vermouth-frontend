const state = {
    sat_name: "",
    startend_dates: [],
    lastmonth_dates: [],
    reportdailytable: [],
    selected_tms: [],
    selected_typedate: "",
    selected_date: [],
    clear: false,
    postreport_dict: {},
    reget_reporttable: false,
};

const getters = {
    startend_Dates: (state) => state.startend_dates,
    satellite_name: (state) => state.sat_name,
    selected_tms_tosearch: (state) => state.selected_tms,
    postreportdaily: (state) => state.postreport_dict,
    clearstate_filters: (state) => state.clear,
    regetreporttable: (state) => state.reget_reporttable,
};

const actions = {
    cerrent_Satellite: ({ commit }, satname_payload) => {
        commit("SATELLITE_NAME", satname_payload);
    },
    startendDate: ({ commit }, startenddate_payload) => {
        commit("STARTEND_DATE", startenddate_payload);
    },
    selectedtms_tosearch: ({ commit }, selectectms_payload) => {
        commit("SELECTED_TMS", selectectms_payload);
    },
    port_reportdaily: ({ commit }, postreport_dict_payload) => {
        commit("POST_REPORTDAILY", postreport_dict_payload);
    },
    clear_filter: ({ commit }, clear_payload) => {
        commit("CLEAR_FILTERS", clear_payload);
    },
    clear_tm_complete: ({ commit }, cleartm_complete_payload) => {
        commit("CLEAR_TMCOMPLETE", cleartm_complete_payload);
    },
    reget_reporttable_complete: ({ commit }, reget_reporttable_complete_payload) => {
        commit("REGET_TABLECOMPLETE", reget_reporttable_complete_payload);
    },
};

const mutations = {
    SATELLITE_NAME: (state, satname_payload) => {
        state.sat_name = satname_payload;
        console.log("satellite name =>", satname_payload, state.sat_name);
    },
    STARTEND_DATE: (state, startenddate_payload) => {
        state.startend_dates = startenddate_payload;
    },
    TARTEND_DATE: (state, startenddate_payload) => {
        state.startend_dates = startenddate_payload;
    },
    SELECTED_TMS: (state, selectectms_payload) => {
        state.selected_tms = selectectms_payload;
        // console.log("tms name =>", state.selected_tms);
    },
    POST_REPORTDAILY: (state, postreport_dict_payload) => {
        state.postreport_dict = postreport_dict_payload;
    },
    CLEAR_FILTERS: (state, clear_payload) => {
        state.clear = clear_payload;
        // state.selected_tms = [];
        // console.log(
        //   "Clear = ",
        //   state.selected_tms,
        //   state.selected_date,
        //   state.clear
        // );
        // console.log("clear_payload = ", clear_payload);
    },
    CLEAR_TMCOMPLETE: (state) => {
        state.clear = false;
        state.reget_reporttable = true;
        // console.log("REGET_REPORT = ", state.clear);
    },
    REGET_TABLECOMPLETE: (state, reget_reporttable_complete_payload) => {
        state.reget_reporttable = reget_reporttable_complete_payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};