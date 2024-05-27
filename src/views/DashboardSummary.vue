<template>
    <div>
        <v-app-bar absolute elevation="1" class="pa-0" color="white">
            <v-row>

            <v-col cols="2"><v-app-bar-nav-icon @click.stop="sidebarMenu=!sidebarMenu"></v-app-bar-nav-icon></v-col>
            <v-col class="d-flex justify-space-around">
                <v-toolbar-title class="text-center pt-2">Dashboard Summary</v-toolbar-title>
            </v-col>
            <v-col cols="2"></v-col>
            
            
        </v-row>
        </v-app-bar>

        <v-navigation-drawer
        v-model="sidebarMenu"
        overlay-opacity
        absolute
        temporary
        app
        floating
        :permanemt="sidebarMenu"
      >

      <!-- <v-list dense >
          <v-list-item>
            <v-list-item-action>
              <v-icon @click.stop="sidebarMenu = !sidebarMenu"
                >mdi-chevron-left</v-icon
              >
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                VERMOUTH
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
    
    <SidebarLink />
    </v-navigation-drawer>
    <v-container fluid class="pa-0 mt-15 ">
        <dash_container />
    </v-container>
    </div>
</template>
<script>
import SidebarLink from  "../components/sidebarMenu/SidebarLink"
import dash_container from "../components/DasboardSummary/dash_container"
export default {
    name: "DashboardSummary",
    components: {
        SidebarLink,
        dash_container
    },
    data() {
        return {
            sidebarMenu:false
        };
    },
};
</script>
