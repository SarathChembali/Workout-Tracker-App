import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import graphqlClient from "../../graphqlClient";
import { useAuth } from '../../providers/AuthContext';
import RoutineListItem from '../../components/RoutineListItem';

const routineQuery = gql`
query routines($username: String!) {
  routines(username: $username) {
    documents {
      routineName
      exercise
      _id
    }
  }
}
`

const tracker = () => {
  const {username} = useAuth();
  const {data, isLoading} = useQuery({
    queryKey: ['routines'],
    queryFn: () => graphqlClient.request(routineQuery, {username})
  });

  const [uniqueRoutineNames, setUniqueRoutineNames] = useState([]);
  useEffect(() => {
    if (!isLoading && data) {
      const uniqueNames = [...new Set(data.routines.documents.map(item => item.routineName))];
      setUniqueRoutineNames(uniqueNames);
    }
  }, [data, isLoading]);


  if(isLoading){
    return <ActivityIndicator/>
  }
  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>My Routines</Text>
        <Text style = {styles.text}>+ Create New Routine</Text>
      
      <FlatList 
        data = {uniqueRoutineNames}
        contentContainerStyle = {{gap: 5}}
        renderItem={({item}) => <RoutineListItem routine = {item}/>}
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
export default tracker;