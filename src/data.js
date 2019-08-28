import faker from "faker";

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

export const items = [
  {
    time: Date.now() + 4,
    type: "Delete", // Insert, Update, Delete
    userName: "Phu",
    userType: "User",
    userAvatar: faker.image.avatar()
  },
  {
    time: Date.now() + 3,
    type: "Update", // Insert, Update, Delete
    userName: "Phu",
    userType: "User",
    valueData: {
      name: "Phu",
      birthday: "01/02/2000",
      address: "HaNoi"
    }
  },
  {
    time: Date.now() + 2,
    type: "Update", // Insert, Update, Delete
    userName: "Phu",
    userType: "User",
    valueData: {
      name: "Phu",
      birthday: "01/01/2000",
      address: "HCM"
    }
  },
  {
    time: Date.now() + 1,
    type: "Insert", // Insert, Update, Delete
    userName: "Admin",
    userType: "Admin",
    userAvatar: faker.image.avatar(),
    valueData: {
      name: "Phong",
      birthday: "01/01/2000",
      address: "HCM"
    }
  }
];

export const data = dataGenerator();
