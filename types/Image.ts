import Breed from './Breed';
import Category from './Category';

export default interface Image {
  id: string;
  url: string;
  categories: Array<Category> | undefined;
  breeds: Array<Breed> | undefined;
}
