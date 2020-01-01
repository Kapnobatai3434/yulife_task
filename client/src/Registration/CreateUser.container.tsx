import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { path } from 'ramda';
import { useMutation } from '@apollo/react-hooks';

import { IRegistrationUserData, CREATE_USER } from '../graphql/mutations';
import { setToken } from '../helpers/localStorage';
import { ICreateUserInitialValues } from './interfaces';
import { Form } from './components';

const CreateUserSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});
const initialValues: ICreateUserInitialValues = {
  name: '',
  username: '',
  password: '',
};
const handleSubmit = (
  payload: ICreateUserInitialValues,
  actions: FormikHelpers<ICreateUserInitialValues>,
  createUser: any,
) => {
  createUser({ variables: { ...payload } })
    .then(path(['data', 'createUser']))
    .then((user: IRegistrationUserData | undefined) => {
      if (user) {
        setToken(user.token);
      }
    })
    .catch(() => {
      actions.setSubmitting(false);
      actions.setErrors({ username: '', password: '' });
    });
};

const CreateUserContainer: React.FC<{}> = () => {
  const [createUser] = useMutation<{ createUser: IRegistrationUserData }>(
    CREATE_USER,
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions, createUser)}
      validationSchema={CreateUserSchema}
    >
      <Form />
    </Formik>
  );
};

export { CreateUserContainer };

export default CreateUserContainer;
