<template>
  <div class="about">
    <h1>This is an about page</h1>

    <v-row>
      <v-col
        ><v-date-picker
          multiple
          v-model="dats"
          elevation="15"
          :min="mindate"
          :max="maxdate"
        >
        </v-date-picker>
        {{ dats }}
      </v-col>
      <v-col
        ><v-date-picker range v-model="datsrange" elevation="15">
        </v-date-picker>
        {{ datsrange }}</v-col
      >
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dats: null,
      datsrange: null,
      mindate: "2022-04-12",
      maxdate: "2023-06-12",
    };
  },
};
</script>
