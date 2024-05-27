<template>
  <div>
    <v-col v-if="buttonappear == false">
      <v-text-field
        flat
        v-model="search_text"
        solo-inverted
        class="text-center"
        label="SEARCH"
        hide-details
        dense
        rounded    
        readonly
        overlay-opacity
        @click="search"
      >
        <template v-slot:append>
          <v-icon @click="search">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-col>

    <v-col v-if="buttonappear == true">
      <v-btn color="#FFF" large outlined rounded>SEARCH</v-btn>
    </v-col>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "appbar_search",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      search_text: "Search",
      buttonappear: false,
      overlay: false,
    };
  },
  computed: {
    ...mapGetters({ searchParams: "DashboardChart/searchParams" }),
  },
  watch: {
    searchParams: "changetextfield",
  },
  mounted() {},
  methods: {
    ...mapActions({
      filter_overlay: "DashboardChart/filter_overlay",
    }),
    search() {
      // console.log("Click search ...");
      this.filter_overlay(true);
    },
    changetextfield() {
      // console.log("searchtextfield = ", this.searchParams);

      this.search_text =
        this.searchParams[0][1] +
        "  ( " +
        this.searchParams[0][0] +
        " ) :  " +
        this.searchParams[0][2];
    },
  },
};
</script>
<style scoped>
.v-text-field{
      width: 400px;
      background-color: #dff5d44c;
      
}
</style>
