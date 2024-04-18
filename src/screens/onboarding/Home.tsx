import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import React, { ComponentProps, useContext, useRef, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { AuthRoutes, StackNavigationProps } from '@/navigation/types';
import { pallets } from '@/constants';
import { Button, Text } from '@/components';

export const Home = ({ navigation }: StackNavigationProps<AuthRoutes, 'Onboarding'>) => {

    const { setIsOnboarded } = useContext(AuthContext) as AuthContextType;

    const [dotIndex, setIndex] = useState<number | null>(0);

    const onViewableItemsChanged = useRef<ComponentProps<typeof FlatList>['onViewableItemsChanged']
    >(({ viewableItems }) => {
        if (viewableItems?.[0]) {
            setIndex(viewableItems?.[0]?.index);
        }
    });

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

    const navigate = (screen: Extract<keyof AuthRoutes, 'Login' | 'Signup'>) => {
        setIsOnboarded();
        // navigation.navigate(screen);
    };
    return (
        <>
            <View style={styles.container}>
                <View style={{ height: 50 }} />
                <Image
                    style={{ width: '100%' }}
                    resizeMode='contain'
                    source={require('../../assets/images/onboardMain3.png')} />

                <View style={{ alignItems: 'center', marginTop: '10%', marginHorizontal: 24 }}>

                    <Text style={{ fontSize: 20 }} fontWeight='600'>Blog Reader</Text>
                    <Text fontWeight='500' style={{ textAlign: 'center', fontSize: 15 }}>Get to read the latest news, articles, stories in the financial sector.</Text>
                    <Button
                        onPress={() => navigation.navigate('SignUp')}
                        text='Sign Up' style={{ marginTop: 15 }} />

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 16 }} fontWeight='500'>Have an account already? </Text>
                        <Text onPress={() => { navigation.navigate('Login') }} style={{ color: pallets.primaryBlue, fontSize: 16 }}>Log in</Text>
                    </View>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    buttonCover: {
        alignItems: 'center',
        padding: 20,
    },
    container: {
        paddingHorizontal: 0,
        flex: 1,
    },
    indicator: {
        backgroundColor: pallets.red,
        borderRadius: 4,
        height: 4,
        marginHorizontal: 5,
        width: 4,
    },
    indicatorActive: {
        backgroundColor: pallets.primaryTextColor,
        height: 8,
        width: 8,
    },
    indicators: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    tab: {
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
        paddingHorizontal: 0,
        // paddingVertical: 10,
        width: Dimensions.get('window').width,
    },
    tabContainer: {
        // flex: 1,
        width: '100%',
    },
    tabContent: {
        color: pallets.borderGrey,
        fontSize: 16,
        textAlign: 'center',
    },
    tabTitle: {
        fontSize: 20,
        marginVertical: 15,
        textAlign: 'center',
    },
    wrapper: {
        flex: 1,
    },
});