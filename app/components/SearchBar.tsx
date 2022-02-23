import classNames from "classnames";
import * as React from "react";
import { useAppContext } from "~/provider/AppProvider";
import { defaultAppState } from "~/types/defaults";
import { Icon } from "~/types/icons";
import { Interaction } from "~/types/interaction";
import { RequestStatus } from "~/types/request";
import {
  IUnsplashPhoto,
  UnsplashPhotoCollectionID,
  UnsplashPhotoRepository
} from "~/types/unsplash";
import SearchBarSass from "./SearchBarSass";
import { FiRotateCw } from "react-icons/fi";

interface Props {}

const SearchBar: React.FC<Props> = ({}) => {
  const { state, setInteractionTo, setStateTo } = useAppContext();

  const ref: React.RefObject<HTMLInputElement> =
    React.useRef<HTMLInputElement>(null);

  const focused: boolean =
      state.interaction !== Interaction.Unknown &&
      state.interaction !== Interaction.Leaving,
    querying: boolean = state.query !== "";

  const simulateSearch = (
    collectionID: UnsplashPhotoCollectionID
  ): Promise<IUnsplashPhoto[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(UnsplashPhotoRepository.random(30, collectionID));
      }, 800);
    });
  };

  const handleOnSearch = async (): Promise<void> => {
    if (state.query.trim() === "") {
      return;
    } else if (state.query.trim() === state.previousQuery.trim()) {
      setInteractionTo(Interaction.Duplicate);
    } else if (state.status !== RequestStatus.Loading) {
      setStateTo({
        ...state,
        results: [],
        status: RequestStatus.Loading
      });

      const collectionID: UnsplashPhotoCollectionID =
          UnsplashPhotoRepository.randomCollection(state.query),
        matches: boolean = state.query.trim().toLowerCase() === collectionID,
        interaction: Interaction = matches
          ? Interaction.CorrectQuery
          : Interaction.Initiated;

      const results: IUnsplashPhoto[] = await simulateSearch(collectionID);

      setStateTo({
        ...state,
        collectionID,
        interaction,
        previousQuery: state.query.trim(),
        results,
        searching: true,
        status: RequestStatus.Success
      });
    }
  };

  const handleOnBlur = (): void => {
    setInteractionTo(Interaction.Leaving);
  };

  const handleOnChange = (query: string): void => {
    setStateTo({
      ...state,
      interaction: Interaction.Typing,
      query
    });
  };

  const handleOnFocus = (): void => {
    if (state.interaction === Interaction.Leaving) {
      setInteractionTo(Interaction.Returning);
    } else {
      setInteractionTo(Interaction.Initiated);
    }
  };
  const handleOnKeyDown = (e: any): void => {
    if (e.key === "Enter") {
      handleOnSearch();
    }
  };

  const getClicker = () => {
    if (!focused && !state.searching) {
      const handleOnClick = (): void => {
        if (ref.current) {
          ref.current.focus();
        }
      };

      return <div id="search-bar-clicker" onClick={handleOnClick} />;
    }
  };

  const getResetButton = () => {
    if (state.searching) {
      const handleOnReset = (): void => {
        setStateTo(defaultAppState());
      };

      return (
        <button
          id="search-bar-reset-button"
          type="button"
          onClick={handleOnReset}
          className="text-white"
        >
          <script
            src="https://kit.fontawesome.com/aa319776fa.js"
            crossOrigin="anonymous"
          ></script>
          <FiRotateCw className="text-white" />
        </button>
      );
    }
  };
  return (
    <div
      id="search-bar-aligner"
      className={classNames({ focused, querying, searching: state.searching })}
    >
      <div id="search-bar-wrapper">
        <div id="search-bar">
          {getClicker()}
          <i id="search-bar-logo" className={Icon.Search} />
          <input
            autoComplete="off"
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            id="search-bar-input"
            placeholder="Search"
            ref={ref}
            type="text"
            value={state.query}
            onChange={(e: any) => handleOnChange(e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
          {getResetButton()}
        </div>
        <SearchBarSass />
      </div>
    </div>
  );
};

export default SearchBar;
