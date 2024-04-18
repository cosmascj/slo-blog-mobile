import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BackHeader, Button, Input, PageWrapper, Text } from '@/components'
import { AuthRoutes, StackNavigationProps } from '@/navigation/types'
import { pallets } from '@/constants'
import { useRegister } from '@/service/useAuth'
import { AxiosError } from 'axios'
import { ApiError } from '@/types/global'
import { handleApiError } from '@/utils/api'
import { showMessage } from 'react-native-flash-message'

export const SignUp = ({ navigation }: StackNavigationProps<AuthRoutes, 'SignUp'>) => {

    const [inputs, setInputs] = useState<RegisterProp>({
        email: '',
        password: '',
        password_confirmation: '',
        user_type: '',
        name: ''
    })
    const [errors, setErrors] = useState<RegisterErrors>({})
    const { mutate, isLoading } = useRegister({
        onSuccess: () => {
            showMessage({ message: 'Regosteration successful', type: 'success', icon: 'success' })
            navigation.navigate('VerifyAccount', { email: inputs.email, isPasswordReset: false })
        },
        onError: (err: AxiosError<ApiError>) => { handleApiError(err) }
    })
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$/
    const handleOnchange = (text: string, input: keyof RegisterProp) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }

    const handleError = (error: string | null, input: keyof RegisterErrors) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }
    const isValidEmail = (email: string) => {
        return emailRegex.test(email);
    };
    const isValidPassword = (email: string) => {
        return passwordRegex.test(email);
    };

    const validate = async () => {
        Keyboard.dismiss()
        let isValid = true


        if (inputs.name.length < 1) {
            handleError('Please enter your name', 'name')
            isValid = false
        }

        if (inputs.email.length < 1) {
            handleError('Please enter your email', 'email')
            isValid = false
        }
        if (inputs.password.length < 1) {
            handleError('Please enter your password, Min of 4', 'password')
            isValid = false
        }
        if (!isValidPassword(inputs.password)) {
            handleError('Password must be 1 uppercase, 1 symbol and 1 lowercase', 'password')
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
                user_type: 'Visitor',
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
                        handleOnchange(text, 'name')
                    }}
                    onFocus={() => {
                        handleError(null, 'name')
                    }}
                    error={errors.name}

                    label='Full name' coverStyle={{ marginTop: 10 }} />
                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'email')
                    }}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                    error={errors.email}
                    label='Email Address' />
                <Input
                    onChangeText={(text: string) => {
                        handleOnchange(text, 'password')
                    }}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
                    error={errors.password}
                    label='Password' secureTextEntry />

                <Button
                    loading={isLoading}
                    text='Sign Up'
                    onPress={() => {
                        // navigation.navigate('VerifyAccount', { email: inputs.email, isPasswordReset: false })

                        validate()
                    }}
                    style={{ marginTop: 20 }} />

                <View style={styles.footerText}>
                    <Text style={{ fontSize: 16 }} fontWeight='500'>Have an account already? </Text>
                    <Text onPress={() => { navigation.navigate('Login') }} style={{ color: pallets.primaryBlue, fontSize: 16 }}>Log in</Text>
                </View>
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