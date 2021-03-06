export const primePostData = [
  // later on add section inside for pctures as well
  {
    user: "Trey Barnes",
    pic: require("../../../Assets/Images/testUsers/User0.jpeg"),
    postedDate: "2022-07-12",
    id: 1,
    status: "Just Checking",
    uploadedVid: {
      video: require("../../../Assets/Videos/video3.mp4"),
      title: "Test Video to show the Dynamic changes in Database",
      description:
        "This video was taken from online. It has a bunch of beacons of whatever they are called. I amd showing this because people hardly ever read the description but NEVERTHELESS!",
      number: 1,
    },
  },
];
export const textData = [
  {
    user: "Jackson Tucker",
    pic: require("../../../Assets/Images/testUsers/User1.jpeg"),
    postedDate: "2022-01-04",
    id: "1",
    title: "one",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Tomas Dillard",
    pic: require("../../../Assets/Images/testUsers/User2.jpeg"),
    postedDate: "2012-07-04",
    id: "2",
    title: "two",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Annie Frank",
    pic: require("../../../Assets/Images/testUsers/User3.jpeg"),
    postedDate: "2022-02-04",
    id: "3",
    title: "three",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Cedric Langley",
    pic: require("../../../Assets/Images/testUsers/User4.jpeg"),
    postedDate: "2022-07-06",
    id: "4",
    title: "four",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Addie Moore",
    pic: require("../../../Assets/Images/testUsers/User5.jpeg"),
    postedDate: "2021-11-04",
    id: "5",
    title: "five",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Meredith Black",
    pic: require("../../../Assets/Images/testUsers/User6.jpeg"),
    postedDate: "2022-06-01",
    id: "6",
    title: "six",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Goku Myoshie",
    pic: require("../../../Assets/Images/testUsers/User7.jpeg"),
    postedDate: "2022-06-02",
    id: "7",
    title: "seven",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Waylan Max",
    pic: require("../../../Assets/Images/testUsers/User8.jpeg"),
    postedDate: "2022-05-04",
    id: "8",
    title: "eight",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Jared Crouch",
    pic: require("../../../Assets/Images/testUsers/User9.jpeg"),
    postedDate: "2022-03-04",
    id: "9",
    title: "nine",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Jason Vorhees",
    pic: require("../../../Assets/Images/testUsers/User10.jpeg"),
    postedDate: "2022-02-04",
    id: "10",
    title: "ten",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Wally Pixy",
    pic: require("../../../Assets/Images/testUsers/User11.jpeg"),
    postedDate: "2022-01-04",
    id: "11",
    title: "eleven",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Matt Porky",
    pic: require("../../../Assets/Images/testUsers/User12.jpeg"),
    postedDate: "2021-12-04",
    id: "12",
    title: "twelve",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Jim Witwhipkey",
    pic: require("../../../Assets/Images/testUsers/User13.jpeg"),
    postedDate: "2020-07-14",
    id: "13",
    title: "thriteen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Sarah Richie",
    pic: require("../../../Assets/Images/testUsers/User14.jpeg"),
    postedDate: "2019-07-04",
    id: "14",
    title: "fourteen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Chadayney Poory",
    pic: require("../../../Assets/Images/testUsers/User15.jpeg"),
    postedDate: "2022-07-01",
    id: "15",
    title: "fifteen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Chris Chapman",
    pic: require("../../../Assets/Images/testUsers/User16.jpeg"),
    postedDate: "2021-11-04",
    id: "16",
    title: "sixteen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "David Racer",
    pic: require("../../../Assets/Images/testUsers/User17.jpeg"),
    postedDate: "2021-12-25",
    id: "17",
    title: "seventeen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Alex Kramer",
    pic: require("../../../Assets/Images/testUsers/User18.jpeg"),
    postedDate: "2022-02-14",
    id: "18",
    title: "eighteen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Alexis Texas",
    pic: require("../../../Assets/Images/testUsers/User19.jpeg"),
    postedDate: "2010-07-04",
    id: "19",
    title: "ninteen",
    status: "this is the test to see if what the user types appears",
  },
  {
    user: "Scott Scotch",
    pic: require("../../../Assets/Images/testUsers/User20.jpeg"),
    postedDate: "2002-07-04",
    id: "20",
    title: "twenty",
    status: "this is the test to see if what the user types appears",
  },
];
export const photoData = [
  {
    user: "Jackson Tucker",
    pic: require("../../../Assets/Images/testUsers/User1.jpeg"),
    postedDate: "2022-01-04",
    id: "1",
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    images: [
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image1.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image2.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image3.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image4.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image5.png"),
          name: "Pic1",
          number: 2,
        },
      },
    ],
  },
  {
    user: "Tomas Dillard",
    pic: require("../../../Assets/Images/testUsers/User2.jpeg"),
    postedDate: "2012-07-04",
    id: "2",
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    images: [
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image1.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image2.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image3.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image4.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image5.png"),
          name: "Pic1",
          number: 2,
        },
      },
    ],
  },
  {
    user: "Annie Frank",
    pic: require("../../../Assets/Images/testUsers/User3.jpeg"),
    postedDate: "2022-02-04",
    id: "3",
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    images: [
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image1.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image2.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image3.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image4.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image5.png"),
          name: "Pic1",
          number: 2,
        },
      },
    ],
  },
  {
    user: "Cedric Langley",
    pic: require("../../../Assets/Images/testUsers/User4.jpeg"),
    postedDate: "2022-07-06",
    id: "4",
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    images: [
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image1.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image2.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image3.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image4.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image5.png"),
          name: "Pic1",
          number: 2,
        },
      },
    ],
  },
  {
    user: "Addie Moore",
    pic: require("../../../Assets/Images/testUsers/User5.jpeg"),
    postedDate: "2021-11-04",
    id: "5",
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    images: [
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image1.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image2.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image3.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image4.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image5.png"),
          name: "Pic1",
          number: 2,
        },
      },
    ],
  },
  {
    user: "Meredith Black",
    pic: require("../../../Assets/Images/testUsers/User6.jpeg"),
    postedDate: "2022-06-01",
    id: "6",
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    images: [
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image1.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image2.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image3.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image4.png"),
          name: "Pic1",
          number: 2,
        },
      },
      {
        uploadedPic: {
          image: require("../../../Assets/Images/testImages/image5.png"),
          name: "Pic1",
          number: 2,
        },
      },
    ],
  },
];
export const videoData = [
  {
    user: "Adam West",
    pic: require("../../../Assets/Images/testUsers/User1.jpeg"),
    postedDate: "2022-03-12",
    id: 1,
    status: "Just Checking",
    // figure way to have multiple pictures from adding
    videos: [
      {
        uploadedVid: {
          video: require("../../../Assets/Videos/video2.mp4"),
          title: "Vid1",
          number: 1,
        },
      },
      {
        uploadedVid: {
          video: require("../../../Assets/Videos/video.mp4"),
          title: "Vid2",
          number: 2,
        },
      },
    ],
  },
];
