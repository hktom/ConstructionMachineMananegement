import {ListItem} from '@react-native-material/core';
import React, {useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import CButton from '../../component/button';
import {RootState} from '../../store/rootReducer';
import {useAppSelector} from '../../store/store';

interface IProps {
  route: any;
  navigation: any;
}

function ManageCategory(props: IProps) {
  const {navigation} = props;
  const data = useAppSelector((state: RootState) => state.category);
  useMemo(() => {
    navigation.setOptions({
      title: 'Manage Category',
      headerRight: () => (
        <CButton
          title={'Add'}
          onPress={() => {
            navigation.navigate('EditScreen', {
              action: 'add',
              type: 'category',
              title: 'Manage Category',
              labelButton: 'Add New Category',
            });
          }}
        />
      ),
    });
  }, [navigation]);
  return (
    <ScrollView>
      <View>
        {data.value.map(item => (
          <ListItem
            key={item.uid}
            title={item.name}
            onPress={() => {
              navigation.navigate('EditScreen', {
                category: item,
                action: 'edit',
                type: 'category',
                title: 'Manage Category',
                labelButton: 'Edit Category',
              });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default ManageCategory;
