import { Stack } from 'expo-router';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import AuthContextProvider from '../providers/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const client = new QueryClient();

export default function RootLayout(){
    return(
        <GestureHandlerRootView style = {{flex:1 }}>
            <AuthContextProvider>
                <QueryClientProvider client = {client}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options= {{headerShown: false}} />
                    </Stack>
                </QueryClientProvider>
            </AuthContextProvider>
        </GestureHandlerRootView>
    )
}