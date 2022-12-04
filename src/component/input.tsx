/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {Button, TextInput} from '@react-native-material/core';
// import Icon from 'react-native-ionicons';

interface IProps {
  item: any;
  value?: any;
  label?: any;
  canBeRemoved?: boolean;
  showType?: boolean;
  required?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  onChangeText: (inputValue: any) => void;
  onDelete: (inputValue: any) => void;
  onBlur?: () => void;
}

function CInput(props: IProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
      }}>
      {props.showType && (
        <View style={{width: 85, marginRight: 10}}>
          <Button
            variant="contained"
            titleStyle={{fontSize: 7.5}}
            disabled
            title={props.item?.type}
          />
        </View>
      )}
      <View style={{flex: 1}}>
        <TextInput {...props} onChangeText={props.onChangeText} />
      </View>

      {props.canBeRemoved && (
        <View>
          <Button
            variant="text"
            onPress={() => props.onDelete(props.item)}
            title={
              <Image
                source={require('../asset/trash.png')}
                style={{width: 30, height: 30}}
              />
            }
          />
        </View>
      )}
    </View>
  );
}

export default CInput;
