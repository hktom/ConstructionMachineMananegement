/* eslint-disable react-native/no-inline-styles */
import {Box} from '@react-native-material/core';
import React, {useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {RootState} from '../../store/rootReducer';
import {useAppSelector} from '../../store/store';
import {useForm, Controller} from 'react-hook-form';
import {IAttribute} from '../../helpers/types';
import CButton from '../../component/button';
import uuid from 'react-native-uuid';
import CInput from '../../component/input';
// import {Dropdown} from 'react-native-material-dropdown';
// import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';

interface IProps {
  route: any;
  navigation: any;
}

const optionsField = [
  {
    value: 'text',
  },
  {
    value: 'number',
  },
  {
    value: 'checkbox',
  },
  {
    value: 'date',
  },
];

function EditCategory(props: IProps) {
  const {route, navigation} = props;
  const params = route.params;
  const data = useAppSelector((state: RootState) => state);
  const [item, setItem] = useState<any>({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [attributes, setAttributes] = useState<any | IAttribute[]>([]);

  const {handleSubmit, control} = useForm();
  const onSubmit = (payload: any) => {
    console.log(payload, item);
    navigation.goBack();
  };

  useMemo(() => {
    if (params?.action === 'edit' && params?.uid) {
      let payload = data.category.value.find((i: any) => i.uid === params?.uid);
      if (payload) {
        let payloadAttributes: any[] = [];
        data.attribute.value.forEach((i: any) => {
          if (i.belongTo === payload?.uid) {
            payloadAttributes.push(i);
          }
        });
        setAttributes(payloadAttributes);
      }
      setItem(payload);
    }
  }, [data.attribute.value, data.category.value, params?.action, params?.uid]);

  useMemo(() => {
    if (params?.action === 'add') {
      setAttributes([
        {
          uid: uuid.v4(),
          name: 'Name',
          value: '',
          type: 'text',
          required: 'true',
        },
      ]);
    }
  }, [params?.action]);

  const addNewField = (type: string) => {
    setAttributes([
      ...attributes,
      {
        uid: uuid.v4(),
        name: 'Name',
        value: '',
        type: type,
        canBeRemoved: true,
        required: 'true',
      },
    ]);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
                  name={i.uid}
                  label={i.name}
                  value={value}
                  onBlur={onBlur}
                  variant="outlined"
                  showType={true}
                  type={i.type}
                  onChangeText={(inputValue: any) => onChange(inputValue)}
                  onDelete={(inputValue: any) => console.log(inputValue)}
                />
              )}
              name="email"
              rules={{required: true}}
            />
          ))}
        </View>

        <Box mb={10} mt={10}>
          <CButton title={'Add new Field'} onPress={() => toggleModal()} />
        </Box>
        <View>
          <Box>
            <CButton
              title={params.labelButton}
              onPress={handleSubmit(onSubmit)}
            />
          </Box>
        </View>

        <Modal
          isVisible={isModalVisible}
          swipeDirection={['up', 'left', 'right', 'down']}
          onBackdropPress={() => toggleModal()}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}>
          <View style={{backgroundColor: '#fff'}}>
            <Text
              style={{
                paddingBottom: 20,
                paddingTop: 10,
                paddingLeft: 10,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              What the field type
            </Text>

            <View style={{padding: 10}}>
              {optionsField.map((i: any) => (
                <CButton
                  key={i.value}
                  title={i.value}
                  variant="outlined"
                  onPress={() => {
                    addNewField(i.value);
                    toggleModal();
                  }}
                />
              ))}
            </View>
          </View>
        </Modal>
      </Box>
    </ScrollView>
  );
}

export default EditCategory;
