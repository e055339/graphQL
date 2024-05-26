const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const productSchema = require("./schemas/productSchema");
const userSchema = require("./schemas/userSchema");

const app = express();

app.use(
  "/graphql/products",
  graphqlHTTP({
    schema: productSchema,
    graphiql: true,
  })
);

app.use(
  "/graphql/users",
  graphqlHTTP({
    schema: userSchema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
