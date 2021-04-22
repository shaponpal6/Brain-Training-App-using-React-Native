import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import LottieView from 'lottie-react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { Button, RadioGroup, Dropdown } from '../../components';
import ChartLabelTooltips from '../../chart/ChartLabelTooltips';
import BarChart from '../../chart/BarChart';
import CircleChart from '../../chart/CircleChart';

export default function HomeScreen(props, { isExtended, setIsExtended }) {
  // console.log('props :>> ', props);
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <LottieView
          source={require('../../animation/loading-bubble.json')}
          style={{ width: '100%', position: 'absolute' }}
          autoPlay
          loop
        />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.section}>
            <Text size={20} white>
              <ChartLabelTooltips />
            </Text>
          </View>

          <View style={styles.section}>
            <Text size={20} white>
              {/* <CircleChart /> */}
            </Text>
          </View>

          <View style={styles.section}>
            <Text size={20} white>
              <BarChart />
            </Text>
          </View>

          {/* <View style={styles.section}>
          <Text color="#19e7f7" size={15}>
            The smartest Way to improve your Brain
          </Text>
          <Text size={30} bold white style={styles.title}>
            Snaptik Brain Game
          </Text>
        </View> */}

          <View style={[styles.section, styles.sectionLarge]}>
            {/* <Text color="#19e7f7" hCenter size={15} style={styles.description}>
            {' '}
            Snaptik is a powerful App to improve your brain and brain
            improvement scores daily basic.
          </Text> */}
            <View style={styles.priceContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[styles.demoButton, { flexBasis: '60%' }]}
                  secondary
                  rounded
                  caption="Play Now"
                  onPress={() =>
                    props.navigation.navigate('Choose Game Category')
                  }
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[styles.demoButton, { flexBasis: '60%' }]}
                  secondary
                  rounded
                  caption="Online Play"
                  onPress={() => props.navigation.navigate('Online Play')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
