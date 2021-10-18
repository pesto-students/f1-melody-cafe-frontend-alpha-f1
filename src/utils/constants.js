export const REPEAT_MODE = {
  NONE: -1,
  ALL: 0,
  ONE: 1,
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
    subFilters: [
      {
        name: "Festivals",
        url: "/occasion/festivals",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Romance",
        url: "/occasion/romance",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Party",
        url: "/occasion/party",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Friendship",
        url: "/occasion/friendship",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Dance",
        url: "/occasion/dance",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Kids",
        url: "/occasion/kids",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Wedding",
        url: "/occasion/wedding",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Stars",
        url: "/occasion/stars",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Workout",
        url: "/occasion/workout",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Ghazals",
        url: "/occasion/ghazals",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "EDM",
        url: "/occasion/edm",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Indie",
        url: "/occasion/indie",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Bhakti",
        url: "/occasion/bhakti",
        type: "occasionDetail",
        subFilters: null,
      },
      {
        name: "Retro",
        url: "/occasion/retro",
        type: "occasionDetail",
        subFilters: null,
      },
    ],
  },

  { name: "Album", url: "/album", type: "albumList", subFilters: null },
  { name: "Radio", url: "/radio", type: "radioList", subFilters: null },
  { name: "Podcast", url: "/podcast", type: "podcastList", subFilters: null },
  { name: "My Music", url: "/my-music", type: "homeSec", subFilters: null },
];
