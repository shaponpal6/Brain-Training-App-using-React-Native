import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { colors, fonts } from '../../styles';
import { Button } from '../../components';

import ButtonImageBg from '../../components/ButtonImageBG';
const buttonBG = require('../../../assets/button/button-bg2.png');

export default function ChooseGameView(props) {
  const [games, setGames] = useState([]);
  const params = props.route.params;

  useEffect(() => {
    if (params && params.gameType && params.gameType.category) {
      const cat = params.gameType.category;
      if (props.levels && props.levels[cat]) {
        setGames(props.levels[cat]);
      }
    }
    return () => {
      setGames([]);
    };
  }, []);

  const playGame = gameState => {
    console.log('Play gameState :>>>>> ', gameState);
    props.navigation.navigate('Play Game', {
      gameState,
    });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <LottieView
          source={require('../../animation/loading-bubble.json')}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          autoPlay
          loop
        />
        <View style={styles.wraper}>
          {games.length > 0 &&
            games.map((gameState, i) => {
              return (
                <ButtonImageBg
                  key={'choose' + i}
                  style={styles.itemTwoContainer}
                  onPress={() => playGame(gameState)}
                  image={buttonBG}
                  title={gameState.level && gameState.level.toString()}
                />
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
  },
  wraper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
    padding: 10,
  },
  bgImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: -20,
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 24,
    marginVertical: 3,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  blogItem: {
    width: '31%',
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
});
