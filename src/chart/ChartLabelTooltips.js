import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from 'victory-native';

import { getGameScore } from '../score';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function App() {
  const [gameState, setGameState] = useState([
    { x: 1, y: 9, label: ['first', 'label'] },
    { x: 2, y: 4, label: ['second', 'label'] },
    { x: 3, y: 3, label: ['first', 'label'] },
    { x: 4, y: 4, label: ['second', 'label'] },
    { x: 7, y: 2, label: ['third', 'final'] },
  ]);

  useEffect(() => {
    const gameScore = getGameScore();
    window.setInterval(() => {
      if (gameScore._W && Object.keys(gameScore._W).length > 0) {
        setGameState(
          gameScore._W.map((row, i) => {
            return {
              x: i,
              y: row.top || 0,
              label: [row.id || 'Level', row.top || 10],
            };
          }),
        );
      }
    }, 10000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.level}>My Performance</Text>
      <VictoryBar
        polar
        data={gameState}
        style={{
          data: {
            width: 40,
            backgroundColor: 'transparent',
            fill: '#1565c0',
          },
        }}
        labelComponent={
          <VictoryTooltip
            active
            labelPlacement="perpendicular"
            pointerLength={10}
            pointerWidth={10}
            flyoutPadding={10}
            labelComponent={
              <VictoryLabel
                verticalAnchor="end"
                dy={10}
                backgroundStyle={{ fill: 'transparent' }}
                backgroundPadding={4}
              />
            }
          />
        }
      />
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
