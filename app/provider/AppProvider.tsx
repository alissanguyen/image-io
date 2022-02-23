import React from "react";
import { defaultAppState, IAppState } from "~/types/defaults";
import { Interaction } from "~/types/interaction";
import { RequestStatus } from "~/types/request";
import {
  UnsplashPhotoCollectionID,
  UnsplashPhotoRepository
} from "~/types/unsplash";

export interface IAppContext {
  state: IAppState;
  setInteractionTo: (interaction: Interaction) => void;
  setStateTo: (state: IAppState) => void;
}

export const AppContext = React.createContext<IAppContext | undefined>(
  undefined
);

export const useAppContext = (): IAppContext => {
  const contextValue = React.useContext(AppContext);

  if (!contextValue) {
    throw new Error(
      "You are trying to use useAppContext without rendering a AppContext.Provider somewhere above this component in the component tree."
    );
  }

  return contextValue;
};

export const AppContextProvider: React.FC = (props) => {
  const [state, setStateTo] = React.useState<IAppState>(defaultAppState());

  /* -- Example search -- */
  React.useEffect(() => {
    const query: string = "Search something...",
      collectionID: UnsplashPhotoCollectionID | string =
        UnsplashPhotoRepository.randomCollection();

    setStateTo({ ...state, query, status: RequestStatus.Loading });

    setTimeout(() => {
      setStateTo({
        ...state,
        interaction: Interaction.Unknown,
        query,
        previousQuery: query,
        results: UnsplashPhotoRepository.random(30, collectionID),
        searching: true,
        status: RequestStatus.Success
      });
    }, 500);
  }, []);

  const setInteractionTo = (interaction: Interaction): void => {
    setStateTo({ ...state, interaction });
  };

  const value: IAppContext = {
    state,
    setInteractionTo,
    setStateTo
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
