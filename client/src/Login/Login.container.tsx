import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { Flex, Box } from '@chakra-ui/core';
import { path } from 'ramda';

import { LoginForm } from './components';
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
  loginUser({ variables: { ...payload } })
    .then(path(['data', 'loginUser']))
    .then((user: ILoginUserData | undefined) => {
      if (user) {
        setToken(user.token);
      }
    })
    .catch(() => {
      actions.setSubmitting(false);
      actions.setErrors({ username: '', password: '' });
    });
};

const LoginContainer: React.FC<{}> = () => {
  const [loginUser] = useMutation<{ loginUser: ILoginUserData }>(LOGIN_USER);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions, loginUser)}
      validationSchema={LoginSchema}
    >
      <LoginForm />
    </Formik>
  );
};

export { LoginContainer };

export default LoginContainer;
