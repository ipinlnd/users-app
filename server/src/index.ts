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

const resolvers =
{
	Query:
	{
		users: (root: any) =>
		{
		}
	},
	Mutation:
	{
		login: (root: any, {username, password} : {username: String, password: String}) =>
		{
		},
		register: (root: any, {username, password} : {username: String, password: String}) =>
		{
		},
		addMotto: (root: any, {id, motto}: {id: number, motto: String}) =>
		{
		}
	},
	User:
	{
		id: (root: any) => root.id,
		username: (root: any) => root.name,
		password: (root: any) => root.password,
		motto: (root: any) => root.motto
	}
}

const server = new GraphQLServer(
{
	typeDefs: './src/schema.graphql',
	resolvers,
})

server.start(()=> console.log(`Server is running on http://localhost:4000`))