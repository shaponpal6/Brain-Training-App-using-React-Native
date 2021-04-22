import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
import { getGameScore } from '../score';

export default function App() {
  const [gameState, setGameState] = useState([
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ]);

  useEffect(() => {
    const gameScore = getGameScore();
    window.setInterval(() => {
      if (gameScore._W && Object.keys(gameScore._W).length > 0) {
        setGameState(
          gameScore._W.map((row, i) => {
            return {
              quarter: i,
              earnings: row.top || 0,
            };
          }),
        );
      }
    }, 10000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.level}>My Score</Text>
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Mind', 'Math', 'Memory', 'Reading']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x / 1000}`} />
        <VictoryBar data={gameState} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 80,
  },
  level: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
