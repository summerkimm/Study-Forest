export const MOCKDATA = {
  studies: [
    {
      id: 1,
      name: "UX 스터디",
      nickName: "이유디",
      description: "Slow And Steady Wins The Race!!",
      studyDays: 62,
      background: "sky-blue",
      points: 310,
      topReactions: [
        {
          id: 27,
          emoji: "👩🏻",
          count: 37,
        },
        {
          id: 39,
          emoji: "🔥",
          count: 26,
        },
        {
          id: 31,
          emoji: "🤍",
          count: 14,
        },
      ],
    },
    {
      id: 2,
      name: "해나",
      nickName: "이모티콘 스터디",
      description: "화이팅 🤍",
      studyDays: 45,
      background: "image-1",
      points: 225,
      topReactions: [
        {
          id: 25,
          emoji: "🥰",
          count: 10,
        },
        {
          id: 11,
          emoji: "💗",
          count: 12,
        },
        {
          id: 9,
          emoji: "👍🏻",
          count: 10,
        },
      ],
    },
  ],
  pagination: {
    currentOffset: 1,
    nextOffset: 3,
    limit: 2,
  },
};
