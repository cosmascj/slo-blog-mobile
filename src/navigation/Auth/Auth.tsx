import React, { useContext } from 'react';
import { AuthRoutes } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, Home, ResetPassword, SignIn, SignUp } from '@/screens';
import { AuthContext } from '@/context/AuthContext';

const { Group, Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export default function AuthNavigator() {
    const { onboarded } = useContext(AuthContext) as AuthContextType
    console.log(onboarded, 'onboarder')
    return (
        <Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
            {!onboarded && (
                <Group>
                    <Screen name="Onboarding" component={Home} />
                </Group>
            )}
            <Group>


                <Screen name="Login" component={SignIn} />
                <Screen name="SignUp" component={SignUp} />
                <Screen name='ForgotPassword' component={ForgotPassword} />
                <Screen name='ResetPassword' component={ResetPassword} />


            </Group>
        </Navigator>
    );
}
