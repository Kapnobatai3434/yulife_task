import React from 'react';
import { Form } from 'formik';
import { Button, Box } from '@chakra-ui/core';

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
      <Box pt={4}>
        <Button type="submit">Submit</Button>
      </Box>
    </Form>
  </Box>
);

export { RegistrationForm };

export default RegistrationForm;
