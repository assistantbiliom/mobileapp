import { Tabs, useLocalSearchParams } from 'expo-router';
import { Platform, Text } from 'react-native';
import React, { useState } from 'react';


import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, Feather } from '@expo/vector-icons';

import '../../src/localization/i18n';
import { useTranslation } from 'react-i18next'; 
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from '../../src/context/SessionContext';
import Toast from 'react-native-toast-message';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

//  const { mSessionToken } = useLocalSearchParams(); // Retrieve mSessionToken
  const { mSessionToken } = useSession(); // ✅ Dynamic value

  console.log("Tabs Layout ---Received mSessionToken:", mSessionToken);

  
    return (
      <>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,

 /*
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            android: {
              elevation: 0,
              borderTopWidth: 0,
              marginTop: 0,
              paddingTop: 0,
            },
            default: {
              marginTop: 0,
              paddingTop: 0,
            },
          }),
  */
 /*
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
*/
        tabBarStyle: Platform.select({
          ios: {
//            position: 'absolute',
            paddingBottom: 10, // Add slight padding for better spacing
            height: 50, // Consistent height with Android          
           },
          android: {
            elevation: 0, // Remove shadow to prevent overlap
            borderTopWidth: 0, // Remove border to reduce spacing
            paddingBottom: 0, // Ensure no extra padding
            height: 50, // Set a fixed height for consistency
          },
          default: {},
        }),
        }}>

        <Tabs.Screen
          name="index"
          options={{
            title: t("screens.layout.indexTabName"),
            tabBarIcon: ({ color }) => <Entypo size={28} name="chat" color='#128c7e' />
          }}
//          initialParams={{ mSessionToken: mSessionToken }} 
          />
        <Tabs.Screen
          name="orders"
          options={{
            title: t("screens.layout.ordersTabName"),
            tabBarIcon: ({ color }) => <Feather size={28} name="phone-call" color='#128c7e' />
          }}
//          initialParams={{ mSessionToken: mSessionToken }} 
          />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("screens.layout.profileTabName"),
            tabBarIcon: ({ color }) => <Feather size={28} name="user" color='#128c7e'/>,
          }}
//          initialParams={{ mSessionToken: mSessionToken }}  
          />
{/* 
        <Tabs.Screen
          name="test"
          options={{
            title: "Test",
            tabBarIcon: ({ color }) => <Feather size={28} name="user" color='#128c7e'/>,
          }}
//          initialParams={{ mSessionToken: mSessionToken }}  
          />
*/}
      </Tabs>             
      <Toast /> 
      </>

    );
}
