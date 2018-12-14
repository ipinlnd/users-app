import React from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Header, Form, Item, Label, Input, Button, Toast} from 'native-base';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql `
	mutation register($user: String!, $pass: String!)
	{
		register(username: $user, password: $pass)
		{
			id
		}
	}
`

const LOGIN_MUTATION = gql `
	mutation login($user: String!, $pass: String!)
	{
		login(username: $user, password: $pass)
	}
`

export class Login extends React.Component
{
	constructor(props)
	{
		super(props)

		this.state =
		{
			username: '',
			password: ''
		}
	}

	onUserChange(text)
	{
		this.setState({username: text})
	}

	onPassChange(text)
	{
		this.setState({password: text})
	}

	handleSubmit(func, data)
	{
		const user = this.state.username
		const pass = this.state.password

		func({variables: {user, pass}})
		this.setState(
		{
			username: "",
			password: ""
		})
	}

	getLoginInput(func, data)
	{
		return(
			<Button success
				style={{padding: '10%', margin: '5%'}}
				onPress={() => this.handleSubmit(func, data)}>
				<Text style={{marginBottom: '70%'}}>Login</Text>
			</Button>
		)
	}

	getSignupInput(func, data)
	{
		return(
			<Button light
				style={{padding: '10%', margin: '5%'}}
				onPress={() => this.handleSubmit(func, data)}>
				<Text style={{marginBottom: '70%'}}>Sign up</Text>
			</Button>
		)
	}

	addLoginMutation()
	{
		const { push } = this.props.navigation;
		return(
			<Mutation mutation={LOGIN_MUTATION}
				onCompleted={(data) =>
				{
					if (data.login > 0)
						push('Main', {id: data.login})
					else
						Toast.show(
						{
							text: 'Authentication failed',
							duration: 3000
						})
				}}>
			{(loginUser, { data }) => (
				this.getLoginInput(loginUser, data)
			)}
			</Mutation>
		)
	}

	addSignupMutation()
	{
		return(
			<Mutation mutation={SIGNUP_MUTATION}
				onCompleted={(data) =>
				{
					Toast.show(
					{
						text: `Added user with id ${data.register.id}`,
						duration: 3000
					})
				}}>
			{(signUp, { data }) => (
				this.getSignupInput(signUp, data)
			)}
			</Mutation>
		)
	}

	render()
	{
		return(
			<Container>
				<Header />
				<Content >
					<View style={{flex:1, 
						alignItems: 'center'}}>
						<Text style={{marginTop: '10%',fontSize: 20}}>
							Login or Sign up
						</Text>
					</View>
					<View>
						<Form style={{paddingTop: '10%', marginLeft: '15%', marginRight: '15%'}}>
							<Item floatingLabel style={{borderBottomColor: '#ff0000', borderBottomWidth: 2}} >
								<Label>Username:</Label>
								<Input autoCapitalize = 'none'
									onChangeText={this.onUserChange.bind(this)}
									value={this.state.username}/>
							</Item>

							<Item floatingLabel style={{borderBottomColor: '#ff0000', borderBottomWidth: 2}} >
								<Label>Password:</Label>
								<Input secureTextEntry={true}
									onChangeText={this.onPassChange.bind(this)}
									value={this.state.password}/>
							</Item>
						</Form>
					</View>
					<View style={{flex:1, alignItems: 'center', flexDirection: 'row', marginTop: '20%', marginLeft: '15%'}}>
						{this.addLoginMutation()}
						{this.addSignupMutation()}
					</View>
				</Content>
			</Container>
		)
	}
}