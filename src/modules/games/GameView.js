import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { makeMathQuestions } from './core/MathQuestions';
import { makeRandomNumberQuestions } from './core/RememberNumberQuestions';
import { Button } from '../../components';
import { setGameState, setGameQuestions, setGameResults } from './store';
import IntroPage from './engines/IntroPage';
import MindGameEngine from './engines/mindGame/MindGameEngine';
import MindGameResult from './engines/mindGame/MindGameResult';
import MCQGameEngine from './engines/mcqGame/MCQGameEngine';
import MCQGameResult from './engines/mcqGame/MCQGameResult';

export default function GameView(props) {
  // console.log('props :>> ', props);
  const params = props.route.params;
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState('intro');
  const [result, setResult] = useState({});
  const [score, setScore] = useState({});
  const [localGameState, setLocalGameState] = useState({});
  const [gameType, setGameType] = useState('');

  // Set Game State
  useEffect(() => {
    props.navigation.setOptions({
      // hideHeader: false,
      headerShown: false,
    });
    // props.navigation.canGoBack(e => {
    //   console.log('Exit Game :>> ', e);
    // });
    if (params && params['gameState']) {
      //props.setGameState(params.gameState);
    }
    // setLocalGameState(getGameStage(props.gameState));
    setLocalGameState(params.gameState);
    setGameType(params.gameState.gameType || '');
    setGameState(params.gameState);

    return () => setLocalGameState({});
  }, []);

  const changeGameStage = type => {
    setPage(type);
  };

  const makeQuestions = () => {
    const del = localGameState.del || 1;
    const loop = localGameState.loop || 1;
    let newQuestions = [];
    if (gameType === 'mindGame') {
      newQuestions = makeRandomNumberQuestions(del, loop);
    } else if (gameType === 'mathGame') {
      newQuestions = makeMathQuestions(del, loop);
    }
    setQuestions(newQuestions);
    props.setGameQuestions(newQuestions);
  };
  const startGame = page => {
    setPage(page);
    // props.setGameState({ gamePage: page });
  };

  const saveResults = results => {
    // makeMCQScore(question, results);
    setResult(results);

    // const score = results.filter(result => result.status).length;
    let score = 0;
    if (gameType === 'mindGame') {
      console.log('results :>> ', results);
      console.log('results :>> ', questions);
      score = questions
        .map(
          (q, i) =>
            q['answer'].filter(
              (r, n) => !!results[i] && !!results[i][n] && results[i][n] === r,
            ).length,
        )
        .reduce((a, b) => a + b, 0);
    } else if (gameType === 'mathGame') {
      score = Object.entries(results).filter(item => item[1]['status']).length;
    }
    setScore(score);
    setPage('result');
    setGameResults(score);
    //props.setGameResults(makeMCQScore(score));
  };
  const resetGame = () => {
    setQuestions([]);
    props.setGameQuestions([]);
    startGame('intro');
  };

  if (gameType === 'mathGame') {
    return (
      <>
        {page === 'intro' && (
          <IntroPage
            makeQuestions={makeQuestions}
            startGame={startGame}
            gameState={localGameState}
          />
        )}
        {page === 'game' && (
          <MCQGameEngine
            questions={questions}
            gameState={localGameState}
            saveResults={saveResults}
          />
        )}
        {page === 'result' && (
          <MCQGameResult
            questions={questions}
            resetGame={resetGame}
            gameState={localGameState}
            result={result}
            score={score}
          />
        )}
      </>
    );
  }

  if (gameType === 'mindGame') {
    return (
      <>
        {page === 'intro' && (
          <IntroPage
            makeQuestions={makeQuestions}
            startGame={startGame}
            gameState={localGameState}
          />
        )}
        {page === 'game' && (
          <MindGameEngine
            questions={questions}
            gameState={localGameState}
            saveResults={saveResults}
            makeQuestions={makeQuestions}
            startGame={startGame}
          />
        )}
        {page === 'result' && (
          <MindGameResult
            questions={questions}
            resetGame={resetGame}
            gameState={localGameState}
            result={result}
            score={score}
          />
        )}
      </>
    );
  }

  return (
    <View>
      <Text>Loading.....</Text>
    </View>
  );
}

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
});
