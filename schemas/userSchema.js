const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const UserType = require("./types/userType");
const userData = require("../userData.json");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData.find((user) => user.id === args.id);
      },
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve() {
        return userData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const user = {
          id: userData.length + 1, //這裡只是模擬db的id會自動加1
          name: args.name,
          age: args.age,
        };
        userData.push(user);
        return userData[userData.length - 1];
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        const index = userData.findIndex((user) => user.id === args.id);
        if (index === -1) {
          throw new Error("查無此用戶");
        }
        const deletedUser = userData.splice(index, 1);
        return deletedUser[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// //新增user
// mutation {
//     addUser(name: "Charlie", age: 35) {
//       id
//       name
//       age
//     }
//   }

// //刪除user
// mutation {
//     deleteUser(id: "id") {
//       id
//       name
//       age
//     }
//   }
