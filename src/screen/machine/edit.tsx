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
import {machineAction} from '../../store/machine';

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
    let newItem = [...attributes];
    for (const key in payload) {
      newItem = newItem.map((i: any) => {
        if (i.uid === key) {
          i.value = payload[key];
        }
        return {uid: i.uid, value: i.value};
      });
    }

    if (params?.action === 'add') {
      dispatch(
        machineAction.add({
          uid: uuid.v4(),
          category: params?.category.uid,
          attributes: newItem,
        }),
      );
    } else {
      dispatch(
        machineAction.update({
          uid: params?.machine.uid,
          attributes: newItem,
        }),
      );
    }
    navigation.goBack();
  };

  useMemo(() => {
    if (params?.category) {
      let payloadAttributes: any[] = [];
      data.attribute.value.forEach((i: any) => {
        if (i.belongTo === params.category.uid) {
          payloadAttributes.push(i);
        }
      });

      console.log('payloadAttributes', payloadAttributes);

      setAttributes(payloadAttributes);
    }
  }, [data.attribute.value, params.category]);

  useMemo(() => {
    if (params.action === 'edit' && params.machine) {
      let machineAttributes = [...attributes];
      for (const key in params.machine.attributes) {
        machineAttributes = machineAttributes.map((i: any) => {
          if (i.uid === key) {
            i.value = params.machine.attributes[key];
          }
          return i;
        });
      }
    }
  }, [attributes, params.action, params.machine]);

  return (
    <ScrollView>
      <Box pr={10} pl={10} pt={20}>
        <View>
          {attributes.map((i: IAttribute) => (
            <Controller
              key={i.uid}
              control={control}
              defaultValue={i?.value}
              render={({field: {onChange, onBlur, value}}) => (
                <CInput
                  item={i}
                  label={i.name}
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
