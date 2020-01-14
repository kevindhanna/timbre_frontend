import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect} from 'react-redux'


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
    return(
      <Text>{this.props}</Text>
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

  renderRow = (listItem) => {
    return(
      <View>
        <Text>{listItem.item.instrument + ':' + this.proficencySummary(listItem.item.rating)}</Text>
      </View>
    )
  }


  render() {
    return(
      <View>
        {this.renderProfile()}
        {this.renderInstruments()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,

  }
}

export default connect(mapStateToProps, null)(FormSummary)
