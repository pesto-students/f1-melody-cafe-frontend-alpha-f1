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
  { name: "All", url: "/all", type: "homeSec", subFilters: null },
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

  {
    name: "Moods & Genres",
    url: "/old-songs",
    type: "homeSec",
    subFilters: null,
    // subFilters: [
    //   {
    //     name: "Festivals",
    //     url: "/festivals",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Romance",
    //     url: "/romance",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Party",
    //     url: "/party",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Friendship",
    //     url: "/friendship",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Dance",
    //     url: "/dance",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Kids",
    //     url: "/kids",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Wedding",
    //     url: "/wedding",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Stars",
    //     url: "/stars",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Workout",
    //     url: "/workout",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Ghazals",
    //     url: "/ghazals",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "EDM",
    //     url: "/edm",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Indie",
    //     url: "/indie",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Bhakti",
    //     url: "/bhakti",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    //   {
    //     name: "Retro",
    //     url: "/retro",
    //     type: "occasionDetail",
    //     subFilters: null,
    //   },
    // ],
  },

  { name: "Album", url: "/album", type: "albumList", subFilters: null },
  { name: "Radio", url: "/radio", type: "radioList", subFilters: null },
  { name: "Podcast", url: "/podcast", type: "podcastList", subFilters: null },
  { name: "My Music", url: "/my-music", type: "homeSec", subFilters: null },
];
