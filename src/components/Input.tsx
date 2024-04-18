import React, { useState, type ReactNode, LegacyRef, forwardRef } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    type TextInputProps,
    type ViewStyle,
    type TextStyle
} from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'

import { Text } from './Text'
import { pallets } from '@/constants'
type InputProps = TextInputProps & {
    coverStyle?: ViewStyle
    inputStyle?: ViewStyle & TextStyle
    style?: ViewStyle
    label?: string
    LeftComponent?: ReactNode
    isMultiLine?: boolean
    RightComponent?: ReactNode
    bottomComponent?: React.ReactNode;
    errorMessage?: string;
    error?: string | null
    ref?: LegacyRef<TextInput>
    onPressRight?: () => void
}


export const Input = forwardRef<TextInput, InputProps>(
    (
        {
            RightComponent, onPressRight,
            LeftComponent,
            label,
            error,
            errorMessage,
            coverStyle,
            inputStyle,
            style,
            secureTextEntry,
            editable = true,
            bottomComponent,
            ...props
        }: InputProps,
        ref,
    ): JSX.Element => {
        const [showPassword, setShowPassword] = useState<boolean>(!secureTextEntry);

        const toggleSetShowPassword = () => setShowPassword(prev => !prev);

        return (
            <View style={[styles.container, coverStyle]}>
                {label && <Text style={styles.labelText}>{label}</Text>}
                <View
                    style={[
                        styles.content,
                        !!error && { borderColor: pallets.black },
                        !!LeftComponent && { paddingLeft: 10 },
                        (!!RightComponent || secureTextEntry) && { paddingRight: 10 },
                        !editable && { backgroundColor: pallets.borderGrey },
                        style,
                    ]}>
                    {LeftComponent && LeftComponent}
                    <TextInput
                        ref={ref}
                        style={[styles.input, inputStyle]}
                        placeholderTextColor={pallets.lightGrey}
                        secureTextEntry={!showPassword}
                        editable={editable}
                        {...props}
                    />
                    {secureTextEntry ? (
                        <TouchableOpacity
                            onPress={toggleSetShowPassword}>
                            <Icon
                                name={!showPassword ? 'visibility' : 'visibility-off'}
                                size={18}
                                color={pallets.textSecondary}
                            />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => onPressRight?.()}>
                                {RightComponent && RightComponent}
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                {error && (
                    <View style={styles.error}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
                {bottomComponent && <View style={{ marginTop: 8 }}>{bottomComponent}</View>}
            </View>
        );
    },
);


const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    labelText: {
        marginBottom: 5
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: pallets.borderGrey,
        backgroundColor: pallets.inputBG,
        // borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 50
    },
    input: {
        height: 50,
        color: pallets.primaryTextColor,
        backgroundColor: pallets.inputBG,
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    error: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: pallets.lightRed,
        paddingVertical: 7,
        paddingHorizontal: 10
    },
    errorText: {
        color: pallets.red
    }
})
