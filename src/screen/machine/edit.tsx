/* eslint-disable react-native/no-inline-styles */
import {Box} from '@react-native-material/core';
import React, {useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {RootState} from '../../store/rootReducer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useForm, Controller} from 'react-hook-form';
import {IAttribute} from '../../helpers/types';
import CButton from '../../component/button';
import uuid from 'react-native-uuid';
import CInput from '../../component/input';
// import {Dropdown} from 'react-native-material-dropdown';
// import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import {attributeAction} from '../../store/category';

interface IProps {
  route: any;
  navigation: any;
}

// const optionsField = [
//   {
//     value: 'text',
//   },
//   {
//     value: 'number',
//   },
//   {
//     value: 'checkbox',
//   },
//   {
//     value: 'date',
//   },
// ];

function EditMachine(props: IProps) {
  const {route, navigation} = props;
  const params = route.params;
  const data = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  //   const [item, setItem] = useState<any>({});
  //   const [isModalVisible, setModalVisible] = useState(false);
  const [attributes, setAttributes] = useState<any>([]);

  const {handleSubmit, control} = useForm();
  const onSubmit = (payload: any) => {
    console.log(payload);
  };

  useMemo(() => {
    if (attributes.length === 0) {
      let categoryAttributes = [
        ...data.attribute.value.filter(i => i.belongTo === params.category.uid),
      ];

      let machine = data.machine.value.find(
        (i: any) => i.uid === params.machine.uid,
      );

      let machineAttributes = [...categoryAttributes];
      for (const key in machine?.attributes) {
        machineAttributes = machineAttributes.map((i: any) => {
          if (i.uid === key) {
            i.value = machine?.attributes[key];
          }
          return i;
        });
      }

      setAttributes(machineAttributes);
    }
  }, [
    attributes.length,
    data.attribute.value,
    data.machine.value,
    params.category.uid,
    params.machine.uid,
  ]);

  return (
    <ScrollView>
      <Box pr={10} pl={10} pt={20}>
        <View>
          {attributes.map((i: IAttribute) => (
            <Controller
              key={i.uid}
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CInput
                  item={i}
                  value={value}
                  onBlur={onBlur}
                  variant="outlined"
                  showType={false}
                  canBeRemoved={false}
                  onChangeText={(inputValue: any) => onChange(inputValue)}
                  onDelete={(inputValue: any) => {
                    console.log(inputValue);
                  }}
                />
              )}
              name={i.uid}
              rules={{required: true}}
            />
          ))}
        </View>

        <View>
          <Box>
            <CButton title={'Enregister'} onPress={handleSubmit(onSubmit)} />
          </Box>
        </View>
      </Box>
    </ScrollView>
  );
}

export default EditMachine;
