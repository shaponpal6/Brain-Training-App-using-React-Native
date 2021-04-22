// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import GameView from './GameView';
import { setGameState, setGameQuestions, setGameResults } from './GameState';

// App Actions
const sss = {
  navigation: {
    addListener: '',
    canGoBack: '',
    closeDrawer: '',
    dangerouslyGetParent: '',
    dangerouslyGetState: '',
    dispatch: '',
    goBack: '',
    isFocused: '',
    jumpTo: '',
    navigate: '',
    openDrawer: '',
    pop: '',
    popToTop: '',
    push: '',
    removeListener: '',
    replace: '',
    reset: '',
    setOptions: '',
    setParams: '',
    toggleDrawer: '',
  },
  route: {
    key: 'Auth-cQdGW5FZc1LKssh1Jz7Ep',
    name: 'Auth',
    params: 'undefined',
  },
};

export default compose(
  connect(
    state => ({
      isLoading: state.games.isLoading,
      gameState: state.games,
    }),
    dispatch => ({
      setGameState: gState => dispatch(setGameState(gState)),
      setGameQuestions: questions => dispatch(setGameQuestions(questions)),
      setGameResults: results => dispatch(setGameResults(results)),
    }),
  ),
  lifecycle({
    componentDidMount() {
      // this.props.loadImages();
    },
  }),
)(GameView);
