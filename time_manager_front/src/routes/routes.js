import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TimeManager from "@/pages/TimeManager.vue";
import TeamGraph from "@/pages/TeamGraph.vue";
import UserGraph from "@/pages/UserGraph.vue";
import UserManager from "@/pages/UserManager.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "timemanager",
        name: "Time Manager",
        component: TimeManager
      },
      {
        path: "teamgraph",
        name: "Team Graph",
        component: TeamGraph
      },
      {
        path: "usergraph",
        name: "User Graph",
        component: UserGraph
      },
      {
        path: "usermanager",
        name: "User Manager",
        component: UserManager
      }
    ]
  }
];

export default routes;
