import React from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Header, Form, Item, Label, Input, Button, Toast} from 'native-base';

export class Login extends React.Component
{
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
						<Button>Login</Button>
						<Button>Sign up</Button>
					</View>
				</Content>
			</Container>
		)
	}
}