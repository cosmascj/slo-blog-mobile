import { Image, Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BackHeader, Button, Input, PageWrapper, Text } from '@/components'
import { ApiError } from '@/types/global'
import { AxiosError } from 'axios'
import { handleApiError } from '@/utils/api'
import { AuthRoutes, StackNavigationProps } from '@/navigation/types'
import { useInitatePasswordRecovery } from '@/service/useAuth'
import { pallets } from '@/constants'

export const ForgotPassword = ({ navigation }: StackNavigationProps<AuthRoutes, 'ForgotPassword'>) => {
    const [inputs, setInputs] = useState<Pick<VerifyAccountProp, 'email'>>({
        email: '',
    })
    const [errors, setErrors] = useState<ForgotPasswordError>({})
    const { mutate, isLoading } = useInitatePasswordRecovery({
        onSuccess: () => {
            navigation.navigate('ResetPassword', { email: inputs.email })
            // showMessage({ message: 'Regosteration successful', type: 'success', icon: 'success' })
        },
        onError: (err: AxiosError<ApiError>) => { handleApiError(err) }
    })
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleOnchange = (text: string, input: keyof Pick<VerifyAccountProp, 'email'>) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }

    const handleError = (error: string | null, input: keyof ForgotPasswordError) => {
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

        if (!isValidEmail(inputs.email)) {
            handleError('Please enter a valid email', 'email')
            isValid = false
        }

        if (isValid) {
            mutate({
                email: inputs.email.toLowerCase(),
            })
        }

    }
    return (
        <PageWrapper>
            <BackHeader />
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Image style={{ marginBottom: 15, marginStart: 15 }} source={require('../../assets/images/password.png')} />
                <Text fontWeight='600' style={{ fontSize: 24, marginStart: -5 }}> Forgot Password</Text>
                <Text fontWeight='500' style={{ marginVertical: 7 }}> Enter your email address to reset your password</Text>

                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'email')
                    }}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                    coverStyle={{ marginTop: 20 }}
                    error={errors.email}
                    label='Email Address' />


                <Button
                    loading={isLoading}
                    text='Continue'
                    onPress={() => validate()}
                    style={{ marginTop: 20 }} />


            </ScrollView>
        </PageWrapper>
    )
}

const styles = StyleSheet.create({
    footerText: {
        flexDirection: 'row', marginTop: 15,

        alignItems: 'center', justifyContent: 'center'
    }
})