import React from "react";
import SearchResults from "~/components/SearchResults";
import classNames from "classnames";
import SearchBar from "~/components/SearchBar";
import { useAppContext } from "~/provider/AppProvider";

export default function App() {
  const { state } = useAppContext();

  const getBackgroundStyles = (): React.CSSProperties => ({
    backgroundColor: state.background.color,
    backgroundImage: `url(${state.background.urls.regular}), url(${state.background.urls.small})`
  });

  const memoizedSearchResults = React.useMemo(
    () => <SearchResults results={state.results} />,
    [state.results]
  );
  return (
    <div className="app overflow-hidden">
      <div
        className={`app-background h-screen left-0 opacity-40 fixed top-0 w-screen z-[1] ${classNames(
          { searching: state.searching }
        )}`}
      >
        <div className="app-background-image relative h-full w-full bg-center bg-no-repeat bg-cover z-[1]" style={getBackgroundStyles()} />
        <div className="app-background-image-filter h-full w-full left-0 absolute top-0 z-[2]" />
      </div>
      <SearchBar />
      {memoizedSearchResults}
    </div>
  );
}
