import React, { Component, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
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
      selectedItems: [],
      loading: true
    }
  }

  getValue = () => {
    return {instruments: this.state.selectedItems}
  }


  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render = () => {
    const {selectedItems} = this.state
    return (
      <View style={{ flex: 1 }}>
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
        <View>
          {/* {this.multiSelect.getSelectedItemsExt(selectedItems)} */}
        </View>
      </View>
    );
  }
}
