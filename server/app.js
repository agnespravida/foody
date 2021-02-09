const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Product, User, Cart, History, sequelize } = require("./models")
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
    createdAt: String,
    imageUrl: String
  }
  type Data {
    id: ID,
    ProductId: ID,
    name: String,
    price: Int,
    quantity: Int,
    updatedAt: String,
    createdAt: String,
    imageUrl: String
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
    removeFromCart(id: ID): Message,
    emptyCart: Message,
    checkout: Message
  }
  type Query {
    Products: [Product],
    Carts: [Data],
    History: [Data]
  }
`;

const resolvers = {
  Query: {
    Products: async () => {
      try {
        let products = await Product.findAll({
          order: [
            ['id', 'ASC']
          ]
        })
        return products
      }
      catch (error) {
        throw (error)
      }
    },
    Carts: async (parents, args, { loggedInUser }) => {
      try {
        if (loggedInUser) {
          let rawCarts = await Cart.findAll({
            where: {
              UserId: loggedInUser.id
            },
            order: [
              ["id", "ASC"]
            ],
            include: {
              model: Product
            }
          })
          let carts = rawCarts.map(cart => {
            return {
              id: cart.id,
              ProductId: cart.Product.id,
              name: cart.Product.name,
              price: cart.Product.price,
              imageUrl: cart.Product.imageUrl,
              quantity: cart.quantity,
              updatedAt: cart.updatedAt,
              createdAt: cart.createdAt
            }
          })
          return carts
        }
        else {
          throw new Error ("Please login first")
        }
      }
      catch (error) {
        throw (error)
      }
    },
    History: async (parents, args, { loggedInUser }) => {
      try {
        if (loggedInUser) {
          let rawHistory = await History.findAll({
            where: {
              UserId: loggedInUser.id
            },
            order: [
              ["createdAt", "DESC"]
            ],
            include: {
              model: Product
            }
          })
          let history = rawHistory.map(history => {
            return {
              id: history.id,
              ProductId: history.Product.id,
              name: history.Product.name,
              imageUrl: history.Product.imageUrl,
              price: history.Product.price,
              quantity: history.quantity,
              updatedAt: history.updatedAt,
              createdAt: history.createdAt
            }
          })
          return history
        }
        else {
          throw new Error ("Please login first")
        }
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
    addToCart: async (_, args, { loggedInUser }) => {
    try {
      if (loggedInUser) {
        const t = await sequelize.transaction()
        return Product.findOne({
          transaction: t,
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
                return Cart.findOne({
                transaction: t,
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
                transaction: t,
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
              }, {
                transaction: t
              })
            }
          })
          .then(cart => {
            return Product.decrement('stock', {
              transaction: t,
              where: {
                id: args.id
              }
            })
          })
          .then(_ => {
            return t.commit()
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
        await t.rollback()
        throw (err)
      }
    },
    removeFromCart: async (_, args, { loggedInUser }) => {
      try {
        if (loggedInUser) {
          const t = await sequelize.transaction()
          return Cart.findOne({
            transaction: t,
            where: {
              ProductId: args.id,
              UserId: loggedInUser.id
            }
          })
          .then(cart => {
            if (cart) {
              if (cart.quantity > 1) {
                return Cart.decrement('quantity', {
                  transaction: t,
                  where: {
                    ProductId: args.id,
                    UserId: loggedInUser.id
                  }
                })
              }
              else if (cart.quantity <= 1){
                return Cart.destroy({
                  transaction: t,
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
              transaction: t,
              where: {
                id: args.id
              }
            })
          })
          .then(_ => {
            return t.commit()
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
        await t.rollback()
        throw (err)
      }
    },
    emptyCart: async (parents, args, { loggedInUser }) => {
      try {
        if (loggedInUser) {
          const t = await sequelize.transaction()
          let carts = await Cart.findAll({
            where: {
              UserId: loggedInUser.id
            }
          })
          let promises = []
          for (let i = 0; i < carts.length; i++) {
            promises.push (Cart.destroy({
              transaction: t,
              where: {
                ProductId: carts[i].ProductId,
                UserId: loggedInUser.id
              }
            })
              .then(_ => {
                return Product.findOne({
                  transaction: t,
                  where: {
                    id: carts[i].ProductId
                  }
                })
              })
              .then(product => {
                return Product.update({
                  stock: product.stock + carts[i].quantity
                }, {
                  transaction: t,
                  where: {
                    id: carts[i].ProductId
                  }
                })
              })
              .then(_ => {
                
              })
              .catch(err => {
                throw(err)
              })
            )
          }
          return Promise.all(promises)
            .then(_ => {
              return t.commit()
            })
            .then(_ => {
              return {
                message: "Successfully empty your cart"
              }
            })
            .catch(err => {
              throw(err)
            })
        }
        else {
          throw new Error ("Please login first")
        }
      }
      catch (error) {
        await t.rollback()
        throw(error)
      }
    },
    checkout: async (parents, args, { loggedInUser }) => {
      try {
        if (loggedInUser) {
          let carts = await Cart.findAll({
            where: {
              UserId: loggedInUser.id
            }
          })
          const t = await sequelize.transaction()
          let promises = []
          for (let i = 0; i < carts.length; i++) {
            promises.push (Cart.destroy({
              transaction: t,
              where: {
                ProductId: carts[i].ProductId,
                UserId: loggedInUser.id
              }
            })
              .then(_ => {
                return History.create({
                  ProductId: carts[i].ProductId,
                  UserId: carts[i].UserId,
                  quantity: carts[i].quantity
                }, {
                  transaction: t
                })
              })
              .then(_ => {
                
              })
              .catch(err => {
                throw(err)
              })
            )
          }
          return Promise.all(promises)
            .then(_ => {
              return t.commit()
            })
            .then(_ => {
              return {
                message: "Successfully checkout"
              }
            })
            .catch(err => {
              throw(err)
            })
        }
        else {
          throw new Error ("Please login first")
        }
      }
      catch (error) {
        await t.rollback()
        throw(error)
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  let access_token = req.headers.access_token
  console.log(access_token)
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