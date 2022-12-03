/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ListItem, Text} from '@react-native-material/core';
// import {useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {useAppSelector} from '../store/store';
import {RootState} from '../store/rootReducer';
import CButton from '../component/button';

function Dashboard({navigation}: any) {
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
      <CButton
        title={'Add New Machine Type'}
        onPress={() => {
          navigation.navigate('EditScreen', {
            action: 'add',
            type: 'category',
            title: 'Manage Category',
            labelButton: 'Add New Category',
          });
        }}
      />
    </View>
  );
  return (
    <ScrollView>
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
          <View>
            {data.category.value.map((category: any) => (
              <View key={category.uid}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <Text style={{fontSize: 12}}>{category.name}</Text>
                  <CButton
                    title={'Add item'}
                    onPress={() => {
                      navigation.navigate('EditMachine', {
                        category: category,
                        title: 'Add Machine',
                      });
                    }}
                  />
                </View>

                {data.machine.value
                  .filter((machine: any) => machine.category === category.uid)
                  .map((machine: any) => (
                    <View key={machine.uid}>
                      <ListItem
                        title={machine.name}
                        onPress={() => {
                          navigation.navigate('EditScreen', {
                            title: 'Edit Machine',
                          });
                        }}
                      />
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Dashboard;
