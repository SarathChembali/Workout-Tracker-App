import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, TextInput } from 'react-native';
import ExerciseListItem from '../../components/ExerciseListItem';
import {useQuery, useInfiniteQuery} from '@tanstack/react-query';
import { request,gql } from 'graphql-request';
import client from '../../graphqlClient';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthContext';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Picker } from '@react-native-picker/picker';

const muscleGroups = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  'triceps',
];


const url = 'https://sitiomarino.us-east-a.ibm.stepzen.net/api/chest-exercises/graphql';
const exercisesQuery = gql`
query exercises($muscle: String, $name: String, $offset: Int) {
  exercises(muscle: $muscle, name: $name, offset: $offset) {
    name
    muscle 
    equipment
  }
}
`;

export default function ExercisesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorState, setErrorState] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery.trim(), 500);

  const {data, isLoading, error, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['exercises', selectedMuscle],
    queryFn: ({ pageParam }) => client.request(exercisesQuery, {offset: pageParam, muscle: selectedMuscle}),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length * 10,

    });

    const { username } = useAuth();
    
    const loadMore = () => {
      if (isFetchingNextPage){
        return;
      }
      fetchNextPage();
    }
  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch exercises!</Text>
  }
  if(!username){
    return <Redirect href= {'/auth'} />;
  }


  const handleMuscleSelect = (muscle) => {
    setSelectedMuscle(muscle);
  }


  const exercises = data?.pages.flatMap((page) => page.exercises);
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const filteredExercises = exercises.filter((exercise) => {
    const { name, muscle } = exercise;
    const queryLowerCase = searchQuery.toLowerCase();
    return (
      name.toString().toLowerCase().includes(queryLowerCase) ||
      muscle.toLowerCase().includes(queryLowerCase)
    );
  });



  return (
    <View style={styles.container}>
      
      <Text style = {{color: 'white'}}>Logged in as: {username}</Text>
      
      <View style = {styles.searchContainer}>
        <TextInput 
            style = {styles.searchInput}
            placeholder="Search for exercises..."
            placeholderTextColor='gray'
            value = {searchQuery}
            onChangeText={(query) => handleSearch(query)}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Filter by Muscle Group:</Text>
        <Picker
          style = {styles.picker}
          selectedValue={selectedMuscle}
          onValueChange={(itemValue) => handleMuscleSelect(itemValue)}>
          <Picker.Item label="All Muscles" value="" />
          {muscleGroups.map((muscle, index) => (
            <Picker.Item key={index} label={muscle} value={muscle} />
          ))}
        </Picker>
      </View>


      <FlatList 
        data = {filteredExercises}
        contentContainerStyle={{gap: 5}}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item})=><ExerciseListItem item = {item}/>}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
        contentInsetAdjustmentBehavior='automatic'
      />
      
      <StatusBar style = "auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer:{
    
    padding: 10,
    gap: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  searchInput:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    gap: 10,
    width: '80%',
    alignItems: 'center',
    color: 'white',
  },
  dropdownContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownLabel:{
    marginRight: 10,
    color: 'white',
  },
  picker: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 10,
  }

});
