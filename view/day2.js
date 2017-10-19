/**
 * Day 2
 * A weather app
 * Have trouble completing the animation part
 * will stçdy on the animation in later experiments
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Image,ScrollView,StatusBar,StyleSheet,Text,TouchableHighlight,View, TextInput, AsyncStorage } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

class Weather extends Component{
  static propTypes = {
    back: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      city: null,
      dataList: []
    }
  }

  componentWillMount() {
    var city = this.state.city;
    this.fetchWeatherData(city);
  }

  fetchWeatherData(city) {
    var url;
    if (!city) {
      url = "http://www.sojson.com/open/api/weather/json.shtml?city=苏州";
    } else {
      url = "http://www.sojson.com/open/api/weather/json.shtml?city=" + city;
    }

    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      if (this.judgeCity(city)) {
        if (responseData.status == 200) {
          this.setState({
            dataList: this.state.dataList.concat(
              {
                weather: responseData
              }
            ),
          });
        } else {
          alert("请输入正确的城市");
        }
      } else {
        alert("该城市已经添加");
      }
    })
    .done();
  }

  judgeCity(city) {
    var flg = true;
    if (city) {
      for (var i in this.state.dataList) {
        if (this.state.dataList[i].weather.city == city) {
          flg = false;
        }
      }
      return flg;
    }
    return flg;
  }

  _back() {
    this.props.back();
  }

  handleTextChange(addressText) {
    this.setState({
      city: addressText,
    })
  }

  // Swiper
  render() {
    var slides;
    if (!this.state.dataList) {
      slides = ( <Text>Loading...</Text> )
    } else {
      slides = this.state.dataList.map((elem, index) => {
        const dayView = elem.weather.data.forecast.map((dayElem,index1)=> {
          return (
          <View key={index1} style={styles.withinWeekLine}>
            <View style={styles.withinWeekDay}>
              <Text style={styles.withinWeekDayText}>{dayElem.date}</Text>
            </View>
            <View style={styles.withinWeekDegree}>
              <Text style={styles.withinWeekHigh}>{dayElem.high}</Text>
              <Text style={styles.withinWeekLow}>{dayElem.low}</Text>
            </View>
          </View>
          );
        });

        return(
          <View key={index}>
          <Image style={styles.image} source={require("./img/w3.png")}></Image>
          <ScrollView style={styles.pageContainer}  showsVerticalScrollIndicator={false}>
            <View style={styles.headInfo}>
              <Text style={styles.city}>{elem.weather.city}</Text>
              <Text style={styles.abs}>{elem.weather.data.quality}</Text>
              <Text style={styles.degree}>{elem.weather.data.wendu}</Text>
              <Text style={styles.circle}>°</Text>
            </View>
            <View style={styles.withinDay}>
              <View style={styles.withinDayGeneral}>
                <View style={styles.withinDayHead}>
                  <Text style={styles.withinDayWeek}>{elem.weather.data.yesterday.date}</Text>
                  <Text style={styles.withinDayDay}>昨天</Text>
                </View>
                <View style={styles.withinDayTail}>
                  <Text style={styles.withinDayHigh}>{elem.weather.data.yesterday.high}</Text>
                  <Text style={styles.withinDayLow}>{elem.weather.data.yesterday.low}</Text>
              </View>
            </View>
            <View style={styles.withinWeek}>
              {dayView}
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherInfoText}>{elem.weather.data.ganmao}</Text>
            </View>
            <View style={styles.weatherOther}>
              <View style={styles.weatherOtherSection}>
                <View style={styles.weatherOtherLine}>
                  <Text style={styles.weatherOtherTitle}>日出：</Text>
                  <Text style={styles.weatherOtherValue}>{elem.weather.data.yesterday.sunrise}</Text>
                </View>
                <View style={styles.weatherOtherLine}>
                  <Text style={styles.weatherOtherTitle}>日落：</Text>
                  <Text style={styles.weatherOtherValue}>{elem.weather.data.yesterday.sunset}</Text>
                </View>
              </View>
              <View style={styles.weatherOtherSection}>
                <View style={styles.weatherOtherLine}>
                  <Text style={styles.weatherOtherTitle}>湿度：</Text>
                  <Text style={styles.weatherOtherValue}>{elem.weather.data.shidu}</Text>
                </View>
              </View>
              <View style={styles.weatherOtherSection}>
                <View style={styles.weatherOtherLine}>
                  <Text style={styles.weatherOtherTitle}>风速：</Text>
                  <Text style={styles.weatherOtherValue}>{elem.weather.data.yesterday.fl}</Text>
                </View>
              </View>
            </View>
            </View>
          </ScrollView>
        </View>
        )
      });
    }

    return(
      <View style={{width: Util.size.width, height: Util.size.height}}>
        <TextInput style={styles.textInputStyle} onChangeText={(text) => this.handleTextChange(text)} ></TextInput>
        <TouchableHighlight style={styles.confirmStyle} onPress={() => this.fetchWeatherData(this.state.city)}><Text>添加新的城市</Text></TouchableHighlight>
        <Swiper 
          style={styles.wrapper} 
          showsButtons={false}
          paginationStyle={{bottom:10, paddingTop:10, borderTopColor:"rgba(255,255,255,0.7)",borderTopWidth:Util.pixel}}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
                {slides}
        </Swiper>
        <TouchableHighlight onPress={()=>this._back()} style={styles.backBtn}>
          <Icon size={17} name="ios-list-outline" style={styles.backBtnIcon}></Icon>
        </TouchableHighlight>
      </View>
    )
  }
}

export default class extends Component{
  constructor(props) {
    super(props);
    this.state ={
      city: []
    }
  }
  _back() {
    this.props.navigator.pop();
    StatusBar.setBarStyle(0);
  }

  render() {
    const { params } = this.props.navigation.state;
    return(
      <View style={styles.weatherContainer}>
        <Weather back={() => this._back()} title={params}></Weather>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer:{
    backgroundColor:"transparent",
    position: "absolute",
    width: Util.size.width,
    left:0,
    top: 10,
    height: Util.size.height - 90
  },
  headInfo:{
    paddingTop:20,
    alignItems:"center",
    paddingBottom:60,
  },
  city:{
    fontSize: 25,
    color:"#fff",
    paddingBottom: 5,
    backgroundColor:"transparent"
  },
  abs:{
    fontSize:15,
    color:"#fff",
    backgroundColor:"transparent"
  },
  degree:{
    fontSize:85,
    color:"#fff",
    fontWeight: "100",
  },
  circle:{
    fontSize:35,
    color:"#fff",
    fontWeight: "300",
    position:"absolute",
    top:130,
    right:Util.size.width/2-55,
  },
  withinDayGeneral:{
    flexDirection:"row",
    width: Util.size.width,
  },
  withinDayHead:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  withinDayTail:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  withinDayWeek:{
    fontSize:15,
    color: "#fff",
    fontWeight: "400",
    width:90,
  },
  withinDayDay:{
    fontSize:15,
    color: "#fff",
    fontWeight: "300",
    width:50,
  },
  withinDayHigh:{
    fontSize:16,
    color: "#fff",
    fontWeight: "200",
    width:90,
  },
  withinDayLow:{
    fontSize:16,
    color: "#eee",
    fontWeight: "200",
    width:90,
  },
  withinDayLowNight:{
    fontSize:16,
    color: "#aaa",
    fontWeight: "200",
    width:30,
  },
  withinDayHoursBox:{
    width:55,
  },
  withinDayHoursContainer:{
    marginTop:3,
    borderTopColor:"rgba(255,255,255,0.7)",borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)",borderBottomWidth:Util.pixel
  },
  withinDayHours:{
    paddingLeft:7,paddingTop:10,paddingBottom:10,paddingRight:10,
    flexDirection:"row",
    flexWrap:"nowrap"
  },
  withinDayHoursTime:{
    color:"#fff",
    fontSize:12,
    textAlign:"center"
  },
  withinDayHoursTimeBold:{
    color:"#fff",
    fontSize:13,
    textAlign:"center",   
    fontWeight:"500",
  },
  withinDayHoursIcon:{
    textAlign:"center",
    paddingTop:5,
  },
  withinDayHoursDegree:{
    color:"#fff",
    fontSize:14,
    paddingTop:5,
    textAlign:"center"
  },
  withinDayHoursDegreeBold:{
    color:"#fff",
    fontSize:15,
    textAlign:"center",
    paddingTop:5,
    fontWeight:"500"
  },
  withinWeek:{
    paddingTop:20
  },
  withinWeekLine:{
    flexDirection:"row",
    height: 30
  },
  withinWeekDay:{
    justifyContent:"center",
    alignItems:"flex-start",
    flex:1,
  },
  withinWeekIcon:{
    justifyContent:"center",
    alignItems:"center",
    flex:1, 
  },
  withinWeekDegree:{
    justifyContent:"flex-end",
    alignItems:"center",
    flex:1,
    flexDirection:"row",
    paddingRight: 60,
  },
  withinWeekHigh:{
    color:"#fff",
    width:85,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekIconIcon:{
    color:"#fff"
  },
  withinWeekLow:{
    color:"#eee",
    width:90,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekLowNight:{
    color:"#aaa",
    width:35,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekDayText:{
    color:"#fff",
    paddingLeft:20,
    fontSize:15,
  },
  weatherInfo:{
    marginTop:5,
    borderTopColor:"rgba(255,255,255,0.7)", borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)", borderBottomWidth:Util.pixel
  },
  weatherInfoText:{
    color:"#fff",
    fontSize:15,
    paddingTop:10,paddingLeft:20,paddingBottom:10,paddingRight:20,
  },
  weatherOther:{
    paddingTop:10
  },
  weatherOtherSection:{
    paddingBottom:10
  },
  weatherOtherLine:{
    flexDirection:"row",
    flexWrap:"nowrap"
  },
  weatherOtherTitle:{
    width: Util.size.width/2-15,
    color:"#fff",
    textAlign:"right",
    fontSize: 15,
  },
  weatherOtherValue:{
    width: Util.size.width/2,
    paddingLeft:15,
    flex:1,
    fontSize: 15,
    color:"#fff",
  },
  backBtn:{
    position:"absolute", 
    right:20,bottom:7
  },
  backBtnIcon:{
    color:"#fff"
  },
})
