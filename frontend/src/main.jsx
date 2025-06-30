import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import CandidateLayout from "./layouts/CandidateLayout.jsx";
import EmployerLayout from "./layouts/EmployerLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import PublicRoute from "./Provider/PublicRoute.jsx";
import CandidateRoute from "./Provider/CandidateRoute.jsx";
import EmployerRoute from "./Provider/EmployerRoute.jsx";
import AdminRoute from "./Provider/AdminRoute.jsx";

const JobApplications = lazy(() =>
  import("./pages/employer/JobApplications.jsx")
);
const Register = lazy(() => import("./pages/auth/Register"));
const Error = lazy(() => import("./components/Error.jsx"));
const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const JobPage = lazy(() => import("./pages/JobPage.jsx"));
const PostJob = lazy(() => import("./pages/employer/PostJob.jsx"));
const JobPostsList = lazy(() => import("./pages/employer/JobPostsList.jsx"));
const Dashboard = lazy(() => import("./pages/employer/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/condidate/Profile.jsx"));
const Applications = lazy(() => import("./pages/condidate/Applications.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      { path: "/jobs", element: <JobPage /> },
    ],
  },
  {
    path: "/candidate",
    errorElement: <Error />,
    element: (
      <CandidateRoute>
        <CandidateLayout />
      </CandidateRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: "applications", element: <Applications /> },
    ],
  },
  {
    path: "/employer",
    errorElement: <Error />,
    element: (
      <EmployerRoute>
        <EmployerLayout />
      </EmployerRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "post-job", element: <PostJob /> },
      { path: "job-posts", element: <JobPostsList /> },
      { path: "applicants", element: <JobApplications /> },
    ],
  },
  {
    path: "/admin",
    errorElement: <Error />,
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
  },
  {
    // Catch all route error
    path: "*",
    element: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
