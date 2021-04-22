import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Linking,
  TextInput,
} from 'react-native';

import { fonts, colors } from '../../../../styles';
import { Button } from '../../../../components';
import CountdownCircle from '../../../../components/CountdownCircle';

const game = {
  rememberTime: 2,
  answerTime: 3,
  del: 3,
  loop: 3,
};
const MindGamePage = ({ questions, gameState, saveResults, startGame }) => {
  const [gState, setGState] = useState(Array(gameState.del).fill(' '));
  const [answer, setAnswer] = useState({});
  const [answerSet, setAnswerSet] = useState(Array(gameState.del).fill(' '));
  const [answerScreen, setAnswerScreen] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);
  const [timerIndex, setTimerndex] = useState(0);
  const [refAns, setRefAns] = React.useState(0);

  useEffect(() => {
    return () => {
      console.log('end game :>> ');
    };
  }, []);

  useEffect(() => {
    if (!answerScreen && !!questions[questionNo]) {
      setGState(questions[questionNo]['question']);
      setAnswerSet(Array(gameState.del).fill(' '));
    } else {
      setGState(Array(gameState.del).fill(' '));
    }
  }, [answerScreen, questionNo]);

  const onComplete = () => {
    setRefAns(0);
    if (questionNo < questions.length) {
      if (answerScreen) {
        setQuestionNo(questionNo + 1);
        setAnswerScreen(!answerScreen);
        setTimerndex(timerIndex + 1);
      } else {
        setAnswerScreen(!answerScreen);
        setTimerndex(timerIndex + 1);
        // Result page
      }
    } else {
      makeResult();
    }
  };
  const onChange = number => {
    let answerRow = answerSet;

    if (number === 'Del') {
      answerRow[refAns] = '';
      setRefAns(refAns > 0 ? refAns - 1 : 0);
    } else if (gameState.del > refAns) {
      answerRow[refAns] = number;
      setRefAns(refAns + 1);
    }
    setAnswer({ ...answer, [questionNo]: answerRow });
    setAnswerSet(answerRow);
  };

  const makeResult = () => {
    saveResults(answer);
  };
  return (
    <ImageBackground
      source={require('../../../../../assets/images/background.png')}
      style={styles.container}
    >
      <View style={styles.statusBox}>
        {/* <Text style={styles.availableText}>Loader</Text> */}
        {/* <CountdownCircle
          timer={parseInt(18)}
          // onComplete={onComplete}
          size={40}
        /> */}
        <CountdownCircle
          index={parseInt(timerIndex || 0)}
          timer={
            !answerScreen
              ? parseInt(gameState.rememberTime || 0)
              : parseInt(gameState.answerTime || 0)
          }
          onComplete={onComplete}
          size={40}
        />
      </View>
      <View style={styles.nameBox}>
        <Text style={styles.availableText}>
          {!answerScreen ? 'Remember' : 'Answer'}
        </Text>
      </View>

      <View style={styles.questionBox}>
        <View style={styles.center}>
          {!answerScreen
            ? gState.map((question, index) => {
                return (
                  <Text
                    style={{ ...styles.availableText, ...styles.qBox }}
                    key={'questionNo' + index}
                  >
                    {question}
                  </Text>
                );
              })
            : answerSet &&
              answerSet.length > 0 &&
              answerSet.map((question, index) => {
                return (
                  <Text
                    style={{ ...styles.availableText, ...styles.qBox }}
                    key={'questionNo' + index}
                  >
                    {question}
                  </Text>
                );
              })}
        </View>
      </View>
      <View style={styles.actionsBox}>
        <Button
          small
          secondary
          rounded
          style={styles.button}
          caption="Prev"
          onPress={() => startGame('game')}
        />
        <Button
          small
          secondary
          rounded
          style={styles.button}
          caption="Next"
          onPress={() => startGame('game')}
        />
      </View>
      <View style={styles.answerBoxWraper}>
        {!!answerScreen &&
          [
            [1, 2, 3, 'Del'],
            [4, 5, 6, 0],
            [7, 8, 9, 7],
          ].map((row, i) => {
            return (
              <View key={'btn' + i} style={styles.answerBox}>
                {row.map((val, n) => {
                  return (
                    <Button
                      key={'btn' + n}
                      large
                      secondary
                      // rounded
                      style={styles.button}
                      onPress={() => onChange(val)}
                    >
                      <Text style={styles.availableText}>
                        {val && val.toString()}
                      </Text>
                    </Button>
                  );
                })}
              </View>
            );
          })}
      </View>

      {/* <View style={styles.buttonsContainer}>
        <Button
          large
          secondary
          rounded
          style={styles.button}
          caption="Play Now"
          onPress={() => startGame('game')}
        />
      </View> */}
    </ImageBackground>
  );
};

export default MindGamePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  statusBox: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  answerBoxWraper: {
    flex: 0.7,
    flexDirection: 'column',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qBox: {
    fontSize: 24,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#423423',
  },

  answerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  actionsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
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
});
