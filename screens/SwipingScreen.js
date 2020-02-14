import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  Button,
  PanResponder
} from 'react-native';

const basses = [
      {
      	id: 1,
      	description: "Sick Lad Jazzy Boi",
      	uri: "https://www.fmicassets.com/demandware/assets/electric-bass/precision/overview/0193602700_m1240_0000.jpg"

      },
      {
      	id: 2,
      	description: "Mad Lad Thumby Boi",
      	uri: "https://www.ibassmag.com/wp-content/uploads/2017/04/1274030004BWBPOWWW_03.jpg"

      },
      {
      	id: 3,
      	description: "What a Metal Lad",
      	uri: "https://cdn3.volusion.com/nvcpd.gmazx/v/vspfiles/photos/SpectorLegend5-2.jpg"
      },
      {
      	id: 4,
      	description: "Shredlord Bezzy Boi",
      	uri: "https://bassmusicianmagazine.com/wp-content/uploads/2016/11/Ibanez-SR-756-6-string-Bass-Review.png"

      }
    ]

    const SCREEN_HEIGHT = Dimensions.get('window').height
    const SCREEN_WIDTH = Dimensions.get('window').width


export default class SwipingScreen extends Component {

  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });
    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    };
    this.likeOpacity = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [0, 0, 1],
       extrapolate: 'clamp'
    });
    this.nopeOpacity = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [1, 0, 0],
       extrapolate: 'clamp'
    });
    this.nextCardOpacity = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [1, 0, 1],
       extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [1, 0.8, 1],
       extrapolate: 'clamp'
    })
    this.state = {
      currentIndex: 0
    }
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({
              currentIndex: this.state.currentIndex + 1
            }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({
              currentIndex: this.state.currentIndex + 1
            }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
             toValue: { x: 0, y: 0 },
             friction: 4
          }).start()
        }
      }
    })
  }

  renderBasses = () => {
     return basses.map((bass, i)=> {
       if (i < this.state.currentIndex) {
         return null;
       } else if (i == this.state.currentIndex) {
         return(
           <Animated.View
             {...this.PanResponder.panHandlers}
             key={i}
             style={
              [
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute'
                }
              ]
          }>

          <Animated.View
             style={{
               opacity: this.likeOpacity,
               transform: [{ rotate: "-30deg" }],
               position: "absolute",
               top: 50,
               left: 40,
               zIndex: 1000
             }}>
             <Text
              style={{
                 borderWidth: 1,
                 borderColor: "green",
                 color: "green",
                 fontSize: 32,
                 fontWeight: "800",
                 padding: 10
               }}
               >
               LIKE
             </Text>
          </Animated.View>
         <Animated.View
           style={{
             opacity: this.nopeOpacity,
             transform: [{ rotate: "30deg" }],
             position: "absolute",
             top: 50,
             right: 40,
             zIndex: 1000
           }}>
           <Text
             style={{
               borderWidth: 1,
               borderColor: "red",
               color: "red",
               fontSize: 32,
               fontWeight: "800",
               padding: 10
             }}>
             NOPE
           </Text>
         </Animated.View>
             <Image
               style={{
                 flex: 1,
                 height: null,
                 width: null,
                 resizeMode: "cover",
                 borderRadius: 20
               }}
               source={{uri: bass.uri}}
             />
           </Animated.View>
         )
       } else {
         return(
           <Animated.View
             key={i}
             style={[
                {
                  opacity: this.nextCardOpacity,
                  transform:[{scale: this.nextCardScale}],
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute'
                }]
          }>
             <Image
               style={{
                 flex: 1,
                 height: null,
                 width: null,
                 resizeMode: "cover",
                 borderRadius: 20
               }}
               source={{uri: bass.uri}}
             />
           </Animated.View>
         )
       }
     }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 10 }}/>
        <View style={{ flex: 1 }}>
          {this.renderBasses()}
        </View>
        <View style={{ height: 60 }}/>
      </View>
    );
  }
}
