import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const App: React.FC = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    {children}
  </ThemeProvider>
);

export default App;
