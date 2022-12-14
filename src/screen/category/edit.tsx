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

import Modal from 'react-native-modal';
import {categoryAction} from '../../store/category';
import {attributeAction} from '../../store/attribute';

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
  const dispatch = useAppDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [attributes, setAttributes] = useState<any>([]);
  const [category, setCategory] = useState<any>({});

  const {handleSubmit, control} = useForm();
  const onSubmit = (payload: any) => {
    let newItem = [...attributes];
    for (const key in payload) {
      newItem = newItem.map((i: any) => {
        if (i.uid === key) {
          i.name = payload[key];
        }
        i.belongTo = category.uid;
        return i;
      });
    }

    if (params?.action === 'edit') {
      dispatch(
        categoryAction.update({
          ...category,
          name: payload[category.uid],
        }),
      );
      newItem.forEach((i: any) => {
        dispatch(attributeAction.remove(i));
      });

      dispatch(attributeAction.add(newItem));
      navigation.goBack();
    } else {
      dispatch(
        categoryAction.add({
          ...category,
          name: payload[category.uid],
        }),
      );
      dispatch(attributeAction.add(newItem));
      navigation.goBack();
    }
  };

  useMemo(() => {
    if (params?.action === 'edit' && params?.category) {
      setCategory({
        ...params?.category,
        value: params?.category?.name,
      });
      let payloadAttributes: any[] = [];
      data.attribute.value.forEach((i: any) => {
        if (i.belongTo === params.category.uid) {
          payloadAttributes.push(i);
        }
      });

      setAttributes(payloadAttributes);
    }
  }, [data.attribute.value, params?.action, params.category]);

  useMemo(() => {
    navigation.setOptions({title: params.title});
    if (params?.action === 'add') {
      setCategory({
        uid: uuid.v4(),
        name: 'Name',
        value: '',
        type: 'text',
        required: 'true',
      });
    }
  }, [navigation, params?.action, params.title]);

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

  const removeField = (field: any) => {
    setAttributes(attributes.filter((i: any) => i.uid !== field.uid));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView>
      <Box pr={10} pl={10} pt={20}>
        <View>
          {category && (
            <Controller
              control={control}
              defaultValue={category?.name !== 'Name' ? category?.name : ''}
              render={({field: {onChange, onBlur, value}}) => (
                <CInput
                  item={category}
                  label="Name"
                  value={value}
                  onBlur={onBlur}
                  variant="outlined"
                  showType={false}
                  canBeRemoved={false}
                  onChangeText={(inputValue: any) => onChange(inputValue)}
                  onDelete={(inputValue: any) => console.log(inputValue)}
                />
              )}
              name={category?.uid}
              rules={{required: true}}
            />
          )}
          {attributes.map((i: IAttribute) => (
            <Controller
              key={i.uid}
              control={control}
              defaultValue={i?.name !== 'Name' ? i?.name : ''}
              render={({field: {onChange, onBlur, value}}) => (
                <CInput
                  item={i}
                  value={value}
                  onBlur={onBlur}
                  variant="outlined"
                  showType={true}
                  canBeRemoved={i.canBeRemoved}
                  onChangeText={(inputValue: any) => onChange(inputValue)}
                  onDelete={(inputValue: any) => removeField(inputValue)}
                />
              )}
              name={i.uid}
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

        {params?.category && (
          <View style={{padding: 10, marginTop: 20}}>
            <CButton
              title={'Remove category'}
              variant="outlined"
              color={'red'}
              onPress={() => {
                dispatch(categoryAction.remove(params?.category?.uid));
                navigation.goBack();
              }}
            />
          </View>
        )}

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
