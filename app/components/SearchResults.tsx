import * as React from "react";
import { IUnsplashPhoto } from "~/types/unsplash";
import SearchResult from "./SearchResult";

interface Props {
  results: IUnsplashPhoto[];
}

const SearchResults: React.FC<Props> = (props) => {
  const getResults = (): JSX.Element[] => {
    return props.results.map((result: IUnsplashPhoto, index: number) => (
      <SearchResult key={result.id} index={index} result={result} />
    ));
  };

  return (
    <div className="search-results-wrapper m-auto relative z-[2] max-w-[1000px] mt-36">
      <div className="search-results">{getResults()}</div>
    </div>
  );
};

export default SearchResults;
