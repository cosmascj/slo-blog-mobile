import { useNavigation } from "@react-navigation/native"
import React, { ReactNode } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialIcons'

import { Text } from "./Text"
import { pallets } from "@/constants"
type BackHeaderProps = {
    showBack?: boolean
    title?: string;
    subtitle?: string;
    showContent?: boolean;
    leftComponent?: ReactNode
    onPressLeft?: () => void
    showLeftComponent?: boolean
    padding?: number
    onPressBack?: () => void


}
export const BackHeader = ({
    onPressBack, padding = 20, showBack = true, title, subtitle, showContent = true, leftComponent, onPressLeft, showLeftComponent

}: BackHeaderProps) => {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, styles.backContainer, { paddingBottom: padding }]}>
            {showBack
                ? (
                    <TouchableOpacity style={styles.icon} onPress={() => {
                        onPressBack ? onPressBack?.() : navigation.goBack()
                    }
                    }>
                        <Icon name="arrow-back" size={24} color={pallets.primaryBlue} />
                    </TouchableOpacity>
                )
                : (
                    <View style={{ width: 22 }} />
                )}
            {showContent && (
                <View style={[styles.headerContent, styles.backHeaderContent]}>
                    <Text style={styles.backTitle}>{title}</Text>
                    <Text style={styles.backSubtitle}>{subtitle}</Text>
                </View>
            )}
            {showLeftComponent && (

                <TouchableOpacity onPress={onPressLeft} style={styles.icon}>

                    {leftComponent}
                </TouchableOpacity>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    backContainer: {
        alignItems: 'flex-start',
        paddingVertical: 15
    },

    backHeaderContent: {
        marginStart: '8%',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    backSubtitle: {
        marginStart: '15%',
        textTransform: 'capitalize'
        // textAlign: 'center',
    },
    backTitle: {
        marginBottom: 5,
        marginTop: 5
    },
    headerContent: {
        flex: 1,
        // alignItems: 'center',
        // alignContent: 'center',
        paddingHorizontal: 10,
    },
    icon: { padding: 0, }



})