import { Animated, StyleSheet, Image, TextInput, Platform, Button, View, Text, TouchableOpacity, Keyboard, Modal } from 'react-native';
import React, { Profiler, useEffect, useRef, useState } from 'react';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
// import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSession } from '../../src/context/SessionContext';

import { useNavigation } from '@react-navigation/native';

import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { handleLogout } from '../../src/commonfunctions';


import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';


// import PhoneInput from "react-native-phone-number-input";

import PhoneInput, {
  isValidPhoneNumber,
} from 'react-native-international-phone-number';


import { Tabs, useLocalSearchParams } from 'expo-router';
import {apiCall, showToastMessage } from '../../src/commonfunctions';

import Toast from 'react-native-toast-message';


import {globalStyles,
          BRANDCOLOR_INPUTDATA,
          BRANDCOLOR_BORDERICON,
          BRANDCOLOR_DISABLED,
          BRANDCOLOR_NEGATIVE
      } from '../../styles/global';


import '../../src/localization/i18n';
import { useTranslation } from 'react-i18next'; 
import i18n from '../../src/localization/i18n';

export default function TabTwoScreen() {

  const navigation = useNavigation();
  const router = useRouter();

  const { mSessionToken, setmSessionToken } = useSession();

  const { t } = useTranslation();

  const [userprofile, setuserprofile] = useState('');

  const [newCommEmail, setNewCommEmail] = useState('');
  const [newCommEmailValid, setNewCommEmailValid] = useState(true);

  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');



  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask((f) => !f);

  const modalpwdiconsource = {
    uri:
      'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
  };

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[globalStyles.profilePage.codeverificationmodalCell, isFocused && globalStyles.profilePage.codeverificationmodalFocusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const [phoneCountry, setPhoneCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [phoneFullNumber, setPhoneFullNumber] = useState('');


  const checkphoneNumberChange = () => {


    const code1 = String(phoneCountry.callingCode).trim();
    const code2 = String(userprofile.phoneCallingCode).trim();


/*
    console.log("???????????????????????????"); 
    console.log("|",phoneNumber,"|");
    console.log("|",userprofile.phone,"|");
    console.log("|",phoneCountry.callingCode,"|");
    console.log("|",userprofile.phoneCallingCode,"|");
    console.log(phoneNumber != userprofile.phone);

    console.log(phoneCountry != userprofile.phoneCallingCode);

    console.log((phoneNumber != userprofile.phone) || (phoneCountry != userprofile.phoneCallingCode));


    console.log("Type of phoneCountry.callingCode:", typeof phoneCountry.callingCode);
    console.log("Type of userprofile.phoneCallingCode:", typeof userprofile.phoneCallingCode);


    console.log("code1:", code1, "length:", code1.length);
    console.log("code2:", code2, "length:", code2.length);
    console.log("Are they different?", code1 !== code2);

    console.log("???????????????????????????"); 
*/
    return     ((phoneNumber !== userprofile.phone) || (code1 !== code2))

  };


  function handlePhoneNumberChange(phoneNumber) {

    setPhoneNumber(phoneNumber);

  /*
    console.log("***********************");
    console.log("|",phoneNumber,"|");
    console.log("|",userprofile.phone,"|");
    console.log("|",phoneUpdateRaw,"|");
    console.log("***********************");
  

    if (phoneNumber.replace(/\s/g, "") !== userprofile.phone) {
      phoneUpdateRaw  = true; 
      
//      setPhoneUpdateRaw(true);
      console.log("111111111 :", phoneNumber, "-", userprofile.phone);
//      console.log(phoneNumber.replace(/\s/g, ""));
      console.log("***********************");
      console.log("|",phoneNumber,"|");
      console.log("|",userprofile.phone,"|");
      console.log("|",phoneUpdateRaw,"|");
      console.log("***********************");

    } else {
      phoneUpdateRaw = false; 
//      setPhoneUpdateRaw(false);      
      console.log("2222222222 :", phoneNumber, "-", userprofile.phone);
    }
    console.log("888888 - phoneCountry : ",phoneCountry," phoneNumber : ", phoneNumber," userphoneCallingCode : ", userprofile.phoneCallingCode, " userphone : ", userprofile.phone );
*/
  }

  function handlePhoneCountryChange(country) {
    setPhoneCountry(country);

/*    
    if (country.callingCode !== userprofile.phoneCallingCode) {
      phoneUpdateRaw = true; 
//      setPhoneUpdateRaw(true);
      console.log("33333333 :", country.callingCode, "-", userprofile.phoneCallingCode);
    } else {
      phoneUpdateRaw = false;
//      setPhoneUpdateRaw(false);
      console.log("44444444 :", country.callingCode, "-", userprofile.phoneCallingCode);
      
    }
    console.log("9999999 - phoneCountry : ",phoneCountry," phoneNumber : ", phoneNumber," userphoneCallingCode : ", userprofile.phoneCallingCode, " userphone : ", userprofile.phone );

*/

  }



//  const { mSessionToken } = useLocalSearchParams(); // Retrieve mSessionToken
//  console.log("Profile --- Received mSessionToken:", mSessionToken);

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputEmail)) {
      console.log("Invalid email format");
      setNewCommEmailValid(false);
//      setError("Invalid email format");
    } else {
      setNewCommEmailValid(true);
      console.log("Valid email format");
//      setError("");
    }
  };


  const getProfile = async () => {
    try {
      const data = await apiCall(1, 'getprofile', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
          }
        )
      );  

      console.log("Profile data:", data);
      console.log(data.S);
      console.log(data.username)
      console.log(data.name)
      console.log(data.surname)
      console.log(data.comm_email)
      console.log(data.phoneCallingCode)
      console.log(data.phone)
      console.log(data.preferred_language)


      if (data.S == 200) {
        setuserprofile(data);
        setNewCommEmail(data.comm_email);
        setNewName(data.name);
        setNewSurname(data.surname);   
        setPhoneNumber(data.phone);
        setPhoneCountry(data.phoneCallingCode);
        setNewLanguage(data.preferred_language);
        i18n.changeLanguage(data.preferred_language);   
        setPhoneFullNumber(data.phoneCallingCode + data.phone);
        setLoadingData(false);
      } else if (data.S == 400) {
        showToastMessage('error', t("appmessages.unknownerror.header"), t("appmessages.unknownerror.message"));         
        setTimeout(() => {
          handleLogout(setmSessionToken);
          console.log("Token issues ...");
        }, 1000);              
      }
      else {
        showToastMessage('error', t("appmessages.unknownerror.header"), t("appmessages.unknownerror.message"));   
        setTimeout(() => {
          handleLogout(setmSessionToken);
          console.log("Other issues ...");
        }, 1000);              
//        handleLogout(setmSessionToken) ;
//        console.log("Other issues ...")
      }
    } catch (error) {
       console.log("Error fetching profile :", error);
       setLoadingData(false)
    }
  };


  const verifyValidationToken = async (type, code) => {

    let response; 

    if (type===1) {    // Validate validation token for Email Validation
      console.log("Validate validation token for Email Validation")
      response = await apiCall(1, 'validation', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 1,
            "verificationCode": code, 
          }
        )
      );  
    } else if (type===2) {  // Set new communication phone

      console.log("Validate validation token for Email Validation")

      response = await apiCall(1, 'validation', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 2,
            "verificationCode": code, 
          }
        )
      );  
     /* 
      if (response.S === 200) {  
        showToastMessage('info', t("appmessages.verificationcodesuccess.header"), t("appmessages.verificationcodesuccess.message"));         
      } else if (response.S === 500) {
        showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
      } else if (response.S === 400) {
        console.log("Redirect to login page ...")
      }
*/
    }
    console.log("----------------------");
    console.log(response);
    console.log("----------------------");
    return response;
  };


  const sendValidationToken = async (type, newCommEmail, newPhoneCountry, newPhoneNumber) => {

    let response;

    if (type===1) {    // Validate validation token for Email Validation
      console.log("Validate validation token for Email Validation")
      response = await apiCall(1, 'sendvalidationtoken', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 1,
            "newCommEmail": newCommEmail, 
          }
        )
      );  

      if (response.S === 200) {
        setModalVisible(true);  
        showToastMessage('info', t("appmessages.verificationcodesuccess.header"), t("appmessages.verificationcodesuccess.message"));         
      } else if (response.S === 500)  {
        showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
      } else if (response.S === 510)  {
        showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
      } else if (response.S === 400) {
        console.log("Redirect to login page ...")
      }
  
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(response);
      console.log(response.S);
      console.log(response.statusCode);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  
    } else if (type===2) {  // Set new communication phone

      console.log("Validate validation token for Phone Number Validation")

      response = await apiCall(1, 'sendvalidationtoken', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 2,
            "newPhoneCountry": newPhoneCountry, 
            "newPhoneNumber": newPhoneNumber
          }
        )
      );  
    }
    /*
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(response);
    console.log(response.S);
    console.log(response.statusCode);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    */
    if (response.S === 200) { 
      setModalVisible(true); 
      showToastMessage('info', t("appmessages.verificationcodesuccess.header"), t("appmessages.verificationcodesuccess.message"));         
    } else if (response.S === 510) {
      showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
    } else if (response.S === 500)  {
      showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
    } else if (response.S === 400) {
      console.log("Redirect to login page ...")
    }

  };


  const handleSignOut = async () => {
    try {
      console.log('Signing out, current mSessionToken:', mSessionToken);
      await AsyncStorage.clear(); // Clear stored session token
      setmSessionToken(0); // Reset session token
      // Wait for state update to ensure mSessionToken is 0
      await new Promise(resolve => setTimeout(resolve, 0));
      console.log('Navigating to sign-in screen');
      router.replace('/'); // Navigate to root to show sign-in screen
      showToastMessage('info', t("appmessages.signout.header"), t("appmessages.signout.message"));
    } catch (error) {
      console.error('Sign-out failed:', error);
      showToastMessage('error', t("appmessages.signoutfail.header"), t("appmessages.signoutfail.message"));
    }
  };

  const updateCommEmail = async (type) => {

    if (type===2) {    // Cancel new communication email
      console.log("Update screens for comm email with the date")
      console.log(newCommEmail)

      setNewCommEmail(userprofile.comm_email);
      setNewCommEmailValid(true);
    } else if (type===1) {  // Set new communication email

      console.log("Test .......  Email update ...  ")

      const response = await apiCall(1,'updateprofile', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 1,
            "newCommEmail": newCommEmail, 
          }
        )
      );  
      console.log("Update respose:", response);
      if (response.S === 200) {
        setuserprofile((prevProfile) => ({
          ...prevProfile, // Keep existing data
          comm_email: newCommEmail, // Update email
        }));   
        showToastMessage('info', t("appmessages.commemailupdatesuccess.header"), t("appmessages.commemailupdatesuccess.message"));         
      } else if (response.S === 500) {
        console.log("Email update failed .... ") ;
        handleSignOut();
 //       setmSessionToken(0);
//        navigation.navigate('orders');
        showToastMessage('error', t("appmessages.commemailupdatefail.header"), t("appmessages.commemailupdatefail.message"));
//        router.replace('/(tabs)/orders')
//        navigation.navigate('orders');
//        router.replace('/(tabs)/orders');
          // Redirect after short delay
 //         await AsyncStorage.clear();    
/*
          setTimeout(() => {
          
            router.replace('/');

          }, 100);
*/
 //       try {
//          console.log('Navigating to sign-in screen');
//          router.replace('/'); // Navigate to root to show sign-in screen
//        } catch (error) {
//          console.error('Navigation failed:', error);
//        }
      } else if (response.S === 400) {
        console.log("Redirect to login page ...")
      }

    }
    setModalVisible(false);
  };


  const updatePreferredLanguage = async (selectedLanguage) => {

    if (selectedLanguage !== userprofile.preferred_language) {
      const response = await apiCall(1, 'updateprofile', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 3,
            "preferred_language": selectedLanguage, 
          }
        )
      );  
      if (response.S === 200) {
        setuserprofile((prevProfile) => ({
          ...prevProfile, // Keep existing data
          preferred_language: selectedLanguage, // Update email
        }));
        setNewLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);   
        showToastMessage('info', t("appmessages.languageupdatesuccess.header"), t("appmessages.languageupdatesuccess.message"));         
      } else if (response.S === 500) {
        showToastMessage('error', t("appmessages.languageupdatefail.header"), t("appmessages.languageupdatefail.message"));
      } else if (response.S === 400) {
        console.log("Redirect to login page ...")
      }
    }
  };



  const updateNameSurname = async (type) => {

    if (type===2) {    // Cancel Change
      setNewName(userprofile.name);
      setNewSurname(userprofile.surname); 
    } else if (type===1) {  // Set change

      const response = await apiCall(1, 'updateprofile', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 4,
            "newName": newName,
            "newSurname": newSurname,
          }
        )
      );  
      console.log("Update respose:", response);
      if (response.S === 200) {
        setuserprofile((prevProfile) => ({
          ...prevProfile, // Keep existing data
          name: newName,
          surname: newSurname,
        }));   
        showToastMessage('info', t("appmessages.namesurnameupdatesuccess.header"), t("appmessages.namesurnameupdatesuccess.message"));         
      } else if (response.S === 500) {
        showToastMessage('error', t("appmessages.namesurnameupdatefail.header"), t("appmessages.namesurnameupdatefail.message"));
      } else if (response.S === 400) {
        console.log("Redirect to login page ...")
      }

    }
  };



const updatePhone = async (type) => {
  if (type===2) {     //Cancell change
    setLoadingData(true);
    console.log("1111111111111111"); 
    console.log(userprofile.phone);
    console.log(userprofile.phoneCallingCode);
//    setPhoneNumber(userprofile.phone);
//    setPhoneCountry(userprofile.phoneCallingCode);

    setPhoneNumber(userprofile.phone);
 //   setPhoneCountry(userprofile.phoneCallingCode);

    setLoadingData(false);

  } else if (type===1) {  // Set new phone number
      console.log("222222222222222"); 
      const response = await apiCall(1, 'updateprofile', 
        'POST', 
        JSON.stringify (
          { 
            "mSessionToken": mSessionToken,
            "type": 2,
            "newPhoneNumber": phoneNumber,
            "newPhoneCallingCode" : phoneCountry.callingCode,
          }
        )
      );  
      
      console.log("Update respose:", response);
      if (response.S === 200) {
        setuserprofile((prevProfile) => ({
          ...prevProfile, // Keep existing data
          phone: phoneNumber, // Update Phone
          phoneCallingCode : phoneCountry.callingCode,
        }));   
        showToastMessage('info', t("appmessages.phoneupdatesuccess.header"), t("appmessages.phoneupdatesuccess.message"));         
      } else if (response.S === 500) {
        showToastMessage('error', t("appmessages.phoneupdatefail.header"), t("appmessages.phoneupdatefail.message"));
      } else if (response.S === 400) {
        console.log("Redirect to login page ...")
      }
    }
    setModalVisible(false);
  };



  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("1");

  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = () => {
    console.log('Verification Code:', verificationCode);
    setModalVisible(false); // Close modal after verification
  };

  useEffect(() => {
    getProfile();
  }, []);


//  const [selectedLanguage, setSelectedLanguage] = useState(userprofile.preferred_language);

/*
  const languageOptions = [
    { label: t("screens.profile.languages.english"), value: 'en' },
    { label: t("screens.profile.languages.turkish"), value: 'tr' },
  ];
const languageOptions = [
  { label: "English", value: 'en' },
  { label: "Turkish", value: 'tr' },
];
*/

const [openDropdown, setOpenDropdown] = useState(false);
const [newLanguage, setNewLanguage] = useState('');

const [languages, setLanguages] = useState([
  {label: t("screens.profile.languages.english"), value: 'en'},
  {label: t("screens.profile.languages.turkish"), value: 'tr'},
]);



  return (
    <View style={globalStyles.profilePage.maincontainer}>
     {loadingData ? (
        <Text>Loading...</Text> // Show loading state
      ) : (
      <>
      <View style={globalStyles.profilePage.photocontainer}>
          <Image 
            source={{ uri: userprofile.photo }} 
            style={globalStyles.profilePage.photo} 
          />
      </View>
      <View style={globalStyles.profilePage.datacontainer}>
          <View style={globalStyles.profilePage.rowcontainer}>
              <View style={globalStyles.profilePage.rowlabelcontainer}>
              <TextInput 
                      style={globalStyles.profilePage.rowlabeltextbox} 
                      editable={false} 
                      value={t("screens.profile.labels.email")}
                    />
              </View>
              <View style={globalStyles.profilePage.rowcontentcontainer}>
                  <TextInput 
                      style={globalStyles.profilePage.rowcontenttextboxreadonly} 
                      editable={false} 
                      value={userprofile.username} 
                    />
              </View>
          </View>
          <View style={globalStyles.profilePage.rowcontainer}>
              <View style={globalStyles.profilePage.rowlabelcontainer}>
              <TextInput 
                      style={globalStyles.profilePage.rowlabeltextbox} 
                      value={t("screens.profile.labels.name")}
                    />
              </View>
              <View style={globalStyles.profilePage.rowcontentcontainer}>
                  <TextInput 
                      style={globalStyles.profilePage.rowcontenttextboxeditable} 
                      value={newName} 
                      onChangeText={(text) => {
                        setNewName(text);
                      }}            

                    />
              </View>
          </View>
          <View style={globalStyles.profilePage.rowcontainer}>
              <View style={globalStyles.profilePage.rowlabelcontainer}>
              <TextInput 
                      style={globalStyles.profilePage.rowlabeltextbox} 
                      editable={false} 
                      value={t("screens.profile.labels.surname")}
                    />
              </View>
              <View style={globalStyles.profilePage.rowcontentcontainer}>
                  <TextInput 
                      style={globalStyles.profilePage.rowcontenttextboxeditable} 
                      value={newSurname} 
                      onChangeText={(text) => {
                        setNewSurname(text);
                      }}            
                    />
                  <View style={globalStyles.profilePage.rowupdatebutton}> 
                  {(newName !==  userprofile.name  || newSurname !==  userprofile.surname) && (
                      <TouchableOpacity 
                          style={[
                            globalStyles.profilePage.rowupdatebuttonpositive, 
                          ]} 
                          // onPress={handleSendMessage}
                          onPress={() => {
                            updateNameSurname(1)}
                          }
                          > 
                        <AntDesign 
                            name="check" 
                            style={globalStyles.profilePage.rowupdatebuttontext} 
                        />
                      </TouchableOpacity>
                    )}
                  {(newName !==  userprofile.name  || newSurname !==  userprofile.surname) && (
                      <TouchableOpacity 
                          style={globalStyles.profilePage.rowupdatebuttonred} 
                          onPress={() => updateNameSurname(2)}
                          > 
                        <AntDesign 
                            name="close" 
                            style={globalStyles.profilePage.rowupdatebuttontext} 
                        />
                      </TouchableOpacity>  
                    )}
                  </View>            
              </View>
          </View>
          <View style={globalStyles.profilePage.rowcontainer}>
              <View style={globalStyles.profilePage.rowlabelcontainer}>
              <TextInput 
                      style={globalStyles.profilePage.rowlabeltextbox} 
                      editable={false} 
                      value={t("screens.profile.labels.comm_email")}
                    />
              </View>
               <View style={globalStyles.profilePage.rowcontentcontainer}>
                  <TextInput 
                    style={[
                      globalStyles.profilePage.rowcontenttextboxeditable, 
                      { borderColor: newCommEmailValid ? '#dcf8c6' : 'red', borderWidth: 2 }
                    ]}
                       editable={true} 
                      value={newCommEmail} 
                      onChangeText={(text) => {
                        setNewCommEmail(text);
                        validateEmail(text);
                      }}            
                      onSubmitEditing={Keyboard.dismiss}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                   <View style={globalStyles.profilePage.rowupdatebutton}> 
                  {newCommEmail !==  userprofile.comm_email && (
                      <TouchableOpacity 
                          disabled={!newCommEmailValid}
                          style={[
                            globalStyles.profilePage.rowupdatebuttonpositive, 
                            !newCommEmailValid && { backgroundColor: 'grey', opacity: 0.5 } // Change background when disabled
                          ]} 
                          // onPress={handleSendMessage}
                          onPress={() => {
                            setValue('');
                            sendValidationToken(1, newCommEmail, "", "");
                            setModalType(1);
                          }}
                        > 
                        <AntDesign 
                            name="check" 
                            style={globalStyles.profilePage.rowupdatebuttontext} 
                        />
                      </TouchableOpacity>
                    )}
                    {newCommEmail !==  userprofile.comm_email && (
                      <TouchableOpacity 
                          style={globalStyles.profilePage.rowupdatebuttonred} 
                          onPress={() => updateCommEmail(2)}
                          > 
                        <AntDesign 
                            name="close" 
                            style={globalStyles.profilePage.rowupdatebuttontext} 
                        />
                      </TouchableOpacity>  
                    )}
                  </View>            

              </View>
          </View>
          <View style={globalStyles.profilePage.rowcontainer}>
              <View style={globalStyles.profilePage.rowlabelcontainer}>
              <TextInput 
                      style={globalStyles.profilePage.rowlabeltextbox} 
                      editable={false} 
                      value={t("screens.profile.labels.phone")}
                    />
              </View>
              <View style={globalStyles.profilePage.rowcontentcontainer}> 
                <PhoneInput                  
                  phoneInputStyles={globalStyles.profilePage.phoneinput}
                  language={userprofile.preferred_language}
//                  flagStyle={{ width: 0, height: 0 }}  // Hide the flag
                  defaultValue={phoneFullNumber}
//                  showOnly={['BR', 'PT', 'CA', 'US','TR']}
                  popularCountries={['NL', 'TR', 'CA', 'US']}
                  selectedCountry={phoneCountry}
                  value={phoneNumber}
                  onChangePhoneNumber={handlePhoneNumberChange}
                  onChangeSelectedCountry={handlePhoneCountryChange}
                  keyboardType="phone-pad" 
                />

              <View style={globalStyles.profilePage.rowupdatebutton}> 
                  { (checkphoneNumberChange())  
                    && (
                      <TouchableOpacity 
//                          disabled={isValidPhoneNumber(phoneNumber, phoneCountry)}
                          style={[
                            globalStyles.profilePage.rowupdatebuttonpositive, 
                            !isValidPhoneNumber(phoneNumber, phoneCountry) && { backgroundColor: 'grey', opacity: 0.5 } // Change background when disabled
                          ]} 
                          onPress={() => {
                            console.log("*********************");
                            Keyboard.dismiss;
                            setValue('');
                            setModalType(2);
                            sendValidationToken(2, "", phoneCountry.callingCode, phoneNumber);
                            }
                          }
                          > 
                        <AntDesign 
                            name="check" 
                            style={globalStyles.profilePage.rowupdatebuttontext} 
                        />
                      </TouchableOpacity>
                    )}
                      { (checkphoneNumberChange())  
                        && (
                      <TouchableOpacity 
                          style={globalStyles.profilePage.rowupdatebuttonred} 
                          onPress={() => {
                            Keyboard.dismiss;
                            updatePhone(2);}
                          }
                          > 
                        <AntDesign 
                            name="close" 
                            style={globalStyles.profilePage.rowupdatebuttontext} 
                        />
                      </TouchableOpacity>  
                    )}
              </View>
            </View>            
          </View>
          <View style={globalStyles.profilePage.rowcontainer}>
              <View style={globalStyles.profilePage.rowlabelcontainer}>
              <TextInput 
                      style={globalStyles.profilePage.rowlabeltextbox} 
                      value={t("screens.profile.labels.language")}
                    />
              </View>
              <View style={globalStyles.profilePage.rowcontentcontainer}>
               <DropDownPicker
                  open={openDropdown}
                  value={newLanguage}
                  items={languages}
                  setOpen={setOpenDropdown}
                    setItems={setLanguages}
                    onChangeValue={(value) => {
                      console.log(value);
                    }}
                    onSelectItem={(selectedItem) => {
                      console.log("onSelectItem: ", selectedItem);
                      Keyboard.dismiss;
                      updatePreferredLanguage(selectedItem.value);
                    }}
                    style={globalStyles.profilePage.languagecontent}

                    selectedItemContainerStyle={ globalStyles.profilePage.languageselecteditemcontainer }
                    selectedItemLabelStyle={ globalStyles.profilePage.languageselecteditemlabel }
                    showArrowIcon={true}

                />
              </View>
        </View>
      </View>
        <View style={globalStyles.profilePage.toastcontainer}>
              <Toast />
        </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={globalStyles.profilePage.codeverificationmodalcontainer}>
          <View style={globalStyles.profilePage.codeverificationmodalContent}>
            <Text style={globalStyles.profilePage.codeverificationmodaltitle}>
              {modalType === 1 
                ? t("screens.profile.verificationmodal.email.title") 
                : t("screens.profile.verificationmodal.phone.title")
              }
            </Text>
            <Image style={globalStyles.profilePage.icon} source={modalpwdiconsource} />
            <Text style={globalStyles.profilePage.subTitle}>
              {modalType === 1
                ? t("screens.profile.verificationmodal.email.subtitle") + " " + newCommEmail
                : t("screens.profile.verificationmodal.phone.subtitle") + " " +  phoneCountry.callingCode + " " + phoneNumber 
              }
            </Text>
            <View style={globalStyles.profilePage.codeverificationmodalFieldRow}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
              <Text style={globalStyles.profilePage.codeverificationmodaltoggle} onPress={toggleMask}>
                {enableMask ? '🙈' : '🐵'}
              </Text>
            </View>

            <View style={globalStyles.profilePage.buttonContainer}>
              <TouchableOpacity style={globalStyles.profilePage.verifyButton} 
                onPress={async () => {
                    if (modalType === 1) {
                      console.log("AAAAAAAAAA");
                      console.log(value);
                      const response = await verifyValidationToken(1, value);  
                  
                      console.log("****************");
                      console.log(response);
                      console.log(response.S);
                      console.log(response.statusCode);
                      console.log("****************");


                      if (response.S === 400) {
                         if (response.statusCode === 400) {
                            showToastMessage('error', t("appmessages.unknownerror.header"), t("appmessages.unkownerror.message"));
                            console.log("111111111111111111");
                            // %%%%%%%%%%%
                         } 
                         else if (response.statusCode === 430) {  // Token expire
                          console.log("811111111111111111");
                          updatePhone(2);
                          showToastMessage('error', t("appmessages.verificationfailtokenex.header"), t("appmessages.verificationfailtokenex.message"));
                         }
                         else if (response.statusCode === 420) {  // Max retry
                          console.log("211111111111111111");
                          updateCommEmail(2);
                          showToastMessage('error', t("appmessages.verificationfailmaxretry.header"), t("appmessages.verificationfailmaxretry.message"));
                         }
                         else { // Verification fail
                          console.log("311111111111111111");
                          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                          console.log("------------ Verification Failed -------------");
                          showToastMessage('error', t("appmessages.verificationfail.header"), t("appmessages.verificationfail.message"));
                         }
                      } else if (response.S === 500) {  // SQL Execution issue
                        console.log("411111111111111111");
                        updateCommEmail(2);
                        showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
                      }  else if (response.S === 200) {  // Verification is successfull 
                        updateCommEmail(1)
                      }
                
                    } else if (modalType ===2) {
                      console.log("BBBBBB");
                      const response = await verifyValidationToken(2, value);  
                  
                      console.log("****************");
                      console.log(response);
                      console.log(response.S);
                      console.log(response.statusCode);
                      console.log("****************");


                      if (response.S === 400) {
                         if (response.statusCode === 400) {
                            showToastMessage('error', t("appmessages.unknownerror.header"), t("appmessages.unkownerror.message"));
                            console.log("111111111111111111");
                            // %%%%%%%%%%%
                         } 
                         else if (response.statusCode === 430) {  // Token expire
                          console.log("811111111111111111");
                          updatePhone(2);
                          showToastMessage('error', t("appmessages.verificationfailtokenex.header"), t("appmessages.verificationfailtokenex.message"));
                         }
                         else if (response.statusCode === 420) {  // Max retry
                          console.log("211111111111111111");
                          updatePhone(2);
                          showToastMessage('error', t("appmessages.verificationfailmaxretry.header"), t("appmessages.verificationfailmaxretry.message"));
                         }
                         else { // Verification fail
                          console.log("311111111111111111");
                          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                          console.log("------------ Verification Failed -------------");
                          showToastMessage('error', t("appmessages.verificationfail.header"), t("appmessages.verificationfail.message"));
                         }
                      } else if (response.S === 500) {  // SQL Execution issue
                        console.log("411111111111111111");
                        updatePhone(2);
                        showToastMessage('error', t("appmessages.verificationcodefail.header"), t("appmessages.verificationcodefail.message"));
                      }  else if (response.S === 200) {  // Verification is successfull 
                        updatePhone(1)
                      }
                    }
                  }} > 
                <Text style={globalStyles.profilePage.verifyButtonText}>{t("screens.profile.verificationmodal.verifybutton")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={globalStyles.profilePage.cancelButton} 
                onPress={() => { 
                      if (modalType === 1) {
                        updateCommEmail(2)
                      } else if (modalType ===2) {
                        updatePhone(2);
                      }
                    }
                  } > 
                <Text style={globalStyles.profilePage.cancelButtonText}>{t("screens.profile.verificationmodal.cancelbutton")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',

/*
    marginBottom: 20,
    ...Platform.select({
      ios: {
        height: 200,
      },
      android: {
        height: 50,
      },
    }),
*/
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  pickerItem: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 18,
    color: '#333',
  },
});
