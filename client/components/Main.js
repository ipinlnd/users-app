import React from 'react';
import { Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation' 

class You extends React.Component
{
	render()
	{
		return(
			<View>
				<Text>
					You screen
				</Text>
			</View>
		)
	}
}

class Others extends React.Component
{
	render()
	{
		return(
			<View>
				<Text>
					Others screen
				</Text>
			</View>
		)
	}
}

const Tabs = createBottomTabNavigator(
{
	Others: Others,
	You: You,
},
{
	tabBarOptions:
	{
		activeTintColor: 'blue',
		inactiveTintColor: 'gray',
		activeBackgroundColor: '#EEEEEE',
		inactiveBackgroundColor: '#AAAAAA',
		labelStyle:
		{
			fontSize: 15,
			marginBottom: '10%'
		}
	}
})

const AppContainer = createAppContainer(Tabs)

export class Main extends React.Component
{
	render()
		{
		return(
			<AppContainer />
		)
	}
}
