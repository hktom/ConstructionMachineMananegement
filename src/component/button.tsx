import React from 'react';
import {Button} from '@react-native-material/core';

interface IProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'default' | any;
}

function CButton(props: IProps) {
  return <Button {...props} />;
}

export default CButton;
