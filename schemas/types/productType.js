const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLInt }, //定義id欄位為整數
    name: { type: GraphQLString }, //定義name欄位為字串
    price: { type: GraphQLInt },
    story: { type: GraphQLString },
  },
});

module.exports = ProductType;
