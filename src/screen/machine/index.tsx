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

function MachineScreen(props: IProps) {
  const {route, navigation} = props;
  const data = useAppSelector((state: RootState) => state.machine);
  useMemo(() => {
    navigation.setOptions({
      title: route.params.title,
      headerRight: () => (
        <CButton
          title={'New Machine'}
          onPress={() =>
            navigation.navigate('NewMachineScreen', {
              category: route.params.category,
            })
          }
        />
      ),
    });
  }, [navigation, route.params.category, route.params.title]);
  return (
    <ScrollView>
      <View>
        {data.value
          .filter((item: any) => item.category === route.params.uid)
          .map((item: any) => (
            <ListItem
              key={item.uid}
              title={item.name}
              onPress={() => {
                navigation.navigate('MachineScreen', {
                  category: item,
                  title: `Category : ${item.name}`,
                });
              }}
            />
          ))}
      </View>
    </ScrollView>
  );
}

export default MachineScreen;
