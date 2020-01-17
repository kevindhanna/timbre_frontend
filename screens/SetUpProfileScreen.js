import { connect } from 'react-redux';
import React, { Component, createRef } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import InstrumentMultiSelect from '../components/InstrumentMultiSelect';
import InstrumentRating from '../components/InstrumentRating';
import FormSummary from '../components/FormSummary';
import ProfileInfo from '../components/ProfileInfo';


class SetUpProfileScreen extends Component {
  constructor(props){
    super(props)
    this._form = React.createRef()
  }

  formType = () => {
    switch (this.props.page){
      case 0:
        return(
          <ProfileInfo/>
        )
      case 1:
        return (
          <InstrumentMultiSelect />
        )
      case 2:
        return(
          <InstrumentRating/>
        )
      case 3:
        return(
          <FormSummary navigation={this.props.navigation}/> 
        )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {this.formType()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff'
  },
})

const mapStateToProps = state => {
  return {
    page: state.profileForm.page
  }
}

export default connect(mapStateToProps, null)(SetUpProfileScreen)