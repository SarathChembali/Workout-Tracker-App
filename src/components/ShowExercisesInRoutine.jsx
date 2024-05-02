import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ShowExercises = ({ routine }) =>{

    return(
        <View style = {styles.container}>
            <Text style = {styles.routineText}>
                {routine.exercise} 
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#0a021c'
    },
    routineText:{
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
export default ShowExercises;