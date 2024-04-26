import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import ExerciseListItem from '../components/ExerciseListItem';
import {useQuery} from '@tanstack/react-query';
import { request,gql } from 'graphql-request';
import client from '../graphqlClient';
import { Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthContext';
const url = 'https://sitiomarino.us-east-a.ibm.stepzen.net/api/chest-exercises/graphql';
const exercisesQuery = gql`
query exercises($muscle: String, $name: String) {
  exercises(muscle: $muscle, name: $name) {
    name
    muscle 
    equipment
  }
}
`;

export default function ExercisesScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises'],
    queryFn: () => client.request(exercisesQuery),
    });

    const { username } = useAuth();

  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch exercises!</Text>
  }
  if(!username){
    return <Redirect href= {'/auth'} />;
  }
  
  return (
    <View style={styles.container}>
      <Text style = {{color: 'white'}}>{username}</Text>
      <FlatList 
        data = {data?.exercises}
        contentContainerStyle={{gap: 5}}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item})=><ExerciseListItem item = {item}/>}
      />
      <StatusBar style = "auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
    
  }
});
