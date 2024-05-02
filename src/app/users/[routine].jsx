import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { Link } from 'expo-router';
import graphqlClient from '../../graphqlClient';
import { gql } from "graphql-request";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../providers/AuthContext';
import ShowExercises from '../../components/ShowExercisesInRoutine';
import { useLocalSearchParams, Stack } from "expo-router";
const exercisesInRoutineQuery = gql`
query showExercisesInRoutine($routineName: String!, $username: String!) {
  showExercisesInRoutine(routineName: $routineName, username: $username) {
    documents {
      routineName
      exercise
    }
  }
}
`

const ShowRoutineExercises = () => {
  const {routine} = useLocalSearchParams();
  const {username} = useAuth();
  console.log(routine);
  const {data, isLoading} = useQuery({
    queryKey: ['showExercisesInRoutine', routine],
    queryFn: () => graphqlClient.request(exercisesInRoutineQuery, {routineName: routine, username})
  });
  if(isLoading){
    return <ActivityIndicator/>;
  }
  console.log(data.showExercisesInRoutine.documents);
  return (
    <View style = {styles.container}>
      <Stack.Screen options={{title: routine}}/>
      <Text style = {styles.headerText}>New Routine</Text>

      <Pressable style = {styles.button}>
        <Text style = {styles.text}>+ Add Exercise</Text>
      </Pressable>
      <FlatList 
        data = {data.showExercisesInRoutine.documents}
        contentContainerStyle = {{gap: 5}}
        renderItem={({item}) => <ShowExercises routine = {item}/>}
      />

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
export default ShowRoutineExercises;