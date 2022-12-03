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
  onChangeText: (inputValue: any) => void;
  onBlur?: () => void;
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
      <TextInput {...props} onChangeText={props.onChangeText} />
    </View>
  );
}

export default CInput;
