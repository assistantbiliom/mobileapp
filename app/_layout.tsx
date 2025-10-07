import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionProvider, useSession } from '../src/context/SessionContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, showToastMessage } from '../src/commonfunctions';
import { useTranslation } from 'react-i18next';
import { handleLogout } from '../src/commonfunctions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent splash from auto-hiding until we're ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SessionProvider initialToken={null}>
      <AppGate />
      <Toast />
    </SessionProvider>
  );
}

function AppGate() {
  const colorScheme = useColorScheme();
  const { mSessionToken, setmSessionToken } = useSession();
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

  GoogleSignin.configure({
    webClientId: '49834723992-qrtv1rgpisc5heqr1e07ftt9et6u8d0c.apps.googleusercontent.com',
    iosClientId: '49834723992-1vutq00ihqi4e5jjr8rqvk3of4ultv3b.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

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
        platformName,
        authCode,
        type,
        name,
        surname,
        email,
        photo,
        mSessionToken: tokenCandidate,
      })
    );

    if (type === 2) {
      if (response.S === 200) {
        setmSessionToken(response.mSessionToken);
        await AsyncStorage.setItem('mSessionToken', response.mSessionToken);
      } else {
        showToastMessage('error', t('appmessages.loginerror.header'), t('appmessages.loginerror.message'));
        setmSessionToken('0');
      }
    } else {
      if (response.S === 200) {
        setmSessionToken(response.mSessionToken);
        await AsyncStorage.setItem('mSessionToken', response.mSessionToken);
      } else {
        showToastMessage('error', t('appmessages.loginerror.header'), t('appmessages.loginerror.message'));
        setmSessionToken('0');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const loginresponse = await GoogleSignin.signIn();

      if (loginresponse?.data?.idToken) {
        await handleLoginBackend(
          'google',
          loginresponse.data.idToken,
          2,
          loginresponse.data.user.givenName,
          loginresponse.data.user.familyName,
          loginresponse.data.user.email,
          loginresponse.data.user.photo,
          '0'
        );
      }
    } catch (error) {
      showToastMessage('error', t('appmessages.loginerror.header'), t('appmessages.loginerror.message'));
      console.error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      await handleLoginBackend(
        'apple',
        appleAuthRequestResponse.authorizationCode,
        2,
        appleAuthRequestResponse.fullName?.givenName ?? '',
        appleAuthRequestResponse.fullName?.familyName ?? '',
        appleAuthRequestResponse.email ?? '',
        '',
        '0'
      );
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('User canceled Apple Sign-In');
      } else {
        console.error(error);
      }
    }
  };

  const handleSocialLogin = (platformName: string) => {
    if (!agreementIsSelected) {
      showToastMessage('error', t('appmessages.logincheckbox.header'), t('appmessages.logincheckbox.message'));
      return;
    }
    switch (platformName) {
      case 'google':
        signInWithGoogle();
        break;
      case 'apple':
        signInWithApple();
        break;
      default:
        console.log('Unknown platform:', platformName);
    }
  };

  const retrieveLocalData = async () => {
    try {
      const localToken = await AsyncStorage.getItem('mSessionToken');
      if (localToken) {
        setmSessionToken(localToken);
        await handleLoginBackend('', '', 1, '', '', '', '', localToken);
      } else {
        setmSessionToken('0');
      }
    } catch {
      console.log('Error retrieving mSessionToken');
      setmSessionToken('0');
    } finally {
      setLoadingSession(false);
    }
  };

  // Retrieve session once on mount
  useEffect(() => {
    retrieveLocalData();
  }, []);

  // Hide splash screen when ready
  useEffect(() => {
    if (!loadingSession && loaded) {
      SplashScreen.hideAsync();
    }
  }, [loadingSession, loaded]);

  // Show simple loading placeholder
  if (loadingSession || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Logged in: show main app stack
  if (mSessionToken !== '0') {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  // Not logged in: show login page
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
            <TouchableOpacity
              key={index}
              style={[globalStyles.loginPage.socialbuttonrow, { backgroundColor: platform.color }]}
              onPress={() => handleSocialLogin(platform.name)}
            >
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
          tintColors={{ true: '#4CAF50', false: '#D32F2F' }}
          onCheckColor="#ffffff"
          onFillColor="#4CAF50"
          onTintColor="#4CAF50"
          tintColor="#D32F2F"
          style={{ width: 25, height: 25 }}
        />
        <Text style={globalStyles.loginPage.checkboxlabel}>Approving agreement?</Text>
      </View>
    </View>
  );
}
