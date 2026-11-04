// Placeholder roster for the six studio athletes. Swap in real names, photos
// and Arc video data (`npm run resolve:video UUID`) as they come in.
import videos from "./videos.json";

const sampleVideo = videos[0];

/**
 * @typedef {{
 *   name: string;
 *   sport: string;
 *   school: string;
 *   grade?: string;
 *   footwear: string;
 *   footwearDescription: string[];
 *   portrait?: string;
 *   portraitAlt?: string;
 *   shoe?: string;
 *   shoeAlt?: string;
 *   video?: typeof sampleVideo;
 * }} Athlete
 */

/** @type {Athlete[]} */
export const athletes = [
  {
    name: "Athlete Name TK",
    sport: "Sport",
    school: "School TK",
    grade: "Senior",
    footwear: "Shoe type",
    footwearDescription: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    video: sampleVideo,
  },
  {
    name: "Athlete Name TK",
    sport: "Sport",
    school: "School TK",
    grade: "Junior",
    footwear: "Shoe type",
    footwearDescription: [
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.",
    ],
    video: sampleVideo,
  },
  {
    name: "Athlete Name TK",
    sport: "Sport",
    school: "School TK",
    grade: "Senior",
    footwear: "Shoe type",
    footwearDescription: [
      "Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.",
      "Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat.",
    ],
    video: sampleVideo,
  },
  {
    name: "Athlete Name TK",
    sport: "Sport",
    school: "School TK",
    grade: "Sophomore",
    footwear: "Shoe type",
    footwearDescription: [
      "Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.",
      "Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus.",
    ],
    video: sampleVideo,
  },
  {
    name: "Athlete Name TK",
    sport: "Sport",
    school: "School TK",
    grade: "Senior",
    footwear: "Shoe type",
    footwearDescription: [
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
      "Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.",
    ],
    video: sampleVideo,
  },
  {
    name: "Athlete Name TK",
    sport: "Sport",
    school: "School TK",
    grade: "Junior",
    footwear: "Shoe type",
    footwearDescription: [
      "Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis vitae, ultricies et, tellus.",
      "Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae ornare odio metus a mi. Morbi ac orci et nisl hendrerit mollis. Suspendisse ut massa.",
    ],
    video: sampleVideo,
  },
];
