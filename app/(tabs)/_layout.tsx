import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../../constants'
import { Tabs } from 'expo-router'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='justify-center
  items-center gap-1 mt-4'>
      <Image source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'} text-xs `} style ={{color : color}}>{name}</Text>
    </View>
  )
}

const TabRootLayout = () => {
  return (
    <Tabs screenOptions={
      {
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#E0FF00",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84
        }
      }
    }>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name={"Home"}
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name={"Bookmark"}
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name={"Create"}
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name={"Profile"}
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabRootLayout