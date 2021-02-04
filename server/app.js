const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Product, User } = require("./models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const PORT = 4000;

const app = express();

const typeDefs = gql`
  type Product {
    id: ID,
    name: String,
    price: Int,
    stock: Int,
    updatedAt: String,
    createdAt: String
  }
  type Access {
    access_token: String
  }

  type Mutation {
    loginUser(email: String, password: String): Access
  }
  type Query {
    hello: String,
    Products: [Product]
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    Products: async () => {
      try {
        let products = await Product.findAll()
        return products
      }
      catch (error) {
        throw (error)
      }
    }
  },
  Mutation: {
    loginUser: (_, args, context) => {
      return User.findOne ({
        where: {
          email: args.email
        }
      })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(args.password, user.password)){
              let access_token = jwt.sign({id: user.id, email: user.email}, "secretJWT")
              return {
                access_token: access_token
              }
            }
            else {
              throw new Error ("Invalid password")
            }
          }
          else {
            throw new Error ("Invalid email")
          }
        })
        .catch(err => {
          throw (err)
        })
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  let access_token = req.headers.access_token
  if (access_token) {
    return {isLoggedIn: access_token}
  }
  else {
    return {isLoggedIn: "lalala"}
  }

}});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)