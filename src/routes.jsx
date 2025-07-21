import { SidebarAdmin } from "./Components/SideBar/SidebarAdmin";
import { SidebarEmployee } from "./Components/SideBar/SidebarEmployee";
import { Login } from "./pages/Login/Login"
import { DashboardAdmin } from "./pages/Dashboards/DashboardAdmin";
import { DashboardEmployee } from "./pages/Dashboards/DashboardEmployee";
import { Employees } from "./pages/Employees/Employees";
import { Hiring } from "./pages/Hiring/Hiring";
import { LeaveAdmin } from "./pages/Leave/LeaveAdmin";
import { LeaveEmployee } from "./pages/Leave/LeaveEmployee";
import { ReviewsAdmin } from "./pages/Reviews/ReviewsAdmin";
import { ReviewsEmployee } from "./pages/Reviews/ReviewsEmployee";
import { Layout } from "./Components/Layout/Layout";

const routes = [
    {
        path: "/signin",
        Element: Login,
        isAuthenticated: false,
        layout: "None",
        role: null,
        Sidebar: null,
    },
    {
        path: "/admin/dashboard",
        Element: () => (
            <Layout Sidebar={SidebarAdmin}>
                <DashboardAdmin />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/employee/dashboard",
        Element: () => (
            <Layout Sidebar={SidebarEmployee}>
                <DashboardEmployee />
            </Layout>
        ),
        isAuthenticated: true,
        role: "employee",
    },
    {
        path: "/employees",
        Element: () => (
            <Layout Sidebar={SidebarAdmin}>
                <Employees />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/hiring",
        Element: () => (
            <Layout Sidebar={SidebarAdmin}>
                <Hiring />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/admin/leave",
        Element: () => (
            <Layout Sidebar={SidebarAdmin}>
                <LeaveAdmin />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/employee/leave",
        Element: () => (
            <Layout Sidebar={SidebarEmployee}>
                <LeaveEmployee />
            </Layout>
        ),
        isAuthenticated: true,
        role: "employee",
    },
    {
        path: "/admin/reviews",
        Element: () => (
            <Layout Sidebar={SidebarAdmin}>
                <ReviewsAdmin />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/employee/reviews",
        Element: () => (
            <Layout Sidebar={SidebarEmployee}>
                <ReviewsEmployee />
            </Layout>
        ),
        isAuthenticated: true,
        role: "employee",
    },
];

export default routes;