import { generateText } from '../../../utils/loremIpsumGenerator';
import homeProject2 from '../../../images/alberto-castillo-q-346020-unsplash.jpg';
export const articles = Array.from(Array(4).keys()).map(i => ({
  imageSource: homeProject2,
  alt: i.toString(),
  name: generateText(30),
  key: i.toString(),
}));
