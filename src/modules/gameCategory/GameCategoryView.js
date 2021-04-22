import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { colors, fonts } from '../../styles';
import ButtonImageBg from '../../components/ButtonImageBG';
const buttonBG = require('../../../assets/button/button-bg1.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const chartIcon = require('../../../assets/images/pages/chart.png');
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const chatIcon = require('../../../assets/images/pages/chat.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const profileIcon = require('../../../assets/images/pages/profile.png');
const loginIcon = require('../../../assets/images/pages/login.png');
const blogIcon = require('../../../assets/images/pages/blog.png');

export default function GameCategoryView(props) {
  // console.log('gameCategory :>> ', props.categories);

  const _openGameLevels = gameType => {
    props.navigation.navigate('Choose Game', {
      gameType,
    });
  };

  const renderGameCategory = item => (
    <ButtonImageBg
      key={item.id}
      style={styles.itemTwoContainer}
      onPress={() => _openGameLevels(item)}
      image={buttonBG}
      title={item.title}
    />
  );
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../animation/loading-bubble.json')}
        style={{ width: '100%', position: 'absolute' }}
        autoPlay
        loop
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.wraper}>
          {props.categories &&
            props.categories.length &&
            props.categories.map((item, index) => {
              return renderGameCategory(item);
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth,
  },
  wraper: {
    width: windowWidth,
    // flex: 1,
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
    // flex: 1,
    // backgroundColor: colors.white,
    // padding: 10,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
    // width: '100%',
  },
  itemTwoContainer: {
    width: windowWidth,
    paddingBottom: 10,
    // backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 22,
  },
  itemTwoContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    // height: 70,
  },
  itemTwoTitle: {
    // width: '100%',
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 40,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    // width: '100%',
    width: windowWidth,
    height: 100,
    position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // backgroundColor: '#6271da',
    // opacity: 0.5,
  },
});
