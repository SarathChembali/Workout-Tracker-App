import {View, Text, StyleSheet, Pressable, TextInput, Button} from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import graphQlClient from '../graphqlClient';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/AuthContext';

const addExerciseMutation = gql`
mutation insertExercise($newExercise: NewExercise!) {
    insertExercise(
      collection: "routines",
      database: "workouts",
      dataSource: "Cluster0",
      document: $newExercise
    ) {
      insertedId
    }
  }
`

const NewExerciseInput = ({ routineName }) =>{
    const [exercise, setExercise] = useState('');
    const {username} = useAuth();
    const queryClient = useQueryClient();
    const { mutate, error, isError, isPending} = useMutation({
        mutationFn: (newExercise) => graphQlClient.request(addExerciseMutation, { newExercise }),
        onSuccess:() => {
            setExercise('');
            queryClient.invalidateQueries({ queryKey: ['showExercisesInRoutine', routineName]});
        }
    });
    const addExercise = () => {
        const newExercise = {
            username,
            routineName: routineName,
            exercise: exercise
        }
        mutate(newExercise);
    }
    return(
        
        <View style = {styles.container}>
            <TextInput value={exercise} onChangeText={setExercise} placeholder='Add An Exercise' placeholderTextColor="gray" style= {styles.routineText} />
            <Button title={isPending ? "Adding...": "Add"} onPress={addExercise}/>
        </View>
       
    )
}
const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#0a021c',
        flexDirection: 'row'
    },
    routineText:{
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 16,
        width: 235
    }
});
export default NewExerciseInput;