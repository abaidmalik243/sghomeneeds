import { generateText } from '../../utils/loremIpsumGenerator';
import Home from '../../images/HomePage/home.jpg';
import Carpenter from '../../images/HomePage/carpenter.jpg';
import HandyMan from '../../images/HomePage/handyman.jpg';
import PestControl from '../../images/HomePage/pest-control.jpg';
import AirConditioner from '../../images/HomePage/air-conditioner.jpg';

import homeProject2 from '../../images/18505_Bedroom-.jpg';

import Tammy from '../../images/Placeholder/profile.png';

export const categories = [
  {
    text: 'Home',
    imageSource: Home,
    key: 'Home',
    backgroundColor: '#fff',
  },
  {
    text: 'Carpenters',
    imageSource: Carpenter,
    key: 'Carpenters',
    backgroundColor: '#fff',
  },
  {
    text: 'Handyman',
    imageSource: HandyMan,
    key: 'HandyMan',
    backgroundColor: '#fff',
  },
  {
    text: 'Pest Control',
    imageSource: PestControl,
    key: 'Pest Control',
    backgroundColor: '#fff',
  },
  {
    text: 'Air Conditioner',
    imageSource: AirConditioner,
    key: 'Air Conditioner',
    backgroundColor: '#fff',
  },
];

export const howItWorks = [
  {
    imageSource: 'http://via.placeholder.com/100x100',
    step: '1',
    text: generateText(100),
    key: '1',
  },
  {
    imageSource: 'http://via.placeholder.com/100x100',
    step: '2',
    text: generateText(100),
    key: '2',
  },
  {
    imageSource: 'http://via.placeholder.com/100x100',
    step: '3',
    text: generateText(100),
    key: '3',
  },
];
export const homeProjects = [
  {
    imageSource: homeProject2,
    title: `Quee's Close`,
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    key: `Quee's Close`,
  },
  {
    imageSource: homeProject2,
    title: `Serangoon Avenue 4`,
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    key: 'Interior Design',
  },
  {
    imageSource: homeProject2,
    title: `Serangoon Avenue 4`,
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    key: 'Serangoon Avenue 4',
  },
];

export const differenceList = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    key: '11',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    key: '12',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    key: '13',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    key: '14',
  },
];
export const clientReviews = [
  {
    imageSource: Tammy,
    name: 'Tammy Perry',
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry1',
  },
  {
    imageSource: Tammy,
    name: 'Tammy Perry',
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry2',
  },
  {
    imageSource: Tammy,
    name: 'Tammy Perry',
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry3',
  },
];

export const articles = [
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry4',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry5',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry6',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry7',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry8',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry9',
  },
];
