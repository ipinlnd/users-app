import React from 'react';
import { Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation' 
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql `
	query
	{
		users
		{
			id
			username
			password
			motto
		}
	}
`
const UPDATE_MUTATION = gql `
	mutation addMotto($id: ID!, $motto: String!)
	{
		addMotto(id: $id, motto: $motto)
		{
			motto
		}
	}
`
var ownId = 4
var users = []

class You extends React.Component
{
	constructor(props)
	{
		super(props)

		this.t = users.findIndex(function(element)
		{
			return element.id == ownId
		})

		this.state =
		{
			motto: ''
		}
	}

	handleChange(text)
	{
		this.setState({motto: text})
	}

	handleSubmit(addMotto, data)
	{
		const motto = this.state.motto

		console.log(ownId, motto)

		addMotto({variables: {id: ownId, motto}})
		this.setState(
		{
			motto: motto
		})
		users[this.t].motto = motto
	}

	getForm(addMotto, data)
	{
		return(
			<Form style={{marginLeft: '15%', marginRight: '15%'}}>
				<Item floatingLabel style={{borderBottomColor: '#ff0000', borderBottomWidth: 2}} >
					<Label>Change it</Label>
					<Input autoCapitalize = 'none'
						value={this.state.motto}
						onChangeText={this.handleChange.bind(this)}
						onSubmitEditing={e => this.handleSubmit(addMotto, data)}/>
				</Item>
			</Form>
		)
	}

	addMutation()
	{
		return(
			<Mutation mutation={UPDATE_MUTATION}>
			{(addMotto, { data }) => (
				<View>
					{this.getForm(addMotto, data)}
				</View>
			)}
			</Mutation>
		)
	}

	async logout()
	{
		this.props.screenProps.dadnav.navigate('Login')
	}

	render()
	{
		return(
			<Container>
			<Header>
			</Header>
				<Content>
					<View style={{flex:1}}>
						<View style={{margin: '5%', alignItems: 'flex-start', flexDirection: 'row'}}>
							<Text>
								You are:
							</Text>
							<Text style={{margin: '10%', fontSize: 30, padding: 10, borderRadius: 4, borderWidth: .3}}>
								{users[this.t].username}
							</Text>
						</View>
						<View style={{marginLeft: '5%', marginTop: '2%', alignItems: 'flex-start'}}>
							<Text>
								Your Motto is:
							</Text>
							<Text adjustsFontSizeToFit={true}
								style={{marginTop: '5%',
										marginLeft: '5%',
										marginRight: '5%',
										fontSize: 20, padding: 10, borderRadius: 4, borderWidth: .3}}>
								{users[this.t].motto}
							</Text>
						</View>
					</View>
					<View>
						{this.addMutation()}
					</View>
					<Button danger block style={{marginTop: '20%'}}
						onPress={this.logout.bind(this)}>
						<Text>
							Logout
						</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}

class Others extends React.Component
{
	render()
	{
		return(
			<Container>
			<Header>
			</Header>
				<Content>
					<View style={{flex: 1, height: 500, marginLeft: '5%', marginRight: '5%', marginTop: '5%', borderWidth: 1}}>
						<Query query={FEED_QUERY}>
							{({loading, error, data}) =>
							{
								if (loading)
									return <Text> Fetching </Text>
								if (error)
									return <Text> Error </Text>

								users = data.users
								return (
									<View>
										<ScrollView pagingEnabled={true}>
											{users.map((user, index) =>
												<View key={index}
													style={{ marginLeft: '5%',
													marginRight: '5%',
													marginTop: '5%',
													borderWidth: .1,
													backgroundColor: '#EEEEEE'}}>
													<Text>{user.username}</Text>
													<Text>{user.motto}</Text>
												</View>
											)}
										</ScrollView>
									</View>
								)
							}}
						</Query>
					</View>
				</Content>
			</Container>
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
