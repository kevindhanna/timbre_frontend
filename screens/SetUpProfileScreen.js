import { connect } from 'react-redux';
import React, { Component, createRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView
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

  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
};

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
      <ScrollView style={styles.container}
      >
        <View style={styles.formContainer}>
          {this.formType()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'red',
    paddingBottom: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 100,
    borderWidth: 2,
    borderColor: 'green',
    height: 1000
  },
})

const mapStateToProps = state => {
  return {
    page: state.profileForm.page
  }
}

export default connect(mapStateToProps, null)(SetUpProfileScreen)
