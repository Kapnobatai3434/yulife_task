import React from 'react';
import { Form } from 'formik';
import { Button, Box, Flex } from '@chakra-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Input, ITextInput } from '../../components';

const nameInputProps: ITextInput = {
  label: 'Name',
  name: 'name',
  type: 'text',
  placeholder: 'Your name',
};
const userNameInputProps: ITextInput = {
  label: 'Username',
  name: 'username',
  type: 'text',
  placeholder: 'Your username',
};
const passwordInputProps: ITextInput = {
  label: 'Password',
  name: 'password',
  type: 'password',
  placeholder: 'Password',
};

const RegistrationForm: React.FC<{}> = () => (
  <Box p={4}>
    <Form>
      <Box pt={4}>
        <Input {...nameInputProps} />
      </Box>
      <Box pt={4}>
        <Input {...userNameInputProps} />
      </Box>
      <Box pt={4}>
        <Input {...passwordInputProps} />
      </Box>
      <Flex justify="space-between" align="center" pt={4}>
        <Button type="submit">Create Account</Button>
        <RouterLink to="/login">Already have an account?</RouterLink>
      </Flex>
    </Form>
  </Box>
);

export { RegistrationForm };

export default RegistrationForm;
