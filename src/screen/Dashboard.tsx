import React from 'react';
import {Text} from '@react-native-material/core';
// import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {useAppSelector} from '../store/store';
import {RootState} from '../store/rootReducer';
import CButton from '../component/button';

function Dashboard() {
  const data = useAppSelector((state: RootState) => state);
  const emptyMachineType = () => (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
      }}>
      <Text style={{marginBottom: 5}}>No Machine Found</Text>
      <CButton title={'Add New Machine Type'} onPress={() => console.log('')} />
    </View>
  );
  return (
    <View
      style={{
        display: 'flex',
        // alignItems: 'start',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
      }}>
      {data.category.value.length === 0 ? (
        emptyMachineType()
      ) : (
        <Text>Machine Found</Text>
      )}
    </View>
  );
}

export default Dashboard;
