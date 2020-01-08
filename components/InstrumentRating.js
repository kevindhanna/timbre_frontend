import React, { Component, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Rating } from 'react-native-elements'
// import { FlatList } from 'react-native-gesture-handler';

const GUITAR_IMAGE = require('../assets/images/guitar.png')

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

export default class InstrumentRating extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.instruments)
  }

  renderRow = (instrument) => {
    console.log(instrument, "instrument")
    return (
      <View style={styles.row}>
        <Text style={styles.instrument_title}>{instrument.item.charAt(0).toUpperCase() + instrument.item.slice(1) + ": "}</Text>
        <Rating
          type='custom'
          ratingImage={GUITAR_IMAGE}
          ratingColor='#F53225'
          ratingBackgroundColor='white'
          ratingCount={5}
          imageSize={35}
          onFinishRating={console.log}
          style={{ paddingVertical: 10 }}/>
      </View>
    )
  }

  // renderRow ({ item }) {
  //   return (
  //     <ListItem
  //       roundAvatar
  //       title={item.name}
  //       subtitle={item.subtitle}
  //       avatar={{uri:item.avatar_url}}
  //     />
  //   )
  // }
  render () {
    return (
      <View style={styles.instrument_rating_container}>
        <FlatList
          data={this.props.instruments}
          renderItem={this.renderRow}
        />
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
  instrument_rating_container: {
    paddingTop: 100,
    marginBottom: 50
  }
})