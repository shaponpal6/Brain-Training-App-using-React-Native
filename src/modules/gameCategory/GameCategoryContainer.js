// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import GameCategoryView from './GameCategoryView';

const gameCategory = [
  {
    id: 1,
    category: 'mindGame',
    brand: 'Citizen',
    title: 'Mind Game',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  },
  {
    id: 2,
    category: 'mathGame',
    brand: 'Weeknight',
    title: 'Math Game',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-26549.jpg',
  },
  {
    id: 3,
    category: 'mindGame',
    brand: 'Mad Perry',
    title: 'Child Game',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-30360.jpg',
  },
  {
    id: 4,
    category: 'mindGame',
    brand: 'Citizen',
    title: 'Algorithm game',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: 'green',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-37839.jpg',
  },
  {
    id: 5,
    category: 'mindGame',
    brand: 'Weeknight',
    title: 'MCQ Test',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-69212.jpg',
  },
  {
    id: 6,
    category: 'mindGame',
    brand: 'Mad Perry',
    title: 'My Task',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'https://reactnativestarter.com/demo/images/pexels-photo-108061.jpg',
  },
];

export default compose(
  connect(state => ({
    isLoading: false,
    games: state.games,
    categories: gameCategory,
  })),
)(GameCategoryView);
