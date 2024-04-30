import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
const tracker = () => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>New Routine</Text>

      <Pressable style = {styles.button}>
        <Text style = {styles.text}>+ Add Exercise</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    
    gap: 10,
  },
  headerText:{
    color: 'white',
    backgroundColor: 'black',
    fontSize: 32,
    fontWeight: 'bold'
  },
  text:{
    color: 'white',
    fontSize: 20
  },
  button:{
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
  }
})
export default tracker;