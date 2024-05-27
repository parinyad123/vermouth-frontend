<template>
  <div>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> VERMOUTH </v-list-item-title>
        <v-list-item-subtitle>
          Telemetry Anomaly Detection
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group v-model="selectedItem">
        <v-list-item
          color="info"
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SidebarLink",
  data() {
    return {
      selectedItem: 0,
      items: [
        {
          title: "Dashboard Summary",
          icon: "mdi-view-dashboard",
          link: "/dashboardsummary",
        },
        {
          title: "Anomaly Charts",
          icon: "mdi-chart-timeline-variant-shimmer",
          link: "/dashboardcharts",
        },
      ],
    };
  },
};
</script>

<style></style>
