import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { Platform, Text, View, Alert, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SessionProvider, useSession } from '../src/context/SessionContext';

import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, showToastMessage } from '../src/commonfunctions';

import { useTranslation } from 'react-i18next';

import { handleLogout } from '../src/commonfunctions';

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
  // Provider is ALWAYS mounted; UI is gated by AppGate
  return (
    <SessionProvider initialToken={null}>
      <AppGate />
        <Toast />
    </SessionProvider>
  );
}

function AppGate() {
  const colorScheme = useColorScheme();
  const { mSessionToken, setmSessionToken } = useSession(); // use context, not local state
  const [loadingSession, setLoadingSession] = useState(true);



  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { t } = useTranslation();

  const socialPlatforms = [
    { name: 'google', color: '#DB4437' },
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

  const handleSocialLogin = (platformName: string) => {
    if (!agreementIsSelected) {
      // Alert.alert('Error', "You should accept agreement");
      showToastMessage('error', t("appmessages.logincheckbox.header"), t("appmessages.logincheckbox.message"));
      return;
    }
    switch (platformName) {
      case 'google':
        /* apiCallTest();
           return; */
        signInWithGoogle();
        break;
      case 'apple':
        signInWithApple();
        break;
      case 'facebook':
        // loginWithFacebook();
        googleSignOut();
        break;
      case 'twitter':
        // loginWithTwitter();
        break;
      default:
        console.log('Unknown platform:', platformName);
    }
  };

  const handleLoginBackend = async (
    platformName: string,
    authCode: string,
    type: number,
    name: string,
    surname: string,
    email: string,
    photo: string,
    tokenCandidate: string
  ) => {
    const response = await apiCall(
      1,
      'signin',
      'POST',
      JSON.stringify({
        "platformName": platformName,
        "authCode": authCode,
        "type": type,
        "name": name,
        "surname": surname,
        "email": email,
        "photo": photo,
        "mSessionToken": tokenCandidate
      })
    );

    if (type == 2) {   // login with 3rty party auth services
      // console.log("login-1");
      if (response.S == 200) {
        console.log("login-2");

        setmSessionToken(response.mSessionToken);
        await storeData(response.mSessionToken);
/*
        storeData(response.mSessionToken);
        setmSessionToken(response.mSessionToken);
*/
      } else {
        showToastMessage('error', t("appmessages.loginerror.header"), t("appmessages.loginerror.message"));
        // console.log("login-3");
        setmSessionToken('0'); // return to login page
      }
    }
    else {   // login with locally stored mSessionToken
      if (response.S == 200) {
        console.log("Previous Session Token");
        console.log(mSessionToken);
        setmSessionToken(response.mSessionToken);
        console.log("New Session Token");
        console.log(mSessionToken);
        storeData(response.mSessionToken);
        console.log("login-4");
        console.log("Login with locally stored token is sucessfull");
        console.log("New mSessionToken = ", response.mSessionToken);
      }
      else if (response.S == 400) { //return to login screen 
        console.log("login-5");
        console.log("Login with locally stored token is not sucessfull");
        showToastMessage('error', t("appmessages.loginerrortokenexpire.header"), t("appmessages.loginerrortokenexpire.message"));
        setmSessionToken('0');
//        AsyncStorage.clear();
//        handleLogout(setmSessionToken);
      }
      else if (response.S == 410) { //return to login screen 
        showToastMessage('error', t("appmessages.loginerrortokenexpire.header"), t("appmessages.loginerrortokenexpire.message"));
        console.log("login-6");
        console.log("Login with locally stored token is expired");
        setmSessionToken('0');
//        handleLogout(setmSessionToken);
//        AsyncStorage.clear();
      }
      else { //return to login screen 
        showToastMessage('error', t("appmessages.loginerror.header"), t("appmessages.loginerror.message"));
        console.log("login-6");
        console.log("Login with locally stored token is not sucessfull. Unknown Error");
        setmSessionToken('0');
//        handleLoginBackend(setmSessionToken);
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
        '0'
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

      // NOTE: some versions don't return loginresponse.type
      if (loginresponse?.data?.idToken) {
        console.log("----------");
        console.log(loginresponse.data.user.givenName);
        console.log(loginresponse.data.user.familyName);
        console.log(loginresponse.data.user.email);
        console.log(loginresponse.data.idToken);
        console.log(loginresponse.data.serverAuthCode);
        console.log(loginresponse.data.user.photo);
        console.log("----------");

        await handleLoginBackend(
          "google",
          loginresponse.data.idToken,
          2,
          loginresponse.data.user.givenName,
          loginresponse.data.user.familyName,
          loginresponse.data.user.email,
          loginresponse.data.user.photo,
          '0'
        );

        // handleLoginBackend("google", loginresponse.data.serverAuthCode,1,"mSessionToken");
      }
    } catch (error) {
      showToastMessage('error', t("appmessages.loginerror.header"), t("appmessages.loginerror.message"));
      console.error(error);
    }
  };

  const storeData = async (localmSessionToken: string) => {
    try {
      await AsyncStorage.setItem('mSessionToken', localmSessionToken);
      console.log("mSessionToken is stored locally")
      // Alert.alert('Success', 'Data stored successfully!');
    } catch (error) {
      console.log("Having issue during storing mSessionToken locally")
      // Alert.alert('Error', 'Failed to store data.');
    }
  };


  /*
  const retrieveLocalData = async () => {
    // Clean Application data during tests if needed
    // AsyncStorage.clear()   

    try {
      const localmSessionToken = await AsyncStorage.getItem('mSessionToken');
      if (localmSessionToken !== null) {
        // Alert.alert('Retrieved Value', localmSessionToken);

        setmSessionToken(localmSessionToken);
        await handleLoginBackend(
          "",
          "",
          1,
          "",
          "",
          "",
          "",
          localmSessionToken // <-- fixed: pass the value just read
        );
      } else {
        console.log("no locally stored key found for mSessıonToken");
        setmSessionToken('0');
        // Alert.alert('No Value Found', 'No data is stored under this key.');
      }
    } catch (error) {
      console.log("There is an issue to reach locally stored mSessionToken");
      // Alert.alert('Error', 'Failed to get data.');
    }
  };
*/
  const retrieveLocalData = async () => {
    try {
      const localToken = await AsyncStorage.getItem('mSessionToken');
      if (localToken) {
        setmSessionToken(localToken);
        await handleLoginBackend("", "", 1, "", "", "", "", localToken);
      } else {
        setmSessionToken('0');
      }
    } catch {
      console.log("Error retrieving mSessionToken");
      setmSessionToken('0');
    } finally {
      setLoadingSession(false);
    }
  };

  /*
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

  */
  useEffect(() => {
    retrieveLocalData();
  }, []);
  if (loadingSession || !loaded) {
    return null; // or splash screen
  }

  
  if (mSessionToken !== '0') {
    console.log("-------------", mSessionToken);

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
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
          <View style={globalStyles.loginPage.logocontainer}>
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
