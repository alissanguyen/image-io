import {} from "phosphor-react";
import ConfoundedIcon from "~/assets/confounded.svg";
import LoadingIcon from "~/assets/loading.svg";
import SearchIcon from "~/assets/search.svg";

export enum Icon {
  EmojiSurprise = "las la-surprise",
  EmojiAwesome = "las la-grin-hearts",
  EmojiCowboyHat = "las la-kiss-beam",
  EmojiDisguise = "las la-grimace",
  EmojiDizzy = "las la-dizzy",
  EmojiConfounded = "las la-angry",
  EmojiElated = "las la-laugh-beam",
  EmojiGiggle = "las la-grin-tongue",
  EmojiLaugh = "las la-laugh-squint",
  EmojiTired = "las la-tired",
  EmojiWink = "las la-smile-wink",

  Loading = "las la-spinner",
  Search = "las la-search"

}

export const Icon2 = {
  EmojiConfounded: ConfoundedIcon,
  Loading: LoadingIcon,
  Search: SearchIcon
};
