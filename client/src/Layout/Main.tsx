import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

export const Main: React.FC = ({ children }) => (
  <Box h="50%">
    <Flex w="100%" justify="space-between" flexWrap="wrap">
      <Box />
      <Box w="40%">{children}</Box>
      <Box />
    </Flex>
  </Box>
);
