import './App.css'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from "./routes/root";
import Files, { loader as filesLoader } from "./routes/files/files";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      loader: rootLoader,
      children: [
        {
          path: 'buckets/:bucket/*',
          element: <Files/>,
          loader: filesLoader,
        },
      ],
    },
  ]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router}/>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
