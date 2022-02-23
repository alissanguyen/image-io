import classNames from "classnames";
import * as React from "react";
import { IUnsplashPhoto } from "~/types/unsplash";
import { NumberUtility } from "~/utils/random";

interface Props {
  index: number;
  result: IUnsplashPhoto;
}

const SearchResult: React.FC<Props> = (props) => {
  const [visible, setVisibleTo] = React.useState<boolean>(false),
    [loaded, setLoadedTo] = React.useState<boolean>(false),
    [size, setSizeTo] = React.useState<number>(0);

  const { result } = props;

  React.useEffect(() => {
    setSizeTo(NumberUtility.random(5, 10));
  }, []);

  React.useEffect(() => {
    if (visible) {
      const preview: HTMLImageElement = new Image();
      preview.src = result.urls.small;

      preview.onload = () => {
        setLoadedTo(true);
      };
    }
  }, [visible]);

  React.useEffect(() => {
    const ms: number = props.index * 50 + NumberUtility.random(0, 50);

    const timeout: NodeJS.Timeout = setTimeout(() => {
      setVisibleTo(true);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const classes: string = classNames("search-result overflow-hidden relative opacity-0", { loaded, visible });

  const photoUrl: string = `https://unsplash.com/photos/${result.id}?utm_source=CodePen&utm_medium=referral`,
    creatorUrl: string = `${result.creator.link}?utm_source=CodePen&utm_medium=referral`;

  const backgroundImage: string = `url(${result.urls.small}), url(${result.urls.thumbnail})`,
    gridRowEnd: string = `span ${size}`;

  return (
    <div className={classes} style={{ gridRowEnd }}>
      <a
        className="search-result-background block h-full w-full opacity-80 bg-center bg-no-repeat bg-cover cursor-pointer"
        href={photoUrl}
        style={{ backgroundColor: result.color, backgroundImage }}
        target="_blank"
      />
      <div className="search-result-info-wrapper items-end hidden h-full w-full absolute top-0 left-0 overflow-hidden pointer-events-none z-[2]">
        <div className="search-result-info flex m-2.5">
          <a
            className="search-result-creator text-white overflow-hidden text-ellipsis whitespace-nowrap"
            href={creatorUrl}
            target="_blank"
          >
            {result.creator.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
