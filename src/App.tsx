import './App.css'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import MainView from './appshell/main-view';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <MainView/>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
