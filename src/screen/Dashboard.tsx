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
  if (data.category.value.length === 0) {
    return (
      <View
        style={{
          display: 'flex',
          // alignItems: 'start',
          justifyContent: 'center',
          flexDirection: 'column',
          flex: 1,
        }}>
        {emptyMachineType()}
      </View>
    );
  }
  return (
    <ScrollView>
      <View>
        {data.category.value.map((category: any) => (
          <View key={category.uid}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View>
                <Text style={{fontSize: 20}}>{category.name}</Text>
              </View>
              <View>
                <CButton
                  title={'Add item'}
                  onPress={() => {
                    navigation.navigate('EditMachine', {
                      category: category,
                      action: 'add',
                      title: 'Add Machine',
                    });
                  }}
                />
              </View>
            </View>

            {data.machine.value
              .filter((machine: any) => machine.category === category.uid)
              .map((machine: any) => (
                <View key={machine.uid}>
                  <ListItem
                    title={machine.uid}
                    onPress={() => {
                      navigation.navigate('EditMachine', {
                        title: 'Edit Machine',
                        action: 'edit',
                        machine: machine,
                        category: category,
                      });
                    }}
                  />
                </View>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default Dashboard;
