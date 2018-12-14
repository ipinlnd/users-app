import React from 'react';
import { View } from 'react-native';
import { Font } from 'expo'
import { Root } from "native-base"
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import { Login } from './components/Login'
import { Main } from './components/Main'

const RootStack = createStackNavigator(
{
	Login: Login,
	Main: Main
},
{
	initialRouteName: 'Main',
	headerMode: 'none'
})

const AppContainer = createAppContainer(RootStack)

const httpLink = createHttpLink(
{
	uri: 'http://192.168.1.53:4000'
})

const client = new ApolloClient(
{
	link: httpLink,
	cache: new InMemoryCache()
})

export default class App extends React.Component
{
	constructor(props)
	{
		super(props)

		this.state = 
		{
			loaded: false,
		}
	}
	async componentWillMount() 
	{
		await Font.loadAsync(
		{
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});

		this.setState({loaded: true})
	}

	render()
	{
		if (!this.state.loaded) 
			return (<View></View>)
		return (
			<Root>
				<ApolloProvider client={client}>
					<AppContainer screenProps={{client: client}}/>
				</ApolloProvider>
			</Root>
		);
	}
}