import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';
import { Switch } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';

import { fonts, colors } from '../../../styles';
import { Button, RadioGroup } from '../../../components';

const IntroPage = ({ makeQuestions, startGame, gameState }) => {
  const [page, setPage] = useState('makeQuestion');
  const [gameLevelSelected, setGameLevelSelected] = React.useState(0);
  const [gameLevel, setGameLevel] = React.useState([
    'Simple',
    'Medium',
    'Hard',
  ]);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const playNow = () => {
    if (page === 'makeQuestion') {
      makeQuestions();
      setPage('playNow');
    } else {
      startGame('game');
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/background.png')}
      style={styles.container}
    >
      <Image
        source={require('../../../../assets/images/RNS_nerd.png')}
        style={styles.nerdImage}
      />

      <ProgressCircle
        percent={30}
        radius={50}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"
      >
        <Text style={{ fontSize: 18 }}>{'30%'}</Text>
      </ProgressCircle>

      <View style={styles.textContainer}>
        <Text style={styles.availableText}>Game Point</Text>
      </View>

      <RadioGroup
        style={styles.radio}
        items={gameLevel}
        selectedIndex={gameLevelSelected}
        onChange={index => setGameLevelSelected(index)}
      />

      <View style={styles.radioGroup}></View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.availableText}>Play Game</Text>
        <Text style={styles.availableText}>With</Text>
        <Text style={styles.availableText}>Braintix App</Text>
      </View> */}

      <View style={styles.buttonsContainer}>
        <Button
          large
          secondary
          rounded
          style={styles.button}
          caption={page === 'makeQuestion' ? 'Start' : 'Play Now'}
          onPress={playNow}
        />

        <Button
          large
          bordered
          rounded
          style={styles.button}
          caption="Play Online"
          onPress={() => startGame('game')}
        />
      </View>
    </ImageBackground>
  );
};

export default IntroPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  nerdImage: {
    width: 80,
    height: 80,
  },
  availableText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 40,
    marginVertical: 3,
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
  radioGroup: {
    height: 80,
  },
  radio: {
    marginVertical: 15,
    height: 20,
  },
});
