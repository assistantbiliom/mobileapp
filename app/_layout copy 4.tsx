import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, Alert, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/global';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SessionProvider, useSession } from '../src/context/SessionContext';

import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, showToastMessage} from '../src/commonfunctions';

import { useTranslation } from 'react-i18next'; 


import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';


// Git commit test 


import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
// son degisiklik 
  const [mSessionToken, setmSessionToken] = useState(0); 
//  const { mSessionToken, setmSessionToken } = useSession();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { t } = useTranslation();

  const socialPlatforms = [
    { name: 'google', color: '#DB4437'},
    { name: 'apple', color: '#000000' },
    { name: 'facebook', color: '#1877F2' },
    { name: 'twitter', color: '#1DA1F2' },
  ];

  const [agreementIsSelected, setAgreementSelected] = useState(true);

  const [userInfo, setUserInfo] = useState(null);


  


  GoogleSignin.configure({
    webClientId: '49834723992-qrtv1rgpisc5heqr1e07ftt9et6u8d0c.apps.googleusercontent.com',
    iosClientId: '49834723992-1vutq00ihqi4e5jjr8rqvk3of4ultv3b.apps.googleusercontent.com',
    offlineAccess: true, // Get refresh token
    forceCodeForRefreshToken: true,
  });



  const handleSocialLogin = (platformName) => {

  

    if (!agreementIsSelected) {
      // Alert.alert('Error', "You should accept agreement");
      showToastMessage('error', t("appmessages.logincheckbox.header"), t("appmessages.logincheckbox.message"));
      return;
    }
    switch (platformName) {
      case 'google':
/*        apiCallTest();
        return;
*/
        signInWithGoogle();
        break;
      case 'apple':
        signInWithApple();
        break;
      case 'facebook':
//        loginWithFacebook();
        googleSignOut();
        break;
      case 'twitter':
//        loginWithTwitter();
        break;
      default:
        console.log('Unknown platform:', platformName);
    }    
  };

  const handleLoginBackend = async (
        platformName, 
        authCode, 
        type,
        name,
        surname, 
        email,
        photo, 
        mSessionToken
    ) => {

      const response = await apiCall(
          1, 
          'signin', 
          'POST', 
          JSON.stringify(
            { 
              "platformName": platformName,
              "authCode" : authCode,
              "type": type,
              "name": name,
              "surname": surname,
              "email": email,
              "photo" : photo,
              "mSessionToken": mSessionToken 
            }
          ) 
        );
      

        if (type==2 ) {   // login with 3rty party auth services
//          console.log("login-1");
          if (response.S == 200) {
            console.log("login-2");
            storeData(response.mSessionToken);
            setmSessionToken(response.mSessionToken)
          } else {
            showToastMessage('error', t("appmessages.loginerror.header"), t("appmessages.loginerror.message"));      
//            console.log("login-3");
            setmSessionToken(0); // return to login page
          }
        }  
        else {   // login with locally stored mSessionToken
          if (response.S == 200) {
            setmSessionToken(response.mSessionToken)
            storeData(response.mSessionToken);
            console.log("login-4");
            console.log("Login with locally stored token is sucessfull");
            console.log("New mSessionToken = ", response.mSessionToken); 
          }
          else if (response.S == 400) { //return to login screen 
            console.log("login-5");
            console.log("Login with locally stored token is not sucessfull");
            setmSessionToken(0);
            AsyncStorage.clear()   
          }
          else if (response.S == 410) { //return to login screen 
            showToastMessage('error', t("appmessages.loginerrortokenexpire.header"), t("appmessages.loginerrortokenexpire.message")); 
            console.log("login-6");
            console.log("Login with locally stored token is expired");
            setmSessionToken(0);
            AsyncStorage.clear()   
          }
          else  { //return to login screen 
            showToastMessage('error', t("appmessages.loginerror.header"), t("appmessages.loginerror.message")); 
            console.log("login-6");
            console.log("Login with locally stored token is not sucessfull. Unknown Error");
            setmSessionToken(0);
          }

    }


  };    

  const signInWithApple = async () => {
    try {
      // Perform the login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      
      console.log("1---------------------------");

      console.log(appleAuthRequestResponse);
      console.log("2---------------------------");
    
      const {
        user,
        email,
        fullName,
        identityToken,
        authorizationCode,
      } = appleAuthRequestResponse;

      console.log('Apple Sign-In Success!');

      console.log("1: ", appleAuthRequestResponse.authorizationCode);
      console.log("2: ", appleAuthRequestResponse.email);
      console.log("3: ", appleAuthRequestResponse.fullName.givenName);
      console.log("4: ", appleAuthRequestResponse.fullName.familyName);
      console.log("5: ", appleAuthRequestResponse.identityToken);
      


      await handleLoginBackend(
        "apple", 
        appleAuthRequestResponse.authorizationCode, 
        2, 
        appleAuthRequestResponse.fullName.givenName,
        appleAuthRequestResponse.fullName.familyName,
        appleAuthRequestResponse.email,
        "",
        "mSessionToken"
      );

      // TODO: Send identityToken to your backend for verification / JWT auth
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('User canceled Apple Sign-In');
      } else {
        console.error(error);
      }
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };


  const signInWithGoogle = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const loginresponse = await GoogleSignin.signIn();

      if (loginresponse.type == "success") {
          console.log("----------");
          console.log(loginresponse.data.user.givenName);
          console.log(loginresponse.data.user.familyName);
          console.log(loginresponse.data.user.email);
          console.log(loginresponse.data.idToken);
          console.log(loginresponse.data.serverAuthCode);
          console.log(loginresponse.data.user.photo);
          console.log(loginresponse.type);
          console.log("----------");
          await handleLoginBackend(
            "google", 
            loginresponse.data.idToken, 
            2, 
            loginresponse.data.user.givenName,
            loginresponse.data.user.familyName,
            loginresponse.data.user.email,
            loginresponse.data.user.photo,
            "mSessionToken"
          );

         //handleLoginBackend("google", loginresponse.data.serverAuthCode,1,"mSessionToken");
    }

    } catch (error) {
      showToastMessage('error', t("appmessages.loginerror.header"), t("appmessages.loginerror.message"));      
      console.error(error);
    }
  };  

  const storeData = async (localmSessionToken) => {
    try {
      await AsyncStorage.setItem('mSessionToken', localmSessionToken);
        console.log("mSessionToken is stored locally")
//      Alert.alert('Success', 'Data stored successfully!');
    } catch (error) {
        console.log("Having issue during storing mSessionToken locally")
      //      Alert.alert('Error', 'Failed to store data.');
    }
  };


  const retrieveLocalData = async () => {
//  Clean Application data during tests if needed
//    AsyncStorage.clear()   

    try {
      const localmSessionToken = await AsyncStorage.getItem('mSessionToken');
      if (localmSessionToken !== null) {
//        Alert.alert('Retrieved Value', localmSessionToken);

        setmSessionToken(localmSessionToken);
        await handleLoginBackend(
          "", 
          "", 
          1, 
          "",
          "",
          "",
          "",
          mSessionToken
        );
      } else {
        console.log("no locally stored key found for mSessıonToken");
        setmSessionToken(0);
//        Alert.alert('No Value Found', 'No data is stored under this key.');
      }
    } catch (error) {
      console.log("There is an issue to reach locally stored mSessionToken");
//      Alert.alert('Error', 'Failed to get data.');
    }
  };

  
  useEffect(() => {
    console.log("XXXXXXXX");
    retrieveLocalData();
    console.log("XXXXXXXX");
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  if (mSessionToken !== 0)  {
    console.log("-------------", mSessionToken);

    return (
      <SessionProvider initialToken={mSessionToken}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SessionProvider>
    );
  
 /*   
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" 
            options={{ headerShown: false }} 
            initialParams={{ mSessionToken: mSessionToken }} 
            />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
*/
  }  
  else {
    return (

      <View style={globalStyles.loginPage.maincontainer}>
          <View style={globalStyles.loginPage.headcontainer}>
            <Text style={globalStyles.loginPage.welcometext}>Welcome</Text>
            <View  style={globalStyles.loginPage.logocontainer}>
              <Text style={globalStyles.loginPage.biliomMain}>BilioM</Text>
              <Text style={globalStyles.loginPage.biliomSub}>Your Personal Assistant</Text>
            </View>
          </View>
          <View style={globalStyles.loginPage.midcontainer}>
            <Text style={globalStyles.loginPage.signintext}>Signin/Signup with </Text>
            <View style={globalStyles.loginPage.socialcontainer}> 
                {socialPlatforms.map((platform, index) => (
                <TouchableOpacity key={index} style={[globalStyles.loginPage.socialbuttonrow, { backgroundColor: platform.color }]}
                  onPress={() => handleSocialLogin(platform.name)}> 
                  <Icon name={platform.name} size={24} color="#fff" />
                </TouchableOpacity>
                ))}
            </View>
          </View>
          <View style={globalStyles.loginPage.toastcontainer}>
              <Toast />
            </View>
          <View style={globalStyles.loginPage.checkboxcontainer}>
              <CheckBox
                value={agreementIsSelected}
                onValueChange={setAgreementSelected}
                tintColors={{ true: '#4CAF50', false: '#D32F2F' }} // Border color when checked & unchecked
                onCheckColor="#ffffff" // Checkbox checkmark color
                onFillColor="#4CAF50" // Checkbox background color when checked
                onTintColor="#4CAF50" // Border color when checked
                tintColor="#D32F2F" // Border color when unchecked
                style={{ width: 25, height: 25 }} // Adjust size
              />
              <Text style={globalStyles.loginPage.checkboxlabel}>Approving agreement?</Text>
            </View>
        </View>
   )
  } // No login
}

