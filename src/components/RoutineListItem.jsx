import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
const RoutineListItem = ({ routine }) =>{
    
    
    return(
        <Link href = {`/users/${routine}`} asChild>
        <Pressable style = {styles.container}>
            <Text style = {styles.routineText}>
                    {routine}
            </Text>
        </Pressable>
        </Link>
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
export default RoutineListItem;