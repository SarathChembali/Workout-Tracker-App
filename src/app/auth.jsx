import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import { Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../providers/AuthContext';

const AuthScreen = () => {
    const [localUsername, setLocalUsername] = useState('');
    const {setUsername, username} = useAuth();
    const onSignIn = () => {
        setUsername(localUsername);
    }
    if(username){
        return <Redirect href={'/'}/>
    }
    return(
        <View style = {styles.page}>
            <Stack.Screen options = {{title: 'Sign In'}} />
            <Text style = {styles.label}>Login with your Username</Text>
            <TextInput 
                value = {localUsername}
                onChangeText={setLocalUsername}
                placeholder='Username'
                placeholderTextColor="gray"
                style = {styles.input}
            />
            <Button title="Sign In" onPress={onSignIn}/>
        </View>
    )
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'black',
        gap: 10,
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,

    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding:10,
        color: 'white'
    }
})

export default AuthScreen;