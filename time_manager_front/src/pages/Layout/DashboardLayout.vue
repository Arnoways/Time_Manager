<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/timemanager">
        <md-icon>content_paste</md-icon>
        <p>Time Manager</p>
      </sidebar-link>
      <sidebar-link to="/teamgraph">
        <md-icon>library_books</md-icon>
        <p>Team Graph</p>
      </sidebar-link>
      <sidebar-link to="/usergraph">
        <md-icon>bubble_chart</md-icon>
        <p>User Graph</p>
      </sidebar-link>
      <sidebar-link to="/usermanager">
        <md-icon>supervisor_account</md-icon>
        <p>User Manager</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  }
};
</script>
