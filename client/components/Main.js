import React from 'react';
import { Text, View, ScrollView, AsyncStorage} from 'react-native';
import { createBottomTabNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation' 
import { Container, Content, Header, Form, Item, Label, Input, Button, Card, CardItem} from 'native-base';
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql `
  query {
    users {
      id
      username
      password
      motto
    }
  }
`
const UPDATE_MUTATION = gql `
  mutation addMotto($id: ID!, $motto: String!) {
    addMotto(id: $id, motto: $motto) {
      motto
    }
  }
`

var users = []

class You extends React.Component {
  constructor(props) {
    super(props)

    this.t = users.findIndex(function(element) {
      return element.id == global.id
    })

    if (this.t < 0) {
      t = 0
      this.logout()
    }

    this.state = {
      motto: ''
    }
  }

  handleChange(text) {
    this.setState({motto: text})
  }

  handleSubmit(addMotto, data) {
    const motto = this.state.motto

    addMotto({variables: {id: global.id, motto}})
    this.setState({
      motto: motto
    })
    this.props.screenProps.client.resetStore()
  }

  getForm(addMotto, data) {
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

  addMutation() {
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

  async logout() {
    try {
      await AsyncStorage.removeItem('id')
    }
    catch (e) {
      console.log(e)
    }
    this.props.screenProps.dadnav.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'Login'
      })]
    }))
  }

  render() {
    return(
      <Container>
      <Header>
      </Header>
        <Content>
          <View style={{flex:1}}>
            <View style={{alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10, justifyContent: 'center'}}>
              <Text style={{fontSize: 30, padding: 10}}>
                {users[this.t].username}
              </Text>
            </View>
            <View style={{marginLeft: '5%', marginTop: '5%', alignItems: 'flex-start'}}>
              <Text style={{color: 'red'}}>
                Your Motto is:
              </Text>
              <Text adjustsFontSizeToFit={true}
                style={{marginTop: '5%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    fontSize: 20, padding: 10}}>
                {users[this.t].motto}
              </Text>
            </View>
          </View>
          <View>
            {this.addMutation()}
          </View>
          <Button danger block style={{marginTop: '20%'}}
            onPress={this.logout.bind(this)}>
            <Text style={{color: 'white'}}>
              Logout
            </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

class Others extends React.Component {
  render() {
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
                    <Card style={{height: '100%'}}>
                      {users.map((user, index) =>
                        <CardItem key={index}
                                  style={{ marginLeft: '5%',
                                  marginRight: '5%',
                                  marginTop: '5%',
                                  borderWidth: .1,
                                  backgroundColor: '#EEEEEE'}}>
                          <Text style={{color: 'red'}}>{user.username} : </Text>
                          <Text>{user.motto}</Text>
                        </CardItem>
                      )}
                    </Card>
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

const Tabs = createBottomTabNavigator({
  Others: Others,
  You: You,
}, {
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
    activeBackgroundColor: '#EEEEEE',
    inactiveBackgroundColor: '#AAAAAA',
    labelStyle: {
      fontSize: 15,
      marginBottom: '10%'
    }
  }
})

const AppContainer = createAppContainer(Tabs)

export class Main extends React.Component {
  async storeData(id) {
    try {
      await AsyncStorage.setItem('id', id)
    }
    catch (e) {
      console.log(e)
    }
  }

  async getData() {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null)
        global.id = value;
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    this.getData().then(() => {
      if (!global.id)
        navigate('Login')
      else
        this.storeData(global.id)
    })

    return(
      <AppContainer screenProps = {{
          dadnav: this.props.navigation,
          client: this.props.screenProps.client
        }}/>
    )
  }
}
