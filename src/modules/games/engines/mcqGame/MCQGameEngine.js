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
import GameHeaderState from '../GameHeaderState';

const game = {
  rememberTime: 2,
  answerTime: 3,
  del: 3,
  loop: 3,
};

const MCQTest = ({ questions, saveResults, gameState }) => {
  const [playing, setPlaying] = useState(true);
  const [questionNo, setQuestionNo] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [selectKey, setSelectKey] = useState('');
  const answerTime = gameState.answerTime || 0;

  // Constractor Game On/Off
  useEffect(() => {
    if (answerTime > 0 && answerTime <= 60) {
      setPlaying(true);
    }
    return () => setPlaying(false);
  }, []);

  // Change Question after circle complete
  useEffect(() => {
    if (playing && questions[questionNo]) {
      setCurrentQuestion(questions[questionNo]);
      // setSelectKey('');
    }
  }, [questionNo]);

  // Action On Time circle complete
  const onComplete = () => {
    if (!playing) return false;
    if (questionNo < questions.length - 1) {
      setQuestionNo(questionNo + 1);
    } else {
      makeResult();
    }
  };

  // Option Selected
  const onChange = option => {
    if (
      Object.keys(currentQuestion).length < 1 ||
      Object.keys(option).length < 1
    )
      return;
    const key =
      currentQuestion['answer'] && currentQuestion['answer']['key']
        ? currentQuestion['answer']['key']
        : 'k1';
    const key2 = option['key'] && option['key'] !== '' ? option['key'] : 'k2';

    setSelectKey(option['key']);
    setAnswer({
      ...answer,
      [currentQuestion['id']]: {
        // question: currentQuestion['question'],
        // answer: currentQuestion['answer'] && currentQuestion['answer']['text'],
        setAnswer: option['text'],
        key: option['key'],
        status: key === key2 ? true : false,
      },
    });
    onComplete();
  };

  // Save Result
  const makeResult = () => {
    saveResults(answer);
  };

  // Make Option
  const makeOption = option => {
    return (
      <Button
        large
        primary
        rounded
        style={{
          ...styles.button,
          width: '100%',
          // backgroundColor: option.key === selectKey ? 'green' : 'transparent',
        }}
        onPress={() => onChange(option)}
      >
        <Text style={styles.option}>
          {option.text && option.text.toString()}
        </Text>
      </Button>
    );
  };

  return (
    <ImageBackground
      source={require('../../../../../assets/images/background.png')}
      style={styles.container}
    >
      <View style={styles.statusBox}>
        <GameHeaderState
          index={parseInt(questionNo || 0)}
          onComplete={onComplete}
          timer={answerTime}
        />
      </View>

      <View style={styles.questionBox}>
        <View style={styles.nameBox}>
          <Text style={styles.availableText}>Question</Text>
        </View>
        <View style={styles.center}>
          {Object.keys(currentQuestion).length > 0 &&
            currentQuestion['question'] && (
              <Text style={styles.availableText}>
                {currentQuestion.question}
              </Text>
            )}
        </View>
      </View>

      {Object.keys(currentQuestion).length > 0 &&
      currentQuestion['options'] &&
      currentQuestion['options'].length > 0 ? (
        <View style={styles.answerBoxWraper}>
          <View style={styles.answerBox}>
            {currentQuestion.options[0] &&
              makeOption(currentQuestion.options[0])}
            {currentQuestion.options[1] &&
              makeOption(currentQuestion.options[1])}
          </View>
          <View style={styles.answerBox}>
            {currentQuestion.options[2] &&
              makeOption(currentQuestion.options[2])}
            {currentQuestion.options[3] &&
              makeOption(currentQuestion.options[3])}
          </View>
        </View>
      ) : (
        <Text>No Options</Text>
      )}

      {/* <View style={styles.buttonsContainer}>
        <Button
          large
          secondary
          rounded
          style={styles.button}
          caption="Next"
          onPress={onComplete}
        />
      </View> */}
    </ImageBackground>
  );
};

export default MCQTest;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionBox: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 24,
    marginVertical: 3,
    justifyContent: 'center',
  },
  answerBoxWraper: {
    flex: 0.4,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
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
    flexDirection: 'column',
    justifyContent: 'center',
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
