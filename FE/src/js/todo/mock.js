export const mock = {
  categories: [
    {
      id: 1,
      name: "Todo",
      cards: [
        {
          id: 1,
          title: "제목1",
          content: "상세페이지 API 정리",
          author: "web",
          createTime: "2020-04-07 15:20:23",
          modifiedTime: "2020-04-07 15:24:23",
        },
        {
          id: 2,
          title: null,
          content: "github 공부하기",
          author: "web",
          createTime: "2020-04-07 14:24:23",
          modifiedTime: "2020-04-07 15:24:23",
        },
        {
          id: 3,
          title: null,
          content: "github 공부하기2",
          author: "web2",
          createTime: "2020-04-07 14:24:23",
          modifiedTime: "2020-04-07 15:24:23",
        },
      ],
      cardsCount: 2,
      valid: true,
    },
    {
      id: 2,
      name: "InProgress",
      cards: [
        {
          id: 3,
          title: "제목3",
          content: "데모환경 구성",
          author: "iOS",
          createTime: "2020-04-07 15:24:24",
          modifiedTime: "2020-04-07 15:34:24",
        },
        {
          id: 4,
          title: "제목4",
          content: "개발하기",
          author: "iOS",
          createTime: "2020-04-07 15:24:24",
          modifiedTime: "2020-04-07 15:24:24",
        },
        {
          id: 5,
          title: null,
          content: "리뷰하기",
          author: "iOS",
          createTime: "2020-04-07 15:24:24",
          modifiedTime: "2020-04-07 15:24:24",
        },
      ],
      cardsCount: 0,
      valid: false,
    },
    {
      id: 3,
      name: "Done",
      cards: [
        {
          id: 6,
          title: "제목6",
          content: "데일리 스크럼",
          author: "Henry",
          createTime: "2020-04-07 15:24:24",
          modifiedTime: "2020-04-07 15:24:24",
        },
      ],
      cardsCount: 1,
      valid: true,
    },
  ],
};

export const deleteData = {
  id: 1,
  title: "1번제목",
  content: "1번내용",
  author: "1번저자",
  createTime: null,
  modifiedTime: null,
  deleted: true,
};
