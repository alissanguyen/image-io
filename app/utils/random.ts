import axios from "axios";
import { IAppState, ISearchBarSass } from "~/types/defaults";
import { Icon } from "~/types/icons";
import { Interaction } from "~/types/interaction";
import { RequestStatus } from "~/types/request";

export interface INumberUtility {
  random: (min: number, max: number) => number;
}

export const NumberUtility: INumberUtility = {
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

export interface IInteractionUtility {
  determineSass: (state: IAppState) => ISearchBarSass;
  getRandomEmoji: (emojis: Icon[]) => Icon;
  getRandomStatement: (statements: string[]) => string;
}

export const InteractionUtility: IInteractionUtility = {
  determineSass: (state: IAppState): ISearchBarSass => {

    let statement: string = InteractionUtility.getRandomStatement([
      "Welcome! Please click on the search bar.",
      "Good day to you. Please click above to begin.",
      "Hello. Please click on me to continue."
    ]);

    let emoji: Icon = Icon.Search;

    if (state.status === RequestStatus.Loading) {
      statement = InteractionUtility.getRandomStatement([
        "Searching across the universe.",
        "Scanning every image ever.",
        "Finding your precious results.",
        "Boop beep bop boop."
      ]);

      emoji = Icon.Loading;
    } else if (state.interaction === Interaction.Typing) {
      if (state.query.trim() === "") {
        statement = InteractionUtility.getRandomStatement([
          `You can't search "nothing", you silly goose.`,
          `That, my friends, is what we call an "empty string".`,
          "Am bored. Pls send more letters."
        ]);

        emoji = Icon.EmojiDizzy;
      } else {
        statement = InteractionUtility.getRandomStatement([
          "Great work lol.",
          "Those are some good letters.",
          "Hit enter to search.",
          "Are you sure?",
          "Is that all?"
        ]);

        emoji = InteractionUtility.getRandomEmoji([
          Icon.EmojiDisguise,
          Icon.EmojiGiggle,
          Icon.EmojiLaugh,
          Icon.EmojiWink
        ]);
      }
    } else if (state.interaction === Interaction.Leaving) {
      statement = InteractionUtility.getRandomStatement([
        "Not good enough for ya, eh?",
        "Sayonara!",
        "Not even so much as a goodbye?",
        "Fine, cya later.",
        "See if I care!"
      ]);

      emoji = Icon.EmojiConfounded;
    } else if (state.interaction === Interaction.Returning) {
      statement = InteractionUtility.getRandomStatement([
        "Hooray, you're back!",
        "Please don't leave me again.",
        "It's searchin' time!"
      ]);

      emoji = InteractionUtility.getRandomEmoji([
        Icon.EmojiElated,
        Icon.EmojiCowboyHat
      ]);
    } else if (state.interaction === Interaction.CorrectQuery) {
      statement = InteractionUtility.getRandomStatement([
        "Oh wow. We actually have results for that. Here you go.",
        "Well, well, well. Somebody must've been here before. Enjoy.",
        "Get that on your first try, did you? Doubt it."
      ]);

      emoji = Icon.EmojiSurprise;
    } else if (state.interaction === Interaction.Duplicate) {
      statement = InteractionUtility.getRandomStatement([
        "Yeah, you just searched that. Try something else.",
        "Be original please. I just searched that.",
        "C'mon now. Don't make me search that again."
      ]);

      emoji = InteractionUtility.getRandomEmoji([
        Icon.EmojiConfounded,
        Icon.EmojiTired
      ]);
    } else if (state.interaction === Interaction.Initiated) {
      if (state.searching) {
        statement = InteractionUtility.getRandomStatement([
          `Great search. Here's some ${state.collectionID} as a reward.`,
          `Hmm, haven't heard of that. Have some ${state.collectionID} instead.`,
          `Search poorly worded. Returning some ${state.collectionID} instead.`
        ]);
      } else {
        statement = InteractionUtility.getRandomStatement([
          "Good job! Now start typing.",
          "Wow, you did it. Step 1 complete."
        ]);
      }

      emoji = InteractionUtility.getRandomEmoji([
        Icon.EmojiAwesome,
        Icon.EmojiElated
      ]);
    }

    return {
      emoji,
      statement
    };
  },

  getRandomEmoji: (emojis: Icon[]): Icon => {
    const rand: number = NumberUtility.random(0, emojis.length - 1);

    return emojis[rand];
  },
  getRandomStatement: (statements: string[]): string => {
    const rand: number = NumberUtility.random(0, statements.length - 1);

    return statements[rand];
  }
};








