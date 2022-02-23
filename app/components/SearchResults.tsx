import * as React from "react";
import { IUnsplashPhoto } from "~/types/unsplash";
import SearchResult from "./SearchResult";
import YTLinks from "./YTLinks";

interface Props {
  results: IUnsplashPhoto[];
}

const SearchResults: React.FC<Props> = (props) => {
  const getResults = (): JSX.Element[] => {
    return props.results.map((result: IUnsplashPhoto, index: number) => (
      <SearchResult key={result.id} index={index} result={result} />
    ));
  };

  const getYouTubeLinks = () => {
    if (props.results.length > 0) {
      return <YTLinks />;
    }
  };
  return (
    <div id="search-results-wrapper">
      {getYouTubeLinks()}
      <div id="search-results">{getResults()}</div>
    </div>
  );
};

export default SearchResults;
