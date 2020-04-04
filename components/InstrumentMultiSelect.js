import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { updateFormData } from '../actions/updateFormData'
import { connect} from 'react-redux'

const items = [{
    id: 'guitar',
    name: 'Guitar'
  }, {
    id: 'bass',
    name: 'Bass'
  }, {
    id: 'drums',
    name: 'Drums'
  }, {
    id: 'vocals',
    name: 'Vocals'
  }, {
    id: 'piano',
    name: 'Piano'
  }
];

class InstrumentMultiSelect extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedItems: [],
      loading: true
    }
  }

  handleNext = () => {
    this.props.updateFormData({
      instruments: this.state.selectedItems
    })
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render = () => {
    const {selectedItems} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>What do you play?</Text>
        <View style={styles.multiSelect}>
          <MultiSelect
            items={items}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            // onChangeInput={ (text)=> console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Done"
          />
          </View>
        <Button title='next' onPress= {this.handleNext}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    marginTop: 100
  },
  multiSelect: {
    height: '50%',
    width: '100%',
    marginVertical: 40,
    justifyContent: 'center'
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
  },
})
const mapDispatchToProps = dispatch => {
  return {
    updateFormData: (formData) => {
      dispatch(updateFormData(formData))
    }
  }
}
export default connect(null, mapDispatchToProps)(InstrumentMultiSelect)
