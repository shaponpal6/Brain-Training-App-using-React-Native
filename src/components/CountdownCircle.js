import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import PropTypes from 'prop-types';

const CountdownCircle = ({ index, timer, onComplete, size, strokeWidth }) => {
  // const [key, setKey] = useState(0);
  // const [isPause, setIsPause] = useState(false);
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        key={index}
        isPlaying
        onComplete={() => onComplete()}
        duration={timer}
        // initialRemainingTime={15}
        size={size}
        strokeWidth={strokeWidth}
        rotation="counterclockwise"
        colors={[
          ['#004777', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor }}>
            {remainingTime > 0 ? remainingTime : '0'}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
};

CountdownCircle.propTypes = {};

export default CountdownCircle;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // paddingTop: 10,
    // marginTop: 40,
    // backgroundColor: "#ecf0f1",
    padding: 2,
  },
  remainingTime: {
    fontSize: 46,
  },
});
