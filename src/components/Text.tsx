/* eslint-disable indent */
import { pallets } from '@/constants'
import React from 'react'
import { Text as RNText, type TextProps } from 'react-native'
type FontWeight = '300' | '400' | '600' | '500'

type FontFamily = 'Montserrat-regular' | 'Montserrat-bold' | 'Montserrat-medium' | 'Montserrat-light'

export type TextPropTypes = TextProps & {
    children?: string | React.ReactNode
    fontWeight?: FontWeight
}

export const Text = ({
    children,
    style,
    fontWeight = '400',
    ...props
}: TextPropTypes) => {
    const getFontFamily = (fontWeight: FontWeight): FontFamily => {
        switch (fontWeight) {
            case '300':
                return 'Montserrat-regular'
            case '400':
                return 'Montserrat-medium'
            case '500':
                return 'Montserrat-light'
            case '600':
                return 'Montserrat-bold'
            default:
                return 'Montserrat-regular'
        }
    }

    const fontSize = 13

    return (
        <RNText
            maxFontSizeMultiplier={1.3}
            minimumFontScale={0.7}
            // @ts-expect-error style.fontSize
            style={[{ color: pallets.primaryTextColor, fontSize, lineHeight: (style?.fontSize ?? fontSize) * 1.5 }, { fontFamily: getFontFamily(fontWeight) }, style]}
            {...props}>
            {children}
        </RNText>
    )
}
