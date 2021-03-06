import React from 'react';
// import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text } from 'react-native';

import { colors } from '../styles';

class RNSDropDown extends React.Component {
  static defaultProps = {
    placeholder: 'Please Select...',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({ isOpened: true });
  };

  _closeModal = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      borderColor,
      selectedIndex,
      placeholder,
    } = this.props;
    return (
      <View>
        <Text>Mode Dropdown</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
};

export default RNSDropDown;
