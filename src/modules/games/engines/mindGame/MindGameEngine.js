import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Dimensions,
  Linking,
  TextInput,
} from 'react-native';

import { fonts, colors } from '../../../../styles';
import { Button } from '../../../../components';
import CountdownCircle from '../../../../components/CountdownCircle';
import GameHeaderState from '../GameHeaderState';

const game = {
  rememberTime: 2,
  answerTime: 3,
  del: 3,
  loop: 3,
};
const screen = Dimensions.get('window');
const buttonWidth = screen.width / 3 - 20;
const buttonHeight = Math.floor(buttonWidth - 20);

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
    // if (timerIndex > 0) return;

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

    if (gameState.del > refAns) {
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
        <GameHeaderState
          index={parseInt(timerIndex || 0)}
          onComplete={onComplete}
          timer={
            !answerScreen
              ? parseInt(gameState.rememberTime || 0)
              : parseInt(gameState.answerTime || 0)
          }
        />
      </View>

      <View style={styles.questionBox}>
        <View style={styles.nameBox}>
          <Text style={styles.availableText}>
            {!answerScreen ? 'Remember' : 'Answer'}
          </Text>
        </View>
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
      <View style={styles.answerBoxWraper}>
        {!!answerScreen &&
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ].map((row, i) => {
            return (
              <View key={'btn' + i} style={styles.answerBox}>
                {row.map((val, n) => {
                  return (
                    <TouchableHighlight
                      key={'btn' + n}
                      onPress={() => onChange(val)}
                      style={styles.button}
                    >
                      <Text style={styles.availableText}>
                        {val && val.toString()}
                      </Text>
                    </TouchableHighlight>
                  );
                })}
              </View>
            );
          })}
        {!!answerScreen && (
          <View style={styles.answerBox}>
            <TouchableHighlight
              onPress={() => onChange('0')}
              style={{ ...styles.button, width: buttonWidth * 3 + 40 }}
            >
              <Text style={styles.availableText}>0</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
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
  questionBox: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  answerBoxWraper: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  answerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qBbox: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 20,
    marginVertical: 3,
    backgroundColor: '#423',
    margin: 11,
    padding: 11,
    borderRadius: 4,
    borderWidth: 3,
  },
  button: {
    width: buttonWidth,
    // height: buttonHeight,
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginVertical: 3,
    backgroundColor: '#423',
    margin: 10,
    // padding: 11,
    borderRadius: 4,
    borderWidth: 3,
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
});
