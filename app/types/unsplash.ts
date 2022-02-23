import axios from "axios";
import { _collectionIDs } from "~/constants";
import { _all, _animals, _architecture, _coffee, _food, _nature } from "~/data";

export type UnsplashPhotoCollectionID =
  | "animals"
  | "architecture"
  | "coffee"
  | "food"
  | "nature"
  | string;

export interface IUnsplashPhotoUrls {
  full: string;
  regular: string;
  small: string;
  thumbnail: string;
}

export interface IUnsplashCreator {
  name: string;
  link: string;
  photo: string;
}

export interface IUnsplashPhoto {
  color: string;
  creator: IUnsplashCreator;
  id: string;
  urls: IUnsplashPhotoUrls;
}

const _fetchPhoto = async () => {
  const photoID = "M02b4akol-c";

  const res = await axios.get(
    `https://api.unsplash.com/photos/${photoID}?client_id=`
  );

  const photo = mapPhoto(res.data);

  console.log(photo);
};

const _fetchPhotos = async () => {
  // cats: 139386
  const collectionID = "583204";

  const res = await axios.get(
    `https://api.unsplash.com/photos/random?collections=${collectionID}&count=30&content_filter=high`
  );

  const photos = res.data.map((item: any) => mapPhoto(item));

  console.log(photos);
};

function _randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function _randomCollection(_query?: string) {
  const query = _query ? _query.trim().toLowerCase() : "animals";
  const match = _collectionIDs.find((id) => id === query);

  return match || _collectionIDs[_randomNumber(0, 4)];
}

const mapPhoto = (item: any) => ({
  color: item.color,
  creator: {
    name: item.user.name,
    link: item.user.links.html,
    photo: item.user.profile_image.small
  },
  height: item.height,
  id: item.id,
  urls: {
    full: item.urls.full,
    regular: item.urls.regular,
    small: item.urls.small,
    thumbnail: item.urls.thumb
  },
  width: item.width
});

export const UnsplashPhotoRepository = {
  all: _all,
  animals: _animals,
  architecture: _architecture,
  coffee: _coffee,
  food: _food,
  nature: _nature,
  random: _random,
  randomCollection: _randomCollection,
  randomOne: _randomOne
};

function _random(_quantity: number, _collection: string): IUnsplashPhoto[] {
  const quantity = _quantity ? Math.min(_quantity, 30) : 1,
    collection: UnsplashPhotoCollectionID | string =
      _collection === "random" ? _randomCollection() : _collection || "all";

  let repo: IUnsplashPhoto[] = [...UnsplashPhotoRepository[collection]];

  let photos: IUnsplashPhoto[] = [];

  for (let i = 0; i < quantity; i++) {
    const rand = _randomNumber(0, repo.length - 1);

    photos.push(repo[rand]);

    repo.splice(rand, 1);
  }

  return photos;
}

function _randomOne(_quantity: number, _collection: string): IUnsplashPhoto {
  const quantity = _quantity ? Math.min(_quantity, 30) : 1,
    collection: UnsplashPhotoCollectionID =
      _collection === "random" ? _randomCollection() : _collection || "all";

  let repo: IUnsplashPhoto[] = [...UnsplashPhotoRepository[collection]];

  let photos: IUnsplashPhoto[] = [];

  for (let i = 0; i < quantity; i++) {
    const rand = _randomNumber(0, repo.length - 1);

    photos.push(repo[rand]);

    repo.splice(rand, 1);
  }

  return photos[0];
}
