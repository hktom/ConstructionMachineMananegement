import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {FlatList} from 'react-native';
import {RootState} from './store/rootReducer';
import {useAppSelector} from './store/store';

function CustomDrawerContent(props: any) {
  const data = useAppSelector((state: RootState) => state.category);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <FlatList
        data={data.value}
        keyExtractor={category => category.uid}
        renderItem={({item}) => {
          return (
            <DrawerItem
              label={item.name}
              onPress={() => {
                props.navigation.navigate('EditScreen', {
                  category: item,
                  action: 'edit',
                  type: 'category',
                  title: 'Manage Category',
                  labelButton: 'Edit Category',
                });
              }}
            />
          );
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
