import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from '../types/app';
import { HomeStack, TabStack } from './Navigator';

const { Navigator, Screen, Group } = createNativeStackNavigator<AppRoutes>();

export default function AppNavigator() {

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Screen name='TabStack' component={TabStack} />
            <Screen name='HomeStack' component={HomeStack} />


        </Navigator>)
}