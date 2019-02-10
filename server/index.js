const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./graphql/schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/* Mongoose Connection */
const { MONGO_URI } = process.env;
mongoose.set("useCreateIndex", true);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(e => console.error(e));

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
