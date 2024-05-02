import React from 'react';
import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';

const StartPage = () => {
  return <Redirect href="/exercises" />
};

export default StartPage;