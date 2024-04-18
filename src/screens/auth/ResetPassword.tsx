import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AuthRoutes, StackNavigationProps } from '@/navigation/types'
import { BackHeader, Button, Input, PageWrapper, Text } from '@/components'
import { handleApiError } from '@/utils/api'
import { ApiError } from '@/types/global'
import { AxiosError } from 'axios'
import { showMessage } from 'react-native-flash-message'
import { useResetPassword } from '@/service/useAuth'

export const ResetPassword = ({ navigation }: StackNavigationProps<AuthRoutes, 'ResetPassword'>) => {

    const [inputs, setInputs] = useState<OTPProps>({
        password: '',
        otp: '',
        confirm_password: ''
    })
    const [errors, setErrors] = useState<OTPErrors>({})
    const { mutate, isLoading } = useResetPassword({
        onSuccess: () => { showMessage({ message: 'Regosteration successful', type: 'success', icon: 'success' }) },
        onError: (err: AxiosError<ApiError>) => { handleApiError(err) }
    })
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleOnchange = (text: string, input: keyof OTPProps) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }

    const handleError = (error: string | null, input: keyof OTPErrors) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }
    const isValidEmail = (email: string) => {
        return emailRegex.test(email);
    };

    const validate = async () => {
        Keyboard.dismiss()
        let isValid = true


        if (inputs.otp.length < 1) {
            handleError('Please enter your email', 'otp')
            isValid = false
        }
        if (inputs.password.length < 1) {
            handleError('Please enter your password', 'password')
            isValid = false
        }


        if (isValid) {
            mutate({
                email: inputs.em.toLowerCase(),
                password: inputs.password,
                name: inputs.name, password_confirmation: inputs.password
            })
        }

    }
    return (
        <PageWrapper>
            <BackHeader />

            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Text fontWeight='600' style={{ fontSize: 24, marginStart: -5 }}> Sign Up</Text>
                <Text fontWeight='500' style={{ marginVertical: 7, marginStart: -5 }}> Fill in your credentials below to get started 😎</Text>

                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'otp')
                    }}
                    onFocus={() => {
                        handleError(null, 'otp')
                    }}
                    error={errors.otp}

                    label='OTP Code' coverStyle={{ marginTop: 10 }} />
                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'password')
                    }}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
                    error={errors.password}
                    label='New Password' />
                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'password')
                    }}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
                    error={errors.confirm_password}
                    label='Confirm Password' secureTextEntry />

                <Button
                    loading={isLoading}
                    text='Reset Password'
                    // onPress={() => validate()}
                    style={{ marginTop: 20 }} />


            </ScrollView>
        </PageWrapper>
    )
}


const styles = StyleSheet.create({})