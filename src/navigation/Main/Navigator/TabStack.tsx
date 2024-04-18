import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { TabRoutes } from '../../types/app';
import DashboardHome from '@/screens/main/Home';
import { Category, Profile } from '@/screens';
import { CategoryActiveIcon, CategoryIcon, HomeActiveIcon, HomeIcon, ProfileActiveIcon, ProfileIcon } from '@/assets/icons';
import { pallets } from '@/constants';


const { Navigator, Screen } = createBottomTabNavigator<TabRoutes>();

export default function TabNavigator() {
    return (
        <Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const TabIcon = getTabIcon(route, focused);
                    return TabIcon;
                },
            })}>
            <Screen name="Home" component={DashboardHome} />
            <Screen name='Category' component={Category} />
            <Screen name='Profile' component={Profile} />
        </Navigator>
    );
}
const getTabIcon = (
    route: RouteProp<TabRoutes, keyof TabRoutes>,
    focused: boolean,
): JSX.Element | null => {
    switch (route.name) {
        case 'Home':
            return focused ? <HomeActiveIcon /> : <HomeIcon color={pallets.textSecondary} />;

        case 'Category':
            return focused ? (
                <CategoryActiveIcon />
            ) : (
                <CategoryIcon />
            );

        case 'Profile':
            return focused ? <ProfileActiveIcon /> : <ProfileIcon />;

        default:
            return null;
    }
};
