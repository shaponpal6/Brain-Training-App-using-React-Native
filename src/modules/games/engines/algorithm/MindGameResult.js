import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Linking,
  ScrollView,
  TextInput,
} from 'react-native';
import { List } from 'react-native-paper';
import _ from 'lodash';

import { fonts, colors } from '../../../../styles';
import { Button } from '../../../../components';

const game = {
  rememberTime: 2,
  answerTime: 3,
  del: 3,
  loop: 3,
};

const MCQResult = ({ questions, result, resetGame, score }) => {
  console.log('result :>> ', result);
  // Check answer
  const checkStatus = (questionID, rowId, value) => {
    console.log('questionID, rowId, value :>> ', questionID, rowId, value);
    if (_.isEmpty(result) || value === '') return false;
    if (!result[questionID]) return false;
    if (!result[questionID][rowId]) return false;
    return result[questionID][rowId] === value;
  };

  return (
    <ImageBackground
      source={require('../../../../../assets/images/background.png')}
      style={styles.container}
    >
      <View style={styles.nameBox}>
        <Text style={styles.availableText}>Result</Text>
      </View>

      <View style={styles.resultBox}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <View key={'q' + index} style={styles.row}>
                  <Text style={styles.textInput}>{index + 1}</Text>
                  {question['answer'].length > 0 &&
                    question['answer'].map((row, index2) => {
                      let status = checkStatus(index, index2, row);
                      return (
                        <Text
                          key={'r' + index2}
                          style={{
                            ...styles.textInput,
                            color: status ? 'green' : 'red',
                          }}
                        >
                          {row ?? ''}
                        </Text>
                      );
                    })}
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.center}>
          <Text style={styles.textInput}>Score: {score}</Text>
        </View>
      </View>

      <View style={styles.actionsBox}>
        <Button
          large
          secondary
          rounded
          style={styles.button}
          caption="Play Again"
          onPress={resetGame}
        />
      </View>
    </ImageBackground>
  );
};

export default MCQResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  nameBox: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  resultBox: {
    flex: 0.8,
    flexDirection: 'column',
  },
  actionsBox: {
    flex: 0.1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    // backgroundColor: '#423423',
    // marginVertical: 3,
    marginHorizontal: 8,
    padding: 3,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.primaryRegular,
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
