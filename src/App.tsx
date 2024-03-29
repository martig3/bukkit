import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import Files, { loader as filesLoader } from "./routes/files/files";
import { Login } from "./routes/login/login";
import { Notifications } from "@mantine/notifications";
import Admin, { loader as adminLoader } from "./routes/admin/admin";
import Invites, {
  loader as invitesLoader,
} from "./routes/admin/invites/invites";
import NoInvite from "./routes/errors/no-invite";
import Auth from "./routes/errors/auth";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      loader: rootLoader,
      children: [
        {
          path: "buckets/:bucket/*",
          element: <Files />,
          loader: filesLoader,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "admin",
      element: <Admin />,
      loader: adminLoader,
      children: [
        {
          path: "invites",
          element: <Invites />,
          loader: invitesLoader,
        },
      ],
    },
    {
      path: "errors",
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        {
          path: "no-invite",
          element: <NoInvite />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
      ],
    },
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications limit={5} />
        <RouterProvider router={router} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
