import React from 'react'
import {
    StyleSheet,
    View,
    Platform,
    KeyboardAvoidingView,
    type ViewStyle,
    type StatusBarStyle,
    TouchableOpacity
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { pallets } from '@/constants'

interface PageWrapperProps {
    safeAreaUpColor?: string
    safeAreaDownColor?: string
    bgColor?: string
    statusBarStyle?: StatusBarStyle
    children: React.ReactNode | React.ReactNode[]
    showUpInset?: boolean
    showDownInset?: boolean
    style?: ViewStyle
    onPress?: () => void
    statusbarColor?: string
}

export const PageWrapper = ({
    safeAreaUpColor = '#FFFFFF',
    safeAreaDownColor = '#FFFFFF',
    bgColor = '#FFFFFF',
    showUpInset = true,
    showDownInset = true,
    statusbarColor,
    statusBarStyle,
    children,
    style, onPress
}: PageWrapperProps) => {
    const { top, bottom } = useSafeAreaInsets()

    return (
        <View style={styles.container}>
            {showUpInset && (
                <View
                    style={[
                        styles.inset,
                        { height: top, backgroundColor: safeAreaUpColor }
                    ]}
                />
            )}
            <StatusBar
                backgroundColor={statusbarColor ? statusbarColor : pallets.pageBg}
                style='dark'
            // barStyle={Platform.OS === 'android' ? 'dark-content' : 'dark-content'}
            // barStyle={
            //     statusBarStyle ??
            //     (Platform.OS === 'android' ? 'light-content' : 'dark-content')
            // }
            />
            <KeyboardAvoidingView

                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={[styles.container, { backgroundColor: bgColor }, style]}>
                    {children}
                </View>
            </KeyboardAvoidingView>
            {showDownInset && (
                <View
                    style={[
                        styles.inset,
                        // remove the 10 on android phones possibly
                        { height: bottom - 10, backgroundColor: safeAreaDownColor }
                    ]}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inset: {
        width: '100%'
    }
})
