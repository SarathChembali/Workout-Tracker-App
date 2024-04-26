import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import graphqlClient from "../graphqlClient";
import { useAuth } from '../providers/AuthContext';
const setsQuery = gql`
query sets($exercise: String!, $username: String!) {
  sets(exercise: $exercise, username: $username) {
    documents {
      _id
      exercise
      reps
      weight
    }
  }
}
`

const SetsList = ({ListHeaderComponent, exerciseName}) => {
    const {username} = useAuth();
    const {data, isLoading} = useQuery({
        queryKey: ['sets', exerciseName],
        queryFn: () => graphqlClient.request(setsQuery, {exercise: exerciseName, username})
    });

    if(isLoading){
        return <ActivityIndicator/>;
    }
    return (
      
        <FlatList data = {data.sets.documents} 
                  ListHeaderComponent={ListHeaderComponent}
                  renderItem={({item}) => 
                  (<Text style = {styles.setsText}>
                    {item.reps} x {item.weight}
                </Text>)}
        />
      

    )
}

const styles = StyleSheet.create({
        setsText:{
            color: 'white',
            marginVertical: 5,
            padding:10,
            borderWidth:1,
            borderColor: 'white',
            borderRadius: 5,
            marginHorizontal: 20,
        }
});

export default SetsList;