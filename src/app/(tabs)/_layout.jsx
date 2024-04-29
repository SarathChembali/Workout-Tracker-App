import { Tabs } from 'expo-router';

export default () => {
    return (
        <Tabs>
            <Tabs.Screen 
                name="exercises" 
                options={{title: 'Exercises', headerShown: false}} 
            />
            <Tabs.Screen name="tracker" />
        </Tabs>
    )
}