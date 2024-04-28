import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const idToDate = (id) => {
  const timeStamp = parseInt(id.substr(0, 8), 16) * 1000;
  return new Date(timeStamp);
};

const ProgressGraph = ({ sets = [] }) => {

  const sortedSets = sets.sort((a, b) => idToDate(b._id) - idToDate(a._id));
  const recentSets = sortedSets.slice(0, 5);
  const points = recentSets.map((set) => ({
    label: idToDate(set._id).toLocaleDateString(),
    value: set.reps * set.weight,
  }));

  const data = {
    labels: points.map((point) => point.label),
    datasets: [
      {
        data: points.map((point) => point.value),
      },
    ],
  };
  
  

  const maxValueSet = recentSets.reduce((maxSet, set) => {
    const currentValue = set.reps * set.weight;
    const maxValue = maxSet ? maxSet.reps * maxSet.weight : 0;
    return currentValue > maxValue ? set : maxSet;
  }, null);

  const maxValue = maxValueSet ? maxValueSet.reps * maxValueSet.weight : 0;
  const maxReps = maxValueSet ? maxValueSet.reps : 0;
  const maxWeight = maxValueSet ? maxValueSet.weight : 0;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    barRadius: 5
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'gray', fontWeight: 'bold' }}>Progress Graph: Most Recent Sets</Text>
      <Text style={{ color: 'gray', fontWeight: 'bold' }}>Your Personal Record : {maxValue} kg, {maxReps} reps x {maxWeight} kg</Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 30}
        height={220}
        yAxisSuffix=' kg'
        chartConfig={chartConfig}
        verticalLabelRotation={45}
        withHorizontalLabels= {true}
        withVerticalLabels = {false}
        showBarTops= {true}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    height: 240,
  },
});

export default ProgressGraph;