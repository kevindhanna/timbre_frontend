import React, { Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect} from 'react-redux'
import { Button } from 'react-native-elements'
const BACKEND_IP = require('../.env').BACKEND_IP

const profMap = {
  [0]: 'Novice',
  [1]: 'Beginner',
  [2]: 'Amateur',
  [3]: 'Good',
  [4]: 'Pro',
  [5]: 'God'
}

class FormSummary extends Component {

  renderProfile = () => {
    const formData = this.props.formData
    const userInfo = formData.userInfo
    return(
      <View style={styles.profileForm}>
        <Text>Name: {userInfo.firstName} {userInfo.lastName}</Text>
        <Text>Bio: {userInfo.bio}</Text>
        <Text>Location: {formData.location.friendlyName}</Text>
      </View>
    )
  }

  proficencySummary = (proficency) => {
    return profMap[Math.floor(proficency)]
  }

  renderInstruments = () => {
    const instruments = this.props.formData.instruments
    return(
      <View style={styles.instrumentForm}>
        <FlatList
            keyExtractor={ item => item.instrument }
            data={instruments}
            renderItem={this.renderRow} />
      </View>
    )
  }

  handleSubmit = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    const userId = await AsyncStorage.getItem('userId')
    let value = {
      location: this.props.formData.location,
      firstName: this.props.formData.userInfo.firstName,
      lastName: this.props.formData.userInfo.lastName,
      bio: this.props.formData.userInfo.bio,
      instruments: this.props.formData.instruments
    }
    let data = {
      method: 'PATCH',
      body: JSON.stringify(value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : userToken
      }
    }
    return fetch('http://' + BACKEND_IP + ':3000/users/'+ userId, data)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderRow = (listItem) => {
    return(
        <Text>{listItem.item.instrument + ':' + this.proficencySummary(listItem.item.rating)}</Text>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>Does this look right?</Text>
        {this.renderProfile()}
        {this.renderInstruments()}
          <Button
            onPress={this.handleSubmit}
            raised
            type='outline'
            title='Finish'
            titleStyle={{fontFamily: 'Nunito Bold'}}
            buttonStyle={{padding: 10, borderRadius: 10, borderWidth: 1.2}}
            containerStyle={{width: 200, marginBottom: 20, marginTop: 20}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 400
  },
  profileForm: {
    justifyContent: "center",
    alignItems: "center",
  },
  instrumentForm: {
    alignItems: "center",
    flexDirection: "row"
  }
})

const mapStateToProps = state => {
  return {
    formData: state.profileForm.formData,
  }
}

export default connect(mapStateToProps, null)(FormSummary)
