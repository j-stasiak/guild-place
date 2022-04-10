import "antd/dist/antd.css";

import { AdminRoute, UserRoute } from "./UserRoute";
import { Route, Routes } from "react-router-dom";

import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { CalendarPage } from "./pages/CalendarPage";
import { Dashboard } from "./pages/DashboardPage";
import { ForumPage } from "./pages/ForumPage";
import { NavigationLayout } from "./NavigationLayout";
import { PostPage } from "./pages/PostPage";

export const App = () => {
  return (
    <NavigationLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/calendar"
          element={
            <UserRoute>
              <CalendarPage />
            </UserRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <UserRoute>
              <ForumPage />
            </UserRoute>
          }
        />
        <Route
          path="/forum/:id"
          element={
            <UserRoute>
              <PostPage />
            </UserRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
      </Routes>
    </NavigationLayout>
  );
};
