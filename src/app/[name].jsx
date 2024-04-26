import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from '../../assets/data/exercises.json';
import {Stack} from 'expo-router';
import { useState } from "react";
import { gql } from "graphql-request";
import { useQuery } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import NewSetInput from "../components/NewSetInput";
import SetsList from "../components/SetsList";

const exerciseQuery = gql`
query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }
`;

export default function ExerciseDetailsScreen(){
    const { name } = useLocalSearchParams();
    const { data, isLoading, error } = useQuery({
        queryKey: ['exercises', name],
        queryFn: () => graphqlClient.request(exerciseQuery, { name }),
    });

    const [IsExpanded, setExpanded] = useState(false);

    if(isLoading){
        return <ActivityIndicator />;
    }
    if(error){
        <Text>Failed to load instructions!</Text>
    }

    

    const exercise = data.exercises[0];

    if (!exercise){
        return <Text>Exercise not found</Text>;
    }
        
    

    return(
    <View style = {styles.mainContainer}>
        <View style = {styles.container}>
            <Stack.Screen options={{title: exercise.name}}/>
            <SetsList
                exerciseName = {exercise.name}
                ListHeaderComponent = {() => (
                    <View style = {{gap: 10}}>
                    <View style = {styles.panel}>
                        <Text style = {styles.exerciseName}> {exercise.name}</Text>
                        <Text style = {styles.exerciseMuscle}> 
                        <Text style = {styles.subValue}>{exercise.muscle}</Text> | <Text style = {styles.subValue}>{exercise.equipment}</Text>
                        </Text>
                    </View>
                    <View style = {styles.panel}>
                        <Text style={styles.exerciseInstructions} numberOfLines={IsExpanded ? 0 : 3}>{exercise.instructions}</Text>
                        <Text onPress={()=> setExpanded(!IsExpanded)} style={styles.seeMore}>
                        {IsExpanded ? 'See Less':'See More'}
                        </Text>
                    </View>
                    
                    <NewSetInput exerciseName = {exercise.name} />
                    </View>
                )}
            />
            
            
        </View>
        
    </View>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: 'black',
    },
    container:{
        
        backgroundColor: 'black',
        padding: 10,
    },
     exerciseName:{
       fontSize: 20,
       fontWeight: 'bold',
       color: 'white',
     },
     exerciseMuscle:{
       color: 'ghostwhite',
     },
     subValue:{
         textTransform: 'capitalize',
     },
     exerciseInstructions:{
        color: 'paleturquoise',
        fontSize: 16,
        lineHeight: 22,
        padding: 10,
     },
     panel:{
        padding: 10,
        borderWidth:1,
        borderRadius: 10,
        borderBottomColor: 'antiquewhite',
     },
     seeMore:{
        alignSelf: 'center',
        color: 'dodgerblue',
        fontWeight: 'bold',
     }
 });
   