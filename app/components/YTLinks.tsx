import * as React from "react";
import YTLink from "./YTLink";

const YTLinks: React.FC = ({}) => {
  const link: string =
    "https://www.youtube.com/watch?v=d5bZfz0ohRE&list=PLD9xos4mnoHROPklJMCUfKREJmRwXjqr2";
  return (
    <div id="youtube-links">
      <YTLink label="Tutorial" url={link} />
    </div>
  );
};

export default YTLinks;
