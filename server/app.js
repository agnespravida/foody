const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Product, User, Cart } = require("./models")
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
  type Cart {
    id: ID,
    name: String,
    price: Int,
    quantity: Int,
    updatedAt: String,
    createdAt: String
  }
  type Message {
    message: String
  }
  type Access {
    access_token: String
  }

  type Mutation {
    loginUser(email: String, password: String): Access,
    addToCart(id: ID): Message,
    removeFromCart(id: ID): Message
  }
  type Query {
    Products: [Product],
    Carts: [Cart]
  }
`;

const resolvers = {
  Query: {
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
    },
    addToCart: (_, args, { loggedInUser }) => {
    try {
      if (loggedInUser) {
        // let stock;
        return Product.findOne({
          where: {
            id: args.id
          }
        })
          .then(product => {
            if (product) {
              if (product.stock < 1){
                throw new Error ("Product is out of stock")
              }
              else {
                // stock = product.stock
                return Cart.findOne({
                where: {
                  UserId: loggedInUser.id,
                  ProductId: args.id
                }
              })
              }
            }
            else {
              throw new Error("Product not found")
            }
          })
          .then(item => {
            if (item) {
              return Cart.increment('quantity', {
                where: {
                  UserId: loggedInUser.id,
                  ProductId: args.id
                },
                returning: true
              })
            }
            else {
              return Cart.create({
                UserId: loggedInUser.id,
                ProductId: args.id,
                quantity: 1
              })
            }
          })
          .then(cart => {
            return Product.decrement('stock', {
              where: {
                id: args.id
              }
            })
          })
          .then(_ => {
            return {
              message: "Successfully add item to cart"
            }
          })
          .catch(err => {
            throw (err)
          })
      }
      else {
        throw new Error ("Please login first")
      }
    }
      catch (err) {
        throw (err)
      }
    },
    removeFromCart: (_, args, { loggedInUser }) => {
      try {
        if (loggedInUser) {
          return Cart.findOne({
            where: {
              ProductId: args.id,
              UserId: loggedInUser.id
            }
          })
          .then(cart => {
            if (cart) {
              if (cart.quantiy > 1) {
                return Cart.decrement('quantity', {
                  where: {
                    ProductId: args.id,
                    UserId: loggedInUser.id
                  }
                })
              }
              else {
                return Cart.destroy({
                  where: {
                    ProductId: args.id,
                    UserId: loggedInUser.id
                  }
                })
              }
            }
            else {
              throw new Error ("Cannot find the product in your cart")
            }
          })
          .then(_ => {
            return Product.increment('stock', {
              where: {
                id: args.id
              }
            })
          })
          .then(_ => {
            return {
              message: "Successfully remove an item from your cart"
            }
          })
          .catch(err => {
            throw (err)
          })
        }
        else {
          throw new Error ("Please login first")
        }
      }
      catch (err) {
        throw (err)
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  let access_token = req.headers.access_token
  if (access_token) {
    let payload = jwt.verify(access_token, "secretJWT")
    return User.findOne({
      where: {
        id: payload.id,
        email: payload.email
      }
    })
      .then(user => {
        if (user) {
          return {loggedInUser: payload}
        }
        else {
          return {loggedInUser: null}
        }
      })
      .catch(err => {
        throw(err)
      })
  }
  else {
    return {loggedInUser: null}
  }

}});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)