import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { useMutation } from '@tanstack/react-query';
import graphqlClient from "../graphqlClient";

const addSetMutation = gql`
mutation insertSet($newSet: NewSet!) {
    insertSet(document: $newSet,
          dataSource: "Cluster0",
            database: "workouts",
          collection:"sets"
          ) {
      insertedId
    }
  }
`


const NewSetInput = ({ exerciseName }) => {
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const { mutate, error, isError, isPending } = useMutation({
        mutationFn: (newSet) => graphqlClient.request(addSetMutation, { newSet }),
    });

    const addSet = () => {
        console.warn('Add Set:', reps, weight);
        mutate({
            exercise: exerciseName,
            reps: Number.parseInt(reps),
            weight: Number.parseFloat(weight)
        });
        setReps('');
        setWeight('');
    };

    return(
        <View style ={styles.container}>

        
            <View style = {styles.row}>
            
                <TextInput value={reps} onChangeText={setReps} placeholder="Reps" placeholderTextColor="gray" style = {styles.input} keyboardType="numeric"/>
                <TextInput value={weight} onChangeText={setWeight} placeholder="Weight" placeholderTextColor="gray" style = {styles.input} keyboardType="numeric"/>
                <Button title={isPending ? "Adding...": "Add"} onPress={addSet}/>
            </View>
            {isError && <Text style = {{color: 'red'}}>Failed to add set!</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        
    },
    input:{
        color: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'white',
        borderRadius: 10,
        padding: 5,
        flex:1,
    },
    row:{
        flexDirection: 'row',
        marginVertical: 10,
        gap: 10,
    }
})
export default NewSetInput;