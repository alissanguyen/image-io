import { Icon } from "./icons";
import { Interaction } from "./interaction";
import { RequestStatus } from "./request";
import {
  IUnsplashPhoto,
  UnsplashPhotoCollectionID,
  UnsplashPhotoRepository
} from "./unsplash";

export interface ISearchBarSass {
  emoji: Icon | null;
  statement: string;
}

export const defaultSass = (): ISearchBarSass => ({
  emoji: null,
  statement: ""
});

export interface IAppState {
  background: IUnsplashPhoto;
  collectionID: UnsplashPhotoCollectionID | null;
  interaction: Interaction;
  previousQuery: string;
  query: string;
  results: IUnsplashPhoto[];
  searching: boolean;
  status: RequestStatus;
}

export const defaultAppState = (): IAppState => ({
  background: UnsplashPhotoRepository.randomOne(1, "animals"),
  collectionID: null,
  interaction: Interaction.Unknown,
  previousQuery: "",
  query: "",
  results: [],
  searching: false,
  status: RequestStatus.Idle
});
