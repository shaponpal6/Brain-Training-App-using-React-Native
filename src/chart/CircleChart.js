import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryPolarAxis,
  VictoryStack,
  VictoryLabel,
  Circle,
} from 'victory-native';

import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GAME_STATE } from '../Constant';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_STATE);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    return {};
  }
};

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const directions = {
  0: 'Mind',
  45: 'Math',
  90: 'Reading',
  135: 'Writing',
  180: 'Memory',
  225: 'Precision',
  270: 'Habit',
  315: 'Task',
};

const orange = { base: 'gold', highlight: 'darkOrange' };

const red = { base: 'tomato', highlight: 'orangeRed' };

const innerRadius = 30;

class CompassCenter extends React.Component {
  render() {
    const { origin } = this.props;
    const circleStyle = {
      stroke: red.base,
      strokeWidth: 2,
      fill: orange.base,
    };
    return (
      <Circle cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle} />
    );
  }
}

class CenterLabel extends React.Component {
  render() {
    const { datum, active, color } = this.props;
    const text = [`${directions[datum._x]}`, `${Math.round(datum._y1)} mph`];
    const baseStyle = { fill: color.highlight, textAnchor: 'middle' };
    const style = [
      { ...baseStyle, fontSize: 18, fontWeight: 'bold' },
      { ...baseStyle, fontSize: 12 },
    ];

    return active ? (
      <VictoryLabel text={text} style={style} x={175} y={175} renderInPortal />
    ) : null;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wind: this.getChartData(),
      gameState: {},
      loading: true,
      chart: 'current',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(GAME_STATE).then(value => {
      try {
        this.setState({
          gameState: value != null ? JSON.parse(value) : {},
          loading: false,
        });
      } catch (e) {}
    });
    this.getWindData();
  }

  makeGameChart(game) {
    console.log('state222>>>>>', game);
    return _.keys(game).map(d => {
      const speed = Math.floor(_.random() * 17) + 4;
      return {
        windSpeed: speed,
        windGust: speed + _.random(2, 10),
        windBearing: +d,
      };
    });
  }

  async getChartData() {
    // if ((this.state.chart = 'current')) {
    // } else {
    // }

    let game = await getData();

    console.log('state>>>>>', game);
    return _.keys(directions).map(d => {
      const speed = Math.floor(_.random() * 17) + 4;
      return {
        windSpeed: speed,
        windGust: speed + _.random(2, 10),
        windBearing: +d,
      };
    });
  }
  getWindData() {
    // this.setStateInterval = window.setInterval(() => {
    // if (!this.state.loading) {
    console.log('state :>> ', this.state);
    this.setState({ wind: this.getChartData() });
    // }
    // }, 9000);
  }
  getWindData2() {
    return _.keys(directions).map(d => {
      const speed = Math.floor(_.random() * 17) + 4;
      return {
        windSpeed: speed,
        windGust: speed + _.random(2, 10),
        windBearing: +d,
      };
    });
  }

  render() {
    return (
      <VictoryChart
        polar
        animate={{ duration: 500, onLoad: { duration: 500 } }}
        theme={VictoryTheme.material}
        innerRadius={innerRadius}
        domainPadding={{ y: 10 }}
        events={[
          {
            childName: 'all',
            target: 'data',
            eventHandlers: {
              onMouseOver: () => {
                return [
                  { target: 'labels', mutation: () => ({ active: true }) },
                  { target: 'data', mutation: () => ({ active: true }) },
                ];
              },
              onMouseOut: () => {
                return [
                  { target: 'labels', mutation: () => ({ active: false }) },
                  { target: 'data', mutation: () => ({ active: false }) },
                ];
              },
            },
          },
        ]}
      >
        <VictoryPolarAxis
          dependentAxis
          labelPlacement="vertical"
          style={{ axis: { stroke: 'none' } }}
          tickFormat={() => ''}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={_.keys(directions).map(k => +k)}
          tickFormat={_.values(directions)}
        />
        <VictoryStack>
          <VictoryBar
            style={{
              data: {
                fill: ({ active }) => (active ? orange.highlight : orange.base),
                width: 40,
              },
            }}
            data={this.state.wind}
            x="windBearing"
            y="windSpeed"
            labels={() => ''}
            labelComponent={<CenterLabel color={orange} />}
          />
          <VictoryBar
            style={{
              data: {
                fill: (d, a) => (a ? red.highlight : red.base),
                width: 40,
              },
            }}
            data={this.state.wind}
            x="windBearing"
            y={d => d.windGust - d.windSpeed}
            labels={() => ''}
            labelComponent={<CenterLabel color={red} />}
          />
        </VictoryStack>
        <CompassCenter />
      </VictoryChart>
    );
  }
}
