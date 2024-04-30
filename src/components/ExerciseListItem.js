import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function ExerciseListItem({item}){
    return(
    <Link href = {`/${item.name}`} asChild>
      <Pressable style = {styles.exerciseContainer}>
          <Text style = {styles.exerciseName}> {item.name}</Text>
          <Text style = {styles.exerciseMuscle}> 
            <Text style = {styles.subValue}>{item.muscle}</Text> | <Text style = {styles.subValue}>{item.equipment}</Text>
          </Text>
      </Pressable>
      </Link>
    );
  }
  
const styles = StyleSheet.create({
   exerciseContainer:{
      backgroundColor: "black",
      padding: 10,
      width: 320,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth:1,
      gap:5,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
	  height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
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
    }
});
  