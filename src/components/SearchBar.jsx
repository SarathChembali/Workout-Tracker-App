import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    <View style = {styles.searchContainer}>
            <View style={styles.searchBar}>
              <Image source = {require('./ic_search_24px.PNG')} style = {styles.searchIcon}/>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for products..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <Image source = {require('./search_filter_circle_white.PNG')} style = {styles.filterIcon}/>
            </View>
    </View>
}

const styles = StyleSheet.create({
    searchBar: {
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        width: '50%'
    },
    searchInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 2,
        width: '80%',
        marginLeft: 40,
    
    },
    searchContainer:{
        alignItems:'center',
        width: '100%'
    },
    searchIcon:{
        width: 25,
        height:25,
        position: 'absolute',
      },
      filterIcon:{
         width: 40,
         height:40,
         marginLeft:10,
      }
})

export default SearchBar;