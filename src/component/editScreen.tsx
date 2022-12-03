import {Text} from '@react-native-material/core';
import React, {useMemo, useState} from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import {RootState} from '../store/rootReducer';
import {useAppSelector} from '../store/store';
import {useForm, Controller} from 'react-hook-form';
import {IAttribute} from '../helpers/types';
import CButton from './button';
// import CInput from './input';

interface IProps {
  route: any;
  navigation: any;
}

function EditScreen(props: IProps) {
  const {route, navigation} = props;
  const params = route.params;
  const data = useAppSelector((state: RootState) => state);
  const [item, setItem] = useState<any>({});
  const [indexState, setIndexState] = useState<any>(undefined);
  const [attributes, setAttributes] = useState<any>([]);

  const {
    // register,
    // setValue,
    handleSubmit,
    control,
    // reset,
    // formState: {errors},
  } = useForm();
  const onSubmit = (payload: any) => {
    console.log(payload);
    navigation.goBack();
  };

  //   const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
  //     return console.log(errors);
  //   };

  useMemo(() => {
    let stateType;
    switch (params?.type) {
      case 'category':
        stateType = data.category;
        break;
      case 'machine':
        stateType = data.machine;
        break;
      case 'attribute':
        stateType = data.attribute;
        break;
      default:
        // stateType = data.category;
        break;
    }
    setIndexState(stateType);
  }, [data.attribute, data.category, data.machine, params?.type]);

  useMemo(() => {
    if (params?.action === 'edit' && indexState) {
      let payload = indexState.value.find((i: any) => i.id === params?.id);
      if (payload) {
        let payloadAttributes: any[] = [];
        data.attribute.value.forEach((i: any) => {
          if (i.belongTo === payload.id) {
            payloadAttributes.push(i);
          }
        });
        setAttributes(payloadAttributes);
      }
      setItem(payload);
    }
  }, [data.attribute.value, indexState, params?.action, params?.id]);
  return (
    <ScrollView>
      <View>
        <Text>{item?.title || 'Ajouter'}</Text>
        <View>
          {attributes.map((i: IAttribute) => (
            <Controller
              key={i.uid}
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(inputValue: any) => onChange(inputValue)}
                  value={value}
                />
              )}
              name="email"
              rules={{required: true}}
            />
            // <CInput
            //   name={i.id}
            //   label={''}
            //   value={i.value}
            //   register={register(i.id, {required: i.required})}
            // />
          ))}
        </View>

        <View>
          <CButton title="Button" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
}

export default EditScreen;
