import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { Flex, Box } from '@chakra-ui/core';

import { LoginForm } from './Components';
import { IFormInitialValues } from './interfaces';
import { ILoginUserData, LOGIN_USER } from '../graphql/mutations';
import { setToken } from '../helpers/localStorage';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});
const initialValues: IFormInitialValues = {
  username: '',
  password: '',
};
const handleSubmit = (
  payload: IFormInitialValues,
  actions: FormikHelpers<IFormInitialValues>,
  loginUser: any,
) => {
  const { username, password } = payload;
  loginUser({ variables: { username, password } })
    .then(
      ({
        data: { loginUser: user },
      }: {
        data: { loginUser: ILoginUserData };
      }) => {
        if (user) {
          setToken(user.token);
        }
      },
    )
    .catch(() => {
      actions.setSubmitting(false);
      actions.setErrors({ username: '', password: '' });
    });
};

const LoginContainer: React.FC<{}> = () => {
  const [loginUser] = useMutation<{ loginUser: ILoginUserData }>(LOGIN_USER);

  return (
    <Flex w="100%" justify="space-between" flexWrap="wrap">
      <Box />
      <Box w="40%">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) =>
            handleSubmit(values, actions, loginUser)
          }
          validationSchema={LoginSchema}
        >
          <LoginForm />
        </Formik>
      </Box>
      <Box />
    </Flex>
  );
};

export default LoginContainer;
