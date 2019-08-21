import faker from "faker";

const list = {
  id: 1,
  time: Date.now(), // timestamp
  type: "Insert", // Insert, Update, Delete, Access
  userIP: "192.168.1.1", // user ip address
  userName: "Phong",
  userAvatar: "",
  userType: "admin", // admin, user, guest, operator, ...
  valueId: "1", //
  valueEntity: "offers", // offers, preferences, advertiser, ... // if type === 'access' ==> valueEntity = 'login/log out'
  description: "system generate"
};

const type = ["Insert", "Update", "Delete", "Access"];
const userType = ["Admin", "User", "Operator"];
const listEntity = ["offers", "preferences", "advertiser"];

const dataGenerator = () => {
  let list = [];

  for (let i = 100; i > 0; i--) {
    list.push({
      id: i,
      time: Date.now(),
      type: type[i % 3],
      userName: faker.internet.userName(),
      userType: userType[i % 3],
      userIP: faker.internet.ip(),
      userAvatar: faker.image.avatar(),
      valueId: i,
      valueEntity: listEntity[i % 3],
      description: faker.lorem.sentence()
    });
  }

  return list.reverse();
};

export const item = [
  {
    time: 111111113,
    type: "Delete" // Insert, Update, Delete
  },
  {
    time: 111111112,
    type: "Update", // Insert, Update, Delete
    valueData: {
      name: "Phu",
      birthday: "01/01/2000",
      address: "HCM"
    }
  },
  {
    time: 111111111,
    type: "Insert", // Insert, Update, Delete
    value: {
      name: "Phong",
      birthday: "01/01/2000",
      address: "HCM"
    }
  }
];

export const data = dataGenerator();
