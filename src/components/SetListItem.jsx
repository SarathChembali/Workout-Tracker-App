import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
const SetListItem = ({ set }) =>{

    const timeStamp = parseInt(set._id.substr(0,8),16)*1000;
    const createdAt = new Date(timeStamp)

    return(
        <View style = {styles.container}>
            <Text style = {styles.setsText}>
                    {set.reps} x {set.weight}
            </Text>
            <Text style = {styles.timeText}> {formatDistanceToNow(createdAt)} ago</Text>
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
    setsText:{
        color: 'white',
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timeText:{
        marginHorizontal: 20,
        color: 'gray',
        justifyContent: 'center',
        marginBottom: 5,
    }
});
export default SetListItem;