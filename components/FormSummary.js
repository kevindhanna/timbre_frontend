import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect} from 'react-redux'
import { updateFormData } from '../actions/updateFormData'


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
    console.log(formData)
    return(
      <Text>{formData.userInfo}</Text>
    )
  }

  proficencySummary = (proficency) => {
    return profMap[Math.floor(proficency)]
  }

  renderInstruments = () => {
    const instruments = this.props.formData.instruments
    return(
      <View>
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
      location: {friendlyName: this.props.formData.locationData.description},
      firstName: this.props.formData.personalInfo.firstName,
      lastName: this.props.formData.personalInfo.lastName,
      bio: this.props.formData.personalInfo.bio,
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
      <View>
        <Text>{listItem.item.instrument + ':' + this.proficencySummary(listItem.item.rating)}</Text>
      </View>
    )
  }

  render() {
    console.log(this.props)
    return(
      <View>
        <Text style={styles.heading}>Does this look right?</Text>
        {this.renderProfile()}
        {this.renderInstruments()}
        <Button title='Finish' onPress= {this.handleSubmit}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
  },
})

const mapStateToProps = state => {
  return {
    formData: state.profileForm.formData,
  }
}

export default connect(mapStateToProps, null)(FormSummary)
