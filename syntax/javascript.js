const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutations');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
let test = 'not a constant';
var thing = 'a variable';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link
};

const server = new GraphQLServer({
  typeDefs: './schema/index.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

if (thing) {
  console.log(test);
} else {
  console.log('other thing')
}

server.start(() => console.log(`Server is 省 on http://localhost:4000`));
