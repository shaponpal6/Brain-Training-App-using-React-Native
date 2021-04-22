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
import { colors, fonts } from '../styles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const buttonBG = require('../../assets/button/button-bg1.png');

export default function ButtonImageBg(props) {
  return (
    <TouchableOpacity
      // key={props.key}
      style={styles.container}
      onPress={props.onPress}
    >
      <View style={styles.wraper}>
        <Image style={styles.imageBg} source={props.image} />
        {/* <Image style={styles.imageBg} source={{ uri: item.image }} /> */}
        {/* <View style={styles.content} /> */}
        <Text style={styles.title}>{props.title}</Text>
        {/* <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text> */}
        {/* <Text style={styles.itemTwoPrice}>{item.price}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    width: windowWidth,
    // paddingBottom: 10,
    // backgroundColor: 'white',
    // marginVertical: 5,
    // marginHorizontal: 10,
    // borderRadius: 22,
    marginBottom: 33,
  },
  wraper: {
    width: windowWidth,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBg: {
    width: windowWidth,
    height: 110,
    position: 'absolute',
  },
  content: {},
  title: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 30,
  },
});
