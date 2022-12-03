import React from 'react';
import {View} from 'react-native';
import {TextInput} from '@react-native-material/core';
// import {useForm} from 'react-hook-form';

interface IProps {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  register: (text: string, options: any) => any;
}

function CInput(props: IProps) {
  //   const {
  //     register,
  //     // handleSubmit,
  //     // watch,
  //     // formState: {errors},
  //   } = useForm();
  return (
    <View>
      <TextInput
        {...props}
        {...props.register(props.name, {required: props.required})}
      />
    </View>
  );
}

export default CInput;
