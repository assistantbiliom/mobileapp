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


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

//  const { mSessionToken } = useLocalSearchParams(); // Retrieve mSessionToken
  const { mSessionToken } = useSession(); // ✅ Dynamic value

  console.log("Tabs Layout ---Received mSessionToken:", mSessionToken);

  
    return (

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
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
    );
}
