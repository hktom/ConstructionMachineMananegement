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

function AllMachine(props: IProps) {
  const {navigation} = props;
  const data = useAppSelector((state: RootState) => state.machine);
  useMemo(() => {
    navigation.setOptions({
      title: 'Manage Machine',
      headerRight: () => (
        <CButton
          title={'New Machine'}
          onPress={() =>
            navigation.navigate('NewMachineScreen', {
              action: 'add',
            })
          }
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

export default AllMachine;
