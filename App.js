import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { colors } from './src/styles';

import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';
import LottieView from 'lottie-react-native';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate
          loading={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <View style={styles.container}>
              <ActivityIndicator color={colors.red} />
              <LottieView
                source={require('./src/animation/loading.json')}
                autoPlay
                loop
              />
            </View>
          }
          persistor={persistor}
        >
          <AppView />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
