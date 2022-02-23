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
    <div id="app">
      <div
        id="app-background"
        className={classNames({ searching: state.searching })}
      >
        <div id="app-background-image" style={getBackgroundStyles()} />
        <div id="app-background-image-filter" />
      </div>
      <SearchBar />
      {memoizedSearchResults}
    </div>
  );
}
