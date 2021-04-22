// import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState = {
  // isLoading: true,
  // name: 'Mind Game',
  gameType: '',
  gameID: '',
  // gamePage: 'intro',
  // level: 'Level 1',
  // del: 3,
  // loop: 3,
  // initLoop: 0,
  // screen: 'remember',
  // rememberTime: 2,
  // answerTime: 3,
  // pettern: [],
  // questions: [
  //   [1, 3, 4],
  //   [3, 4, 2],
  //   [9, 0, 8],
  // ],
  // answerSheet: [],
  // power: 1,
  // pointable: 1,
  // scores: [],
  results: {},
  // mount: true,
  // status: 'prepare',
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@braintix_game');
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    // error reading value
    return {};
  }
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    // saving error
  }
};

// Actions
const SET_GAME_STATE = 'SET_GAME_STATE';
const SET_GAME_QUESTION = 'SET_GAME_QUESTION';
const SET_GAME_RESULT = 'SET_GAME_RESULT';

// Action creators
export function setGameState(gameState) {
  return dispatch => {
    dispatch({ type: SET_GAME_STATE, data: gameState });
  };
}
export function setGameQuestions(newQuestions) {
  return dispatch => {
    dispatch({ type: SET_GAME_QUESTION, data: newQuestions });
  };
}
export function setGameResults(gameResults) {
  return dispatch => {
    dispatch({ type: SET_GAME_RESULT, data: gameResults });
  };
}

const demoGameState = {
  name: 'App Name',
  gameType: 'gameType1',
  gameId: 'gameId1',
  results: {
    gameType1: {
      gameID1: {
        score: 8,
        outOf: 10,
      },
      gameID1: {
        score: 8,
        outOf: 10,
      },
    },
    gameType2: {
      gameID1: {
        score: 8,
        outOf: 10,
      },
      gameID1: {
        score: 8,
        outOf: 10,
      },
    },
  },
};

// Reducer
export default function GameStateReducer(state = initialState, action = {}) {
  // console.log('<<<<<<<<<<<<<Final state :>>>>>>>>> ', state);
  switch (action.type) {
    case SET_GAME_STATE:
      return Object.assign({}, state, {
        ...action.data,
      });
    case SET_GAME_QUESTION:
      return Object.assign({}, state, {
        isLoading: false,
        questions: action.data,
      });
    case SET_GAME_RESULT:
      if (!state.gameType || !state.gameID) {
        // console.log('<<<<Game Type and id not defined :>> ');
        return state;
      }
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          [state.gameType]: Object.assign(
            {},
            Object.keys(state.results).length > 0 &&
              state.results.hasOwnProperty(state.gameType)
              ? state.results[state.gameType]
              : {},
            {
              [state.gameID]: action.data,
            },
          ),
        }),
      });
    default:
      return state;
  }
}
