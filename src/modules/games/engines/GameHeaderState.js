import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CountdownCircle from '../../../components/CountdownCircle';

import { fonts, colors } from '../../../styles';

const GameHeaderState = ({ index, onComplete, timer }) => {
  const [page, setPage] = useState('makeQuestion');

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../../../assets/images/RNS_nerd.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Deo</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Text style={styles.name}>Time</Text>
        <CountdownCircle
          index={index}
          timer={timer}
          onComplete={onComplete}
          strokeWidth="4"
          size={40}
        />
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../../../assets/images/RNS_nerd.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Deo</Text>
      </View>
    </View>
  );
};

export default GameHeaderState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#423423',
    borderWidth: 1,
    maxHeight: 100,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  name: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 20,
    marginVertical: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
});
