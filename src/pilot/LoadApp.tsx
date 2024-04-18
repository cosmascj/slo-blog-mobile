import React, { useContext } from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native';
import { pallets } from '@/constants';
import { useFonts } from '@use-expo/font';
import { AuthContext } from '@/context/AuthContext';
import { AppNavigator, AuthNavigator } from '@/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const customFonts = {
    "Montserrat-black": require("../assets/font/montserrat/Montserrat-Black.ttf"),
    "Montserrat-bold": require("../assets/font/montserrat/Montserrat-Bold.ttf"),
    "Montserrat-regular": require("../assets/font/montserrat/Montserrat-Regular.ttf"),
    "Montserrat-medium": require("../assets/font/montserrat/Montserrat-Medium.ttf"),
    "Montserrat-light": require("../assets/font/montserrat/Montserrat-Light.ttf"),


}; const theme: Theme = {
    colors: {
        background: pallets.white,
        border: pallets.border,
        card: pallets.bottombg,
        notification: pallets.red,
        primary: pallets.primaryBlue,
        text: pallets.primaryTextColor,
    },
    dark: false,
};

export const LoadApp = () => {
    const [fontsLoaded] = useFonts(customFonts);
    const { token } = useContext(AuthContext) as AuthContextType

    if (!fontsLoaded) {
        return null;
    }
    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer  {...{ theme }}>
                    {token ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </GestureHandlerRootView>
        </>
    )
}

