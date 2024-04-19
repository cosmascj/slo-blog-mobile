import React, { useContext } from 'react';
import { AuthRoutes } from '../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, Home, ResetPassword, SignIn, SignUp } from '@/screens';
import { AuthContext } from '@/context/AuthContext';
import VerifyAccount from '@/screens/auth/VerifyAccount';

const { Group, Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export default function AuthNavigator() {
    const { onboarded } = useContext(AuthContext) as AuthContextType

    return (
        <Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
            {/* The screen below is for first time only */}

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
                <Screen name='VerifyAccount' component={VerifyAccount} />


            </Group>
        </Navigator>
    );
}
