import {View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import React from 'react';
import graphqlClient from '../graphqlClient';
import { gql } from "graphql-request";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../providers/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const EditExerciseInRoutine = gql`
mutation EditMutation($exercise: String!, $routineName: String!, $username: String!, $updatedExercise: String!) {
  updateExercise(
    exercise: $exercise
    routineName: $routineName
    username: $username
    updatedExercise: $updatedExercise
  ) {
    matchedCount
    modifiedCount
  }
}
`
const deleteExerciseInRoutine = gql`
mutation deleteExercise($exercise: String!, $routineName: String!, $username: String!) {
    deleteExercise(
      exercise: $exercise
      routineName: $routineName
      username: $username
    ) {
      deletedCount
    }
  }
`



const ShowExercises = ({ routine, handleRefresh }) =>{
    const [exercise, newExercise] = useState(routine.exercise);
    const {username} = useAuth();
    const routineName = routine.routineName;
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    
    

    const { mutate: updateMutation, error: updateError, isError: isUpdateError, isPending: isUpdatePending } = useMutation({
        mutationFn: ({exercise, routineName, username, updatedExercise}) => graphqlClient.request(EditExerciseInRoutine, {exercise, routineName, username, updatedExercise}),
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['showExercisesInRoutine', routine]});
            newExercise(updatedExercise);
            
        }
    })
    const { mutate: deleteMutation, error: deleteError, isError: isDeleteError, isPending: isDeletePending } = useMutation({
        mutationFn: ({exercise, routineName, username}) => graphqlClient.request(deleteExerciseInRoutine, {exercise, routineName, username}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['showExercisesInRoutine', routine]});

        }
    })
    const handleUpdate = () => {
            console.log(exercise);
            console.log(routine.exercise)
            updateMutation({
                exercise: routine.exercise,
                routineName: routineName,
                username: username,
                updatedExercise: exercise
            });
            console.log(updateError);
        setIsEditing(false);
    }
    const handleDelete = async () => {
        try {
            await deleteMutation({
                exercise: routine.exercise,
                routineName: routineName,
                username: username
            });
            handleRefresh();
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    }
    return (
        <View style = {styles.container}>
            <View style = {styles.row}>
            {isEditing ? (
                <TextInput 
                    style = {styles.input}
                    value = {exercise}
                    onChangeText={newExercise}
                />
            ):(
                <Text style = {styles.routineText}>
                    {exercise}
                </Text>
            )}
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                <Text style={styles.button}>
                {isEditing ? "Cancel" : "Update"}
                </Text>
            </TouchableOpacity>

            {isEditing ? (
                <TouchableOpacity onPress={handleUpdate}>
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            ):(
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.button}>{isDeletePending ? "Deleting...": "Delete"}</Text>
                </TouchableOpacity>
            )}
            </View>
        </View>
      );
}
const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#0a021c'
    },
    row:{
        flexDirection: 'row',
    },
    routineText:{
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 16,
        width: 200,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      button: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#4b0082',
      },
});
export default ShowExercises;