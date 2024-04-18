import { HomeRoutes } from '@/navigation/types';
import { BlogDetails } from '@/screens';
import DashboardHome from '@/screens/main/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';


const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export default function HomeNavigator() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Screen name='BlogDetails' component={BlogDetails} />


        </Navigator>
    );
}