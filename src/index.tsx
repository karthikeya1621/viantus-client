import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import LocationListener from "./components/LocationListener";
import AboutPage from "./pages/about";
import SolutionsPage from "./pages/solutions";
import StaffingPage from "./pages/staffing";
import CareersPage from "./pages/careers";
import ContactPage from "./pages/contact";
import Layout from "./pages/layout";
import IndustriesPage from "./pages/industries";
import BlogPage from "./pages/blog/[[...slug]]";
import ServicePage from "./pages/services/[[...slug]]";

const withLocListener = (elements: RouteObject[]) => {
  return elements.map((_v) => ({
    ..._v,
    element: <LocationListener>{_v.element}</LocationListener>,
  }));
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: withLocListener([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/solutions",
        element: <SolutionsPage />,
      },
      {
        path: "/staffing",
        element: <StaffingPage />,
      },
      {
        path: "/careers",
        element: <CareersPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/industries",
        element: <IndustriesPage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogPage />,
      },
      {
        path: "/services/:slug",
        element: <ServicePage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/services",
        element: <ServicePage />,
      },
    ]),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <App>
    <RouterProvider router={router} />
  </App>
);
