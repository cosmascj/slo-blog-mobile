import { ActivityIndicator, Dimensions, FlatList, StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode, useRef, useState } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Input, Text } from '@/components'
import { pallets } from '@/constants'
import { CommentIcon } from '@/assets/icons'
import { Feather } from '@expo/vector-icons'
import { getInitials } from '@/utils/formatter'
import moment from 'moment'
import { RF } from '@/utils'


//THIS COMPONENT SHEET IS USED TO DIPLAY THE COMMENT ON THE SYSYTEM. IT'S BUILT WITH REACT NATIVE BOTTOM SHEET FOR SLLEK USER EXPERIENCE

type DropdownProps = {
    coverStyle?: ViewStyle
    inputStyle?: ViewStyle & TextStyle
    style?: ViewStyle
    label?: string
    LeftComponent?: ReactNode
    RightComponent?: ReactNode
    error?: string | null
    value: string | null

    placeholder: string
    disabled?: boolean
    item: CommentResponseDaum[]
    itemStyle?: ViewStyle
    labelStyle?: TextStyle
    onFocus?: () => void
    hasSearch?: boolean
    altSearch?: boolean
    setAltSearch?: (val: string) => void
    altValue: string
    onPressSend?: (val: string) => void
    paginationOptions?: {
        isFetchingNextPage?: boolean;
        hasNextPage?: boolean;
        fetchNextPage?: () => void;
    };
    isPostingComment?: boolean
}

export default function CommentView({
    coverStyle,
    disabled,
    onFocus,
    item, onPressSend, isPostingComment
}: DropdownProps) {
    const drawer = useRef<RBSheet>(null)
    const [id, setId] = useState('')
    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                style={[coverStyle, styles.container]}
                onPress={() => {
                    onFocus?.()
                    drawer.current?.open()
                }}
            >
                <Text>Comments</Text>
            </TouchableOpacity>
            <RBSheet
                ref={drawer}
                height={Dimensions.get('window').height * 0.6}
                closeOnPressBack
                dragFromTopOnly
                keyboardAvoidingViewEnabled={true}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingHorizontal: 15,
                        paddingVertical: 24,
                    },
                }}
            >

                <FlatList
                    data={item}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <Text>Comments</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ margin: 10, borderBottomWidth: .5, borderColor: pallets.borderGrey, paddingBottom: 5 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ backgroundColor: '#e8f4f8', padding: 10, borderRadius: 50 }}>
                                        <Text>{getInitials(item?.commenter?.name)}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, marginHorizontal: 10, marginTop: 3 }}>
                                        <View>
                                            <Text style={{ fontSize: RF(9) }}>{item?.commenter?.name}</Text>
                                            <Text fontWeight='500' style={{ fontSize: 10 }}>{moment(item?.created_on).fromNow()}</Text>

                                        </View>
                                        <TouchableOpacity>
                                            <CommentIcon />
                                        </TouchableOpacity>

                                    </View>


                                </View>
                                <Text fontWeight='500' style={{ marginTop: 5 }}>{item?.comment}</Text>
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ textAlign: 'center', color: pallets.lightGrey }}>No comments yet</Text>
                            </View>
                        )
                    }}
                />
                <Input
                    onChangeText={(val) => setId(val)}
                    onPressRight={() => onPressSend?.(id)}
                    RightComponent={!isPostingComment ? <Feather name="send" size={24} color="black" /> : <ActivityIndicator color={pallets.primaryBlue} />}
                    placeholder='Add comments here...' />


            </RBSheet>
        </>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: pallets.white, padding: 10, borderRadius: 8 }
})