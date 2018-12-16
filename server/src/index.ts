import {Sequelize} from 'sequelize-typescript'
import { GraphQLServer } from 'graphql-yoga'
import {Account} from './models/Account'

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

const sequelize =  new Sequelize({
  database: 'users',
  dialect: 'postgres',
  username: 'postgres',
  password: 'admin',
  host: "localhost",
  modelPaths: ['./models']
})

sequelize.addModels([Account])

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
});

passport.use('local', new LocalStrategy(
  function(username: String, password: String, done: Function) {
    Account.findOne({where: {name: username}}).then(function(user) {
      if (!user)
        return done(null, false, { message: 'Incorrect username'})

      if (user.password != password)
        return done(null, false, { message: 'Incorrect password'})

      var userinfo = user.get()
        return done(null, userinfo)
    })
  }
))

function login(req: any) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err: any, user: any) => {
      if (err)
        reject(0)
      if (!user)
        resolve(0)

      resolve(user.id)
    })(req)
  })
}

const resolvers = {
  Query: {
    users: (root: any) => {
      return Account.findAll()
    }
  },
  Mutation: {
    login: (root: any, {username, password} : {username: String, password: String}) => {
      const req = {
        body: {
          url: '/',
          method: "post",
          action: "login",
          username: username,
          password: password
        },
        logIn: () => {}
      }

      return login(req)
    },
    register: (root: any, {username, password} : {username: String, password: String}) => {
      const user = new Account({name: username, password: password, motto: ''})
      return user.save().then(e => {return e.dataValues})
    },
    addMotto: (root: any, {id, motto}: {id: number, motto: String}) => {
      return Account.update({motto: motto}, {where: {id: id}}).then(user => {
        return Account.findOne({where: {id : id}}).then(value => {
          if (!value) return 0
          return value.dataValues
        })
      })
    }
  },
  User: {
    id: (root: any) => root.id,
    username: (root: any) => root.name,
    password: (root: any) => root.password,
    motto: (root: any) => root.motto
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(()=> console.log(`Server is running on http://localhost:4000`))