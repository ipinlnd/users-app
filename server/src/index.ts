import {Sequelize} from 'sequelize-typescript'
import { GraphQLServer } from 'graphql-yoga'
import {Account} from './models/Account'

const sequelize =  new Sequelize(
{
	database: 'users',
	dialect: 'postgres',
	username: 'postgres',
	password: 'admin',
	host: "localhost",
	modelPaths: ['./models']
})

sequelize.addModels([Account])

sequelize.authenticate().then(() => 
{
	console.log('Connection has been established successfully.')
}).catch(err => 
{
	console.error('Unable to connect to the database:', err)
});

