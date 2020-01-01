import React from 'react';
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/core';
import { useField, Field } from 'formik';

import { ITextInput } from '../interfaces';

const TextInput: React.FC<ITextInput> = props => {
  const [field, meta] = useField(props);

  return (
    <FormControl isRequired isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
      <Field as={Input} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
