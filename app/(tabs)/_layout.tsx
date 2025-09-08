import TabIcon from '@/components/TabIcon'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'



const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarStyle: {
                backgroundColor: "#0F0D23",
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#0F0D23",
            },
        }}>
            <Tabs.Screen name="index" options={{
                headerShown: false, title: 'Home', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.home} title="Home" />
                )
            }} />
            <Tabs.Screen name='search' options={{
                headerShown: false, title: 'Search', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.search} title="Search" />
                )
            }} />
            <Tabs.Screen name='saved' options={{
                headerShown: false, title: 'Saved', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.save} title="Saved" />
                )
            }} />
            <Tabs.Screen name='profile' options={{
                headerShown: false, title: 'Profile', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.person} title="Profile" />
                )
            }} />
        </Tabs >
    )
}

export default _layout