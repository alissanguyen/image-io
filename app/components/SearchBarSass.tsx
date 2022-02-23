import classNames from "classnames";
import * as React from "react";
import { useAppContext } from "~/provider/AppProvider";
import { defaultSass, ISearchBarSass } from "~/types/defaults";
import { Interaction } from "~/types/interaction";
import { RequestStatus } from "~/types/request";
import { InteractionUtility, NumberUtility } from "~/utils/random";

interface Props {}

const SearchBarSass: React.FC<Props> = ({}) => {
  const { state } = useAppContext();
  const [sass, setSassTo] = React.useState<ISearchBarSass>(defaultSass());

  React.useEffect(() => {
    setSassTo(InteractionUtility.determineSass(state));
  }, [state]);

  const getIconWrapperClasses = (): string => {
    const emoji: boolean =
      state.interaction !== Interaction.Unknown &&
      state.status !== RequestStatus.Loading;

    const typing: boolean = state.interaction === Interaction.Typing;

    return classNames({ emoji, typing });
  };

  const getIconClasses = (): string => {
    return classNames(sass.emoji, {
      "spin-animation": state.status === RequestStatus.Loading
    });
  };
  return (
    <div id="search-bar-sass">
      <div id="search-bar-sass-icon" className={getIconWrapperClasses()}>
        <i key={NumberUtility.random(1, 10000)} className={getIconClasses()} />
      </div>
      <h1 key={NumberUtility.random(1, 10000)} id="search-bar-sass-statement">
        {sass.statement}
      </h1>
    </div>
  );
};

export default SearchBarSass;
