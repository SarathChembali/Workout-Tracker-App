import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import graphqlClient from "../graphqlClient";
import { useAuth } from '../providers/AuthContext';
import SetListItem from './SetListItem';
import ProgressGraph from './ProgressGraph';
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
                  ListHeaderComponent={() => (
                    <>
                      <ListHeaderComponent />
                      <ProgressGraph sets = {data.sets.documents} />
                    </>
                  )}
                  renderItem={({item}) => <SetListItem set = {item}/>}
        />
      

    )
}



export default SetsList;