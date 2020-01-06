import React, { Component } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

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

export default class InstrumentMultiSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedItems: []
    }
  }


  onSelectedItemsChange = selectedItems => {
    console.log('inside function', selectedItems)
    this.setState({ selectedItems });
  };



  render = () => {
    console.log(items, this.state.selectedItems, this.onSelectedItemsChange)
    const {selectedItems} = this.state
    let selector
    return (
      <View style={{ flex: 1 }}>
        <MultiSelect
          items={items}
          uniqueKey="id"
          ref={(component) => {selector = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
          {console.log(selector)}
        </View>
      </View>
    );
  }
}
