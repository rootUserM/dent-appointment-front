<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        dense
      >
        <!-- <v-list-item
        href="/dashboard/patients"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-injury-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title>Pacientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
        href="/dashboard"
        >
          <v-list-item-icon>
            <v-icon>mdi-hospital-building</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Clinicas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-row>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-row>
      <v-row justify="center" class="my-5 mx-5">
        <img class="" width="30" src="../assets/here_black.png" alt="">
      </v-row>
      <v-row justify="end" class="my-5 mx-5">
        <v-avatar color=""> <v-icon>mdi-account</v-icon></v-avatar>
      </v-row>
    </v-app-bar>
  </div>

</template>

<script>
export default {
  name:'NavBar',
    data:()=>({
    drawer:false,
    })
}
</script>

<style>

</style>