import React, { Suspense } from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider, CSSReset, theme, Flex, Box } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import PublicRoutes from './router';
import { global } from './globalStyles';
import client from './graphql/client';

const App: React.FC<{}> = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <Global styles={global} />
          <CSSReset />
          <Flex direction="column" h="100%">
            <Box h="25%" />
            <Box h="50%">
              <PublicRoutes />
            </Box>
            <Box h="25%" />
          </Flex>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  </Suspense>
);

export default App;
