import AsyncStorage from '@react-native-async-storage/async-storage';
import { GAME_STATE } from '../../Constant';

// const GAME_STATE = '@braintix_game';
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_STATE);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    return {};
  }
};
AsyncStorage.getItem(GAME_STATE).then(value => {
  console.log('value :>> >>>>>>', value);
});

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(GAME_STATE, jsonValue);
  } catch (e) {
    // saving error
  }
};
let state = getData();

// Action creators
export async function setGameState(gameStateData) {
  state = await getData();
  let obj = Object.assign({}, state, {
    gameState: Object.assign({}, state.gameState || {}, gameStateData),
  });
  return storeData(obj);
}
export async function setGameQuestions(newQuestions) {
  state = await getData();
  return storeData(
    Object.assign({}, state, {
      isLoading: false,
      questions: newQuestions,
    }),
  );
}
export async function setGameResults(gameResults) {
  state = await getData();
  // Game State
  let gameState = state.gameState || {};
  // Game State Check
  if (Object.keys(gameState).length === 0) return;
  // Check Game ID and Type isset
  if (!gameState.gameType || !gameState.gameID) return;
  // Get Previous Score
  let score = () => {
    if (!state.hasOwnProperty('results')) return 0;

    if (!state.results.hasOwnProperty(gameState.gameType)) return 0;

    if (!state.results[gameState.gameType].hasOwnProperty(gameState.gameID))
      return 0;

    let obj = state.results[gameState.gameType][gameState.gameID];
    let lastResult = {
      lastScore: Math.round((obj['score'] || 0) * 100) / 100 || 0,
      lastTop: Math.round((obj['top'] || 0) * 100) / 100 || 0,
    };
    return lastResult;
  };
  // Make Result
  let { lastScore, lastTop } = score();

  let newScore = Math.round(gameResults * 100) / 100 || 0;
  let point = newScore * (gameState.power || 1);
  let result = {
    score: Math.round((lastScore + point) * 100) / 100 || 0,
    top: lastTop || 0,
    name: gameState.name || 'Test Game',
    level: gameState.level || 'Level 0',
    lastScore: point || 0,
    progress: Math.round(-(point / lastTop) * 100) || 0,
  };
  // Update when current Point is getter then previous
  if (lastTop < point) {
    result['top'] = point || 0;
    result['progress'] = Math.round((lastTop / point) * 100) || 0;
  }
  let obj = Object.assign({}, state, {
    results: Object.assign({}, state.results || {}, {
      [gameState.gameType]: Object.assign(
        {},
        Object.keys(state.results || {}).length > 0 &&
          state.results.hasOwnProperty(gameState.gameType)
          ? state.results[gameState.gameType]
          : {},
        {
          [gameState.gameID]: result,
        },
      ),
    }),
  });
  console.log('save game state :>>> obj >>> ', obj);
  console.log('save game state :>>> Result >>> ', result);
  return storeData(obj);
}
