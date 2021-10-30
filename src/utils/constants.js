export const REPEAT_MODE = {
  NONE: -1,
  ALL: 0,
  ONE: 1,
};

export const QUALITY = {
  LOW: -1,
  MED: 0,
  HIGH: 1,
};
export const blankSong = {
  id: "",
  name: "",
  artist: "",
  url: "",
  tags: "",
  lyrics: "",
};

export const filtersListHome = [
  { name: "All", url: "/", type: "homeSec", subFilters: null },
  {
    name: "Trending Songs",
    url: "/trending-songs",
    type: "miscTrendingSongs",
    subFilters: null,
  },
  { name: "New Songs", url: "/new-songs", type: "homeSec", subFilters: null },
  {
    name: "Old Songs",
    url: "/old-songs",
    type: "miscOldSongs",
    subFilters: null,
  },
  { name: "Album", url: "/album", type: "albumList", subFilters: null },
  { name: "Radio", url: "/radio", type: "radioList", subFilters: null },
  { name: "Podcast", url: "/podcast", type: "podcastList", subFilters: null },
  { name: "My Music", url: "/my-music", type: "homeSec", subFilters: null },
];
