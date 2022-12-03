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
          return <DrawerItem label={item.name} onPress={() => {}} />;
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
