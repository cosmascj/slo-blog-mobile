import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BackHeader, Button, PageWrapper, Text } from '@/components'
import TextOTP from '@/components/textOTP'
import { ApiError } from '@/types/global'
import { handleApiError } from '@/utils/api'
import { AxiosError } from 'axios'
import { showMessage } from 'react-native-flash-message'
import { AuthContext } from '@/context/AuthContext'
import { AuthRoutes, StackNavigationProps } from '@/navigation/types'
import { useResendOtp, useVerifyAccount } from '@/service/useAuth'
import { pallets } from '@/constants'

const VerifyAccount = ({ navigation, route }: StackNavigationProps<AuthRoutes, 'VerifyAccount'>) => {
    const [otp, setOtp] = useState("");

  
    const check = route?.params.isPasswordReset ?? ''

    const { mutate, isLoading } = useVerifyAccount({
        onSuccess: ({ data }: { data: unknown }) => {
           
            showMessage({ type: 'success', icon: 'success', message: 'Verifcation successful!, Log in' })
            setTimeout(() => {
                navigation.replace('Login')
            }, 500)
        }, onError: (err: AxiosError<ApiError>) => {
            handleApiError(err)
            console.log(err, 'ERROR')
        }
    })
    const [timer, setTimer] = useState(150);

    const [resetButtonEnabled, setResetButtonEnabled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                setResetButtonEnabled(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);
    // const { mutate: ForgotPassword, isLoading: isLoadingForgotPassword } = useVerifyForgotPasswordOTP({
    //     onSuccess: ({ data }: { data: unknown }) => {
    //         console.log(data, 'forjkl')
    //         showMessage({
    //             type: 'info',
    //             message: 'Token verified Successfully',
    //             icon: 'info',
    //             statusBarHeight: 40
    //         })
    //         setTimeout(() => {
    //             navigation.navigate('ResetPassword', {email : route?.params?.email})
    //         }, 200)
    //     }, onError: (err: AxiosError<ApiError>) => {
    //         handleApiError(err)
    //         console.log(err, 'ERROR')
    //     }
    // })
    const { mutate: ResendOtp } = useResendOtp({
        onSuccess: () => {
            showMessage({
                type: 'info',
                message: 'Token Resent Successfully. Check your email',
                icon: 'info',
                statusBarHeight: 40
            })
        }, onError: (err: AxiosError<ApiError>) => {
            handleApiError(err)
        }
    })
    const minutes = Math.floor(timer / 120);
    const seconds = timer % 60;
    const handleResetPress = () => {
        setTimer(150);
        setResetButtonEnabled(false);
        ResendOtp({ email: route?.params?.email ?? '' })
    };
    return (
        <PageWrapper>
            <BackHeader />
            <View style={{ padding: 15 }}>
                <ScrollView>
                    <View style={{ alignSelf: 'center', justifyContent: 'center', }}>

                        <Text style={{ fontSize: 32, textAlign: 'center' }} fontWeight='600'>Enter Your OTP</Text>
                        <Text style={styles.body} > We have just sent you 6 digit code via your email {route.params.email.toLowerCase()}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextOTP
                            otp={otp}
                            setOtp={setOtp}
                        />
                    </View>
                    <View style={{ marginTop: 8, alignItems: 'center' }}>
                        <Button text='Verify'
                            loading={isLoading}
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                if (check) {
                                    // ForgotPassword({ email: email ?? user?.email, code: otp })
                                    Alert.alert('Something went wrong')

                                } else {
                                    mutate({ token: 'HfiVhB', email: route?.params?.email.toLowerCase() })
                                    console.log('kkld', { token: otp, email: route?.params?.email.toLowerCase() })
                                }
                            }}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 10, }} fontWeight='600'>Didn't receive code </Text>
                            <TouchableOpacity
                                onPress={handleResetPress}
                                disabled={!resetButtonEnabled}
                            >
                                <Text style={{ color: resetButtonEnabled ? pallets.primaryBlue : pallets.textSecondary, fontSize: 12 }} fontWeight='600'>
                                    Resend OTP in {minutes < 10 ? 0 : ''}
                                    {minutes}:{seconds < 10 ? 0 : ''}
                                    {seconds}s
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
       
        </PageWrapper>
    )
}

export default VerifyAccount

const styles = StyleSheet.create({
    body: { color: '#2B2B2B', fontSize: 16, textAlign: 'center', fontFamily: 'Gotham-Light', lineHeight: 24 }

})