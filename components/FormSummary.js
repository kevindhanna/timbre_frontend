import React, { Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect} from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
const BACKEND_IP = require('../.env.js').BACKEND_IP

const profMap = {
  [0]: 'Novice',
  [1]: 'Beginner',
  [2]: 'Amateur',
  [3]: 'Good',
  [4]: 'Pro',
  [5]: 'God'
}

class FormSummary extends Component {

  proficencySummary = (proficency) => {
    return profMap[Math.floor(proficency)]
  }

  renderRow = (listItem) => {
    return(
      <View style={styles.row} key={listItem.item.instrument}>
        <View style={styles.rowContent}>
          <Text style={styles.instrumentTitle}>
            {listItem.item.instrument.charAt(0).toUpperCase() + listItem.item.instrument.slice(1) + ": "}
          </Text>
          <Text style={styles.insturmentProf}>{this.proficencySummary(listItem.item.rating)}</Text>
        </View>
      </View>
    )
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
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : userToken
      }
    }

    return fetch('http://' + BACKEND_IP + ':3000/users/'+ userId, data)
      .then((responseJson) => {
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const formData = this.props.formData
    const userInfo = formData.userInfo

    return(
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={
          require('../assets/images/disc-jockey.png')
        }/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.heading}>{userInfo.firstName} {userInfo.lastName}</Text>
            <View style={styles.locationContainer}>
              <Icon
                name="map-marker-alt"
                size={16}
                color="#4a93ef"
                style={styles.pin}
                />
              <Text style={[styles.location, styles.text]}>
                {formData.location.friendlyName}
              </Text>
            </View>
            <Text style={[styles.bio, styles.text]}>
              {userInfo.bio}
            </Text>
          </View>
          <View style = {styles.lineStyle} />
          <View style={styles.formInfoContainer}>
            <Text style={styles.instrumentHeading}>Instruments</Text>
            {this.renderInstruments()}
          </View>
          <View style={styles.footer}>
            <Text style={styles.heading}>Does this look right?</Text>
            <Button
              onPress={this.handleSubmit}
              raised
              type='outline'
              title='Finish'
              titleStyle={{fontFamily: 'Nunito Bold'}}
              buttonStyle={{padding: 10, borderRadius: 10, borderWidth: 1.2}}
              containerStyle={{width: 200, marginBottom: 20, marginTop: 20, alignSelf:'center'}}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#4a93ef",
    height:200,
  },
  heading: {
    textAlign: 'center',
    fontSize: 28,
    color: "#696969",
    fontFamily: 'Nunito Bold',
    fontWeight: "600"
  },
  text: {
    fontFamily: 'Nunito Sans'
  },
  location: {
    fontSize:16,
    color: "#4a93ef",
    alignSelf: 'center',
  },
  pin:{
    marginRight: 5,
  },
  bio:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  instrumentHeading: {
    fontFamily: 'Nunito Bold',
    fontSize: 18,
    fontWeight: "600",
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 83,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:110,
    backgroundColor: '#EFC84A',
  },
  body:{
    marginTop:80,
    height: 400,
  },
  bodyContent: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  locationContainer: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor:'black',
    margin:15,
  },
  formInfoContainer: {
    flex: 0,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  profileForm: {
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: 'blue',
    fontFamily: 'Cute Font'
  },
  instrumentForm: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
  row: {
    marginBottom: 10,
    flex: 1,
    alignItems: 'flex-start'
  },
  rowContent: {
    flexDirection: 'row',
  },
  instrumentTitle: {
    fontFamily: 'Nunito Bold',
    fontSize: 16,
    alignSelf: 'baseline',
  },
  insturmentProf: {
    alignSelf: 'center',
    fontSize:16
  },
  footer: {
    marginVertical: 40
  }
})

const mapStateToProps = state => {
  return {
    formData: state.profileForm.formData,
  }
}


export default connect(mapStateToProps, null)(FormSummary)
