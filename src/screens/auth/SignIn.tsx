import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BackHeader, Button, Input, PageWrapper, Text } from '@/components'
import { useLogin } from '@/service/useAuth'
import { showMessage } from 'react-native-flash-message'
import { handleApiError } from '@/utils/api'
import { ApiError } from '@/types/global'
import { AxiosError } from 'axios'
import { AuthRoutes, StackNavigationProps } from '@/navigation/types'
import { pallets } from '@/constants'

export const SignIn = ({ navigation }: StackNavigationProps<AuthRoutes, 'Login'>) => {

    const [inputs, setInputs] = useState<LoginProp>({
        email: '',
        password: '',
        device_name: ''
    })
    const [errors, setErrors] = useState<LoginErrors>({})
    const { mutate, isLoading } = useLogin({
        onSuccess: () => {
            // showMessage({ message: 'Regosteration successful', type: 'success', icon: 'success' })
        },
        onError: (err: AxiosError<ApiError>) => { handleApiError(err) }
    })
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleOnchange = (text: string, input: keyof LoginProp) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }

    const handleError = (error: string | null, input: keyof LoginErrors) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }

    const isValidEmail = (email: string) => {
        return emailRegex.test(email);
    };


    const validate = async () => {
        Keyboard.dismiss()
        let isValid = true


        if (inputs.email.length < 1) {
            handleError('Please enter your email', 'email')
            isValid = false
        }
        if (inputs.password.length < 1) {
            handleError('Please enter your password', 'password')
            isValid = false
        }
        if (!isValidEmail(inputs.email)) {
            handleError('Please enter a valid email', 'email')
            isValid = false
        }

        if (isValid) {
            mutate({
                email: inputs.email.toLowerCase(),
                password: inputs.password,
                device_name: 'mobile'
            })
        }

    }
    return (
        <PageWrapper>
            <BackHeader />
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Text fontWeight='600' style={{ fontSize: 24, marginStart: -5 }}> Sign In</Text>
                <Text fontWeight='500' style={{ marginVertical: 7, marginStart: -4 }}> Welcome Back 👋</Text>

                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'email')
                    }}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                    coverStyle={{ marginTop: 10 }}
                    error={errors.email}
                    label='Email Address' />
                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'password')
                    }}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
                    error={errors.email}
                    label='Password' secureTextEntry />

                <Text onPress={() => { navigation.navigate('ForgotPassword') }} style={styles.forgotPassword}>Forgot Password?</Text>
                <Button
                    loading={isLoading}
                    text='Sign In'
                    onPress={() => validate()}
                    style={{ marginTop: 20 }} />

                <View style={styles.footerText}>
                    <Text style={{ fontSize: 16 }} fontWeight='500'>Don’t have an account yet? </Text>
                    <Text onPress={() => { navigation.navigate('SignUp') }} style={{ color: pallets.primaryBlue, fontSize: 16 }}>Sign Up</Text>
                </View>
            </ScrollView>
        </PageWrapper>
    )
}


const styles = StyleSheet.create({
    footerText: {
        flexDirection: 'row', marginTop: 15,

        alignItems: 'center', justifyContent: 'center'
    },
    forgotPassword: { textAlign: 'right', color: pallets.primaryBlue, fontSize: 15 }
})