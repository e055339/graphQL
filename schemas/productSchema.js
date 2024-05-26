const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const productData = require("../productData.json");
const ProductType = require("./types/productType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getProductById: {
      type: ProductType,
      args: { id: { type: GraphQLInt } }, //查詢時傳遞的參數
      resolve(parent, args) {
        //resolve處理查詢和變更請求，也是放database邏輯的地方
        //例如: pool.query('SELECT * FROM')...
        return productData.find((product) => product.id === args.id);
      },
    },
    getAllProducts: {
      type: new GraphQLList(ProductType),
      resolve() {
        return productData;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
