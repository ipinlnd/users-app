import React from 'react';
import { View } from 'react-native';
import { Font } from 'expo'
import { Root } from "native-base"
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Login } from './components/Login'
import { Main } from './components/Main'

const RootStack = createStackNavigator(
{
	Login: Login,
	Main: Main
},
{
	initialRouteName: 'Login',
	headerMode: 'none'
})

const AppContainer = createAppContainer(RootStack)

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
					<AppContainer />
				</Root>
		);
	}
}