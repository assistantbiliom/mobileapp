import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, Button } from 'react-native';


import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [mSessionToken, setmSessionToken] = useState(0); 
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState(null);
  const [instaUser, setInstaUser] = useState(null);


  const INSTAGRAM_CONFIG = {
    clientId: 'YOUR_INSTAGRAM_CLIENT_ID',
    clientSecret: 'YOUR_INSTAGRAM_CLIENT_SECRET',
    redirectUrl: 'YOUR_REDIRECT_URI',
    scopes: ['user_profile', 'user_media'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
      tokenEndpoint: 'https://api.instagram.com/oauth/access_token',
    },
  };

  const signInWithInstagram = async () => {
    try {
      const authResult = await authorize(INSTAGRAM_CONFIG);
      setInstaUser(authResult);
      Alert.alert('Instagram Login Successful', `Access Token: ${authResult.accessToken}`);
    } catch (error) {
      console.error('Instagram Sign-In Error:', error);
      Alert.alert('Instagram Login Failed', error.message);
    }
  };

  const signInWithApple = async () => {
    console.log("------------ signInWithApple ------------");
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const userCredential = await auth().signInWithCredential(appleCredential);
      setUser(userCredential.user);
      Alert.alert('Login Successful', `Welcome ${userCredential.user.displayName || 'User'}`);
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      Alert.alert('Login Failed', error.message);
    }
  };


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  if (mSessionToken === 1)  {
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
  }  
  else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Sign in with Apple or Instagram</Text>
      {user ? (
        <Text>Welcome, {user.displayName || 'User'}</Text>
      ) : (
        <Button title="Sign in with Apple" onPress={signInWithApple} />
      )}
      {instaUser ? (
        <Text>Instagram Login Successful</Text>
      ) : (
        <Button title="Sign in with Instagram" onPress={signInWithInstagram} />
      )}
    </View>
    )
  } // No login
}
