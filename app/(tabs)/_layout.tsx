import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        tabBarStyle: { backgroundColor: Colors.dark.background },
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Головна',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
          )
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Налаштування',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
     
    </Tabs>
  );
}