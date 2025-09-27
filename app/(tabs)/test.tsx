import { StyleSheet, Image, Platform, FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTranslation } from 'react-i18next'; 
import {globalStyles} from '../../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../../src/context/SessionContext';
import { router } from 'expo-router';

import { Tabs, useLocalSearchParams } from 'expo-router';

import React, { useState, useEffect } from 'react';

import {apiCall, showToastMessage } from '../../src/commonfunctions';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import { handleLogout } from '../../src/commonfunctions';
 
import Toast from 'react-native-toast-message';



export default function TabTwoScreen() {
  
  
  
  const { setmSessionToken } = useSession();

/*
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();       // remove stored token
      setmSessionToken('0');            // set context back to logged-out
      router.replace('/');              // optional: clear history, redirect to root
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };
*/
    useEffect(() => {
        console.log("Test ...."); 
    }, []);
    
    
  return (

 
    <View style={globalStyles.ordersPage.datacontainer}> 
        <TouchableOpacity
        style={globalStyles.chatPage.bottomframe.bottomframesendbutton}
        onPress={() => handleLogout(setmSessionToken)}   
//        onPress={() => handleLogout(setmSessionToken)}   
        >
        <Ionicons
            name="send-outline"
            style={[globalStyles.chatPage.bottomframe.bottomframesendbuttontext]}
        />
        </TouchableOpacity>
        <View style={globalStyles.profilePage.toastcontainer}>
            <Toast />
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
