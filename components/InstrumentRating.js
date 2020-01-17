import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { Rating } from 'react-native-elements'
import { updateFormData } from '../actions/updateFormData'
import { connect} from 'react-redux'

const GUITAR_IMAGE = require('../assets/images/guitar.png')
const DRUMS_IMAGE = require('../assets/images/drums.png')
const BASS_IMAGE = require('../assets/images/bass.png')
const PIANO_IMAGE = require('../assets/images/piano.png')
const VOCALS_IMAGE = require('../assets/images/vocals.png')

const instrumentIcons = {
  guitar: {icon: GUITAR_IMAGE, color: "#F53225"},
  bass: {icon: BASS_IMAGE, color: "#110655"},
  drums: {icon: DRUMS_IMAGE, color: "#5e868e"},
  piano: {icon: PIANO_IMAGE, color: "#dfc645"},
  vocals: {icon: VOCALS_IMAGE, color: "#C0C0C0"}
}

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

class InstrumentRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instrumentValues: {instruments: {}}
    }
  }

  handleNext = () => {
    const instrumentObject = this.state.instrumentValues.instruments
    const result = Object.keys(instrumentObject).map(function(key) {
      return {instrument: key, rating: instrumentObject[key]};
    });
    return this.props.updateFormData({instruments: result})
  }

  setRating = (instrument, rating) => {
    let newVal = this.state.instrumentValues.instruments
    newVal[instrument] = rating
    this.setState({
      instrumentValues: {instruments: newVal}
    })
  }

  renderRow = (instrument) => {
    return (
      <View style={styles.row} key={instrument.item}>
        <Text style={styles.instrument_title}>{instrument.item.charAt(0).toUpperCase() + instrument.item.slice(1) + ": "}</Text>
        <Rating
          type='custom'
          ratingImage={instrumentIcons[instrument.item].icon}
          ratingColor={instrumentIcons[instrument.item].color}
          ratingBackgroundColor='white'
          ratingCount={5}
          imageSize={35}
          onFinishRating={(rating)=>{this.setRating(instrument.item, rating)}}
          style={{ paddingVertical: 10 }}/>
      </View>
    )
  }

  render () {
    return (
      <View>
        <Text style={styles.heading}>How do you rate your playing?</Text>
      <View style={styles.instrument_rating_container}>
        <FlatList
          keyExtractor={item=>item}
          data={this.props.instruments}
          renderItem={this.renderRow}
        />
      </View>
      <Button title='next' onPress= {this.handleNext}></Button>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  instrument_title: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 30,
   fontSize: 30
  },
  row: {
    paddingRight: 20,
    flex: 2,
    flexDirection: "row",
    height: 50,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
  },
  instrument_rating_container: {
    paddingTop: 100,
    marginBottom: 50
  }
})

const mapStateToProps = state => {
  return {
    instruments: state.profileForm.formData.instruments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFormData: (formData) => {
      dispatch(updateFormData(formData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentRating)
