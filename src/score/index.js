import AsyncStorage from '@react-native-async-storage/async-storage';
import { GAME_STATE } from '../Constant';

export const getGameState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_STATE);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    return {};
  }
};

export async function getGameScore() {
  const db = await getGameState();
  return (
    db['results'] &&
    Object.keys(db['results']).map(score => {
      return {
        id: score,
        top: Object.keys(db['results'][score])
          .map(row => +db['results'][score][row]['top'])
          .reduce((a, b) => a + b, 0),
        point: Object.keys(db['results'][score])
          .map(row => +db['results'][score][row]['score'])
          .reduce((a, b) => a + b, 0),
      };
    })
  );
}
