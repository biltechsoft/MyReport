import React, {useState} from 'react';
import { Button,StyleSheet,View,Text,ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from 'expo-checkbox';
import { useEffect } from 'react';
import storage from '../../storage';
import { API } from '../../api-service';



const Account = () => {

  const [status, setStatus] = useState(undefined); // For message

  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [accountInfo, setAccountInfo] = useState([]);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [region, setRegion] = useState();
  const [branch, setBranch] = useState();
  const [zone, setZone] = useState();
  const [unit, setUnit] = useState();
  const [responsibility, setResponsibility] = useState();

  const [branches, setBranches] = useState([]);
  const [zones, setZones] = useState([]);
  const [units, setUnits] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);

  const [start, setStart] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      // found data goes to then()
      //console.log(ret.loggedin);
      setToken(ret.token);
      setUser(ret.userid);
    });   
  }, []);

  const fetchData = () => {
    API.getBranches(token)
    .then( resp =>  setBranches(resp))
    .catch (error => console.log(error));
  
    API.getUnits(token)
    .then( resp =>  setUnits(resp))
    .catch (error => console.log(error));
  
    API.getZones(token)
    .then( resp =>  setZones(resp))
    .catch (error => console.log(error));
  
    API.getResponsibilities(token)
    .then( resp =>  setResponsibilities(resp))
    .catch (error => console.log(error));
  
    API.getUser(user, token)
    .then( resp =>  setAccountInfo(resp))
    .catch (error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, [start]);

  setTimeout(() => {
    if(!accountInfo.firstName) {
      fetchData();
      console.log(accountInfo.firstName);
    } 
  }, 500);

  useEffect(() => {
    getUserInfo();
  }, [accountInfo, update]);
  
  const getUserInfo = () => {
    setFirstName(accountInfo.firstName);
    setLastName(accountInfo.lastName);
    setPhone(accountInfo.phone);
    setBranch(accountInfo.branch);
    setZone(accountInfo.zone);
    setUnit(accountInfo.unit);
    setResponsibility(accountInfo.responsibility);
  }

  const hendleSubmit = (e) => {
    const data = { 
      user, 
      firstName,
      lastName,
      phone 
    };
    API.updateUser(user, data, token)
    .then( resp => {
      console.log(resp);
        if(resp.user == user) {
            Alert.alert('Updated', 'User Info Updated!', [
              {text: 'OK'},
            ]);
            setUpdate(!update);
        }
        else {
          Alert.alert('Error', 'User Info not Updated!', [
            {text: 'DISMISS'},
          ]);
        }
    })
    .catch(error => {
      Alert.alert('Error', 'User Info not Updated!', [
        {text: 'DISMISS'},
      ]);
    });
  }

  return (
    <ScrollView>
      
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#fdeacc", "#fdeacc"]}
        style={styles.column}>
      
      {/* 
      <View style={styles.row}>
      <Text style={styles.leftpart1}>Account Info</Text>
      </View>
      */}

      

      <View style={styles.row}>
      <Text style={styles.leftpart1}>First Name</Text>
      <TextInput 
        placeholder='First Name'
        style={styles.button5}
        onChangeText = {(text)=> setFirstName(text)}
        value={firstName}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Last Name</Text>
      <TextInput 
        placeholder='Last Name'
        style={styles.button4}
        onChangeText = {(text)=> setLastName(text)}
        value={lastName}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Phone Number</Text>
      <TextInput 
        placeholder='Phone Number'
        style={styles.button4}
        onChangeText = {(text)=> setPhone(text)}
        value={phone}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Bracnh</Text>
      <Text style={styles.button4}>{branch && branches.length>=Number(branch) ? branches[Number(branch)-1].branchName : 'Admin will add Branch'}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Zone</Text>
      <Text style={styles.button4}>
      {zone && zones.length>=Number(zone) ? zones[Number(zone)-1].zoneName : 'Admin will add Zone'}
      </Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Unit</Text>
      <Text style={styles.button4}>
        {unit && units.length>=Number(unit) ? units[Number(unit)-1].unitName : 'Admin will add Unit'}
      </Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart2}>Responsibility</Text>
      <Text style={styles.button6}>
        {responsibility && responsibilities.length>=Number(responsibility) ? responsibilities[Number(responsibility)-1].responsibilityName : 'Admin will add Responsibility'}
      </Text>
      </View>


      <View style={styles.footer}>
        <View style={styles.save_share}>
          <Text style={styles.save_share_text} onPress={hendleSubmit}>Save</Text>
        </View> 
      </View>
      

      </LinearGradient>
      
    </ScrollView>
  )
}

export default Account

const styles = StyleSheet.create({
  column: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  row: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  leftpart:{
    flex:1,
    height:50,
    marginRight:2,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0095ff',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    textAlignVertical:'center',
    borderWidth:1,
    borderColor:'#0095ff',
  },
  leftpart1:{
    flex:1,
    height:50,
    padding:10,
    marginRight:2,
    marginLeft:2,
    backgroundColor:'#0095ff',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    textAlignVertical:'center',
    borderTopLeftRadius:20,
    //borderBottomRightRadius:20,
    borderWidth:1,
    borderColor:'#0095ff',
  },
  leftpart2:{
    flex:1,
    height:50,
    padding:10,
    marginRight:2,
    marginLeft:2,
    backgroundColor:'#0095ff',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    textAlignVertical:'center',
    borderBottomLeftRadius:20,
    //borderBottomRightRadius:20,
    borderWidth:1,
    borderColor:'#0095ff',
  },
  button4:{
    flex:2,
    height:50,
    fontSize:20,
    backgroundColor:'#dcdcdc',
    textAlign:'center',
    textAlignVertical:'center',
    borderWidth:1,
    borderColor:'#0095ff',
  },
  button5:{
    flex:2,
    height:50,
    fontSize:20,
    backgroundColor:'#dcdcdc',
    textAlign:'center',
    textAlignVertical:'center',
    borderWidth:1,
    borderColor:'#0095ff',
    borderTopRightRadius:20
  },
  button6:{
    flex:2,
    height:50,
    fontSize:20,
    backgroundColor:'#dcdcdc',
    textAlign:'center',
    textAlignVertical:'center',
    borderWidth:1,
    borderColor:'#0095ff',
    borderBottomRightRadius:20
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  save_share: {
    backgroundColor: '#0095ff',
    width: '40%',
    height: 40,
    marginHorizontal:10,
    marginTop:30,
    borderRadius:30
  },
  save_share_text:{
    marginTop:5,
    textAlign:'center',
    color:'white',
    fontSize:20,
    textAlignVertical:'center',
    alignItems:'center',
  }
})