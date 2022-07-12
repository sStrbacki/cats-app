import Image from './Image';

export default interface Favourite {
  id: string | number;
  image_id: string;
  sub_id: string | undefined;
  created_at: string | undefined;
  image: Image;
}
