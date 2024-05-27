<template>
    <div>
      <div class="mt-30 mb-5">
        <v-row no-gutters align="center">
          <v-col sm="6"> </v-col>
          <v-col sm="6" style="text-align: right;">
            <div>UTC {{ timeutc }} {{ dateutc }}</div>
            <div>Local {{ time }} {{ date }}</div>
          </v-col>
        </v-row>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "datetime",
    components: {},
    data() {
      return {
        time: "",
        date: "",
        week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        timeutc: "",
        dateutc: "",
        dateoffset: new Date().getTimezoneOffset(),
      };
    },
  
    methods: {
      updateTimeLocal() {
        var self = this;
        setInterval(() => {
          var cd = new Date();
          self.time =
            self.zeroPadding(cd.getHours(), 2) +
            ":" +
            self.zeroPadding(cd.getMinutes(), 2) +
            ":" +
            self.zeroPadding(cd.getSeconds(), 2);
          self.date =
            self.zeroPadding(cd.getFullYear(), 4) +
            "-" +
            self.zeroPadding(cd.getMonth() + 1, 2) +
            "-" +
            self.zeroPadding(cd.getDate(), 2) +
            " " +
            self.week[cd.getDay()];
        }, 1000);
      },
      updateTimeUTC() {
        var self = this;
        setInterval(() => {
          var date = Math.round(new Date(new Date()).getTime());
          var epoch = date + self.dateoffset * 60 * 1000;
          var cd = new Date(epoch);
          self.timeutc =
            self.zeroPadding(cd.getHours(), 2) +
            ":" +
            self.zeroPadding(cd.getMinutes(), 2) +
            ":" +
            self.zeroPadding(cd.getSeconds(), 2);
          self.dateutc =
            self.zeroPadding(cd.getFullYear(), 4) +
            "-" +
            self.zeroPadding(cd.getMonth() + 1, 2) +
            "-" +
            self.zeroPadding(cd.getDate(), 2) +
            " " +
            self.week[cd.getDay()];
        }, 1000);
      },
      zeroPadding(num, digital) {
        var zero = "";
        for (var i = 0; i < digital; i++) {
          zero += "0";
        }
        return (zero + num).slice(-digital);
      },
    },
  
    mounted() {
      this.updateTimeUTC();
      this.updateTimeLocal();
    },
  };
  </script>
  
  <style></style>
  