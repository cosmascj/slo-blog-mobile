import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { pallets } from '@/constants'
import { Text } from '@/components'
import { CommentIcon } from '@/assets/icons'

interface props {
    item: PostItem
}
const CommentItem = () => {
    return (
        <View style={{ margin: 10, borderBottomWidth: .5, borderColor: pallets.borderGrey, paddingBottom: 5 }}>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ backgroundColor: '#e8f4f8', padding: 10, borderRadius: 50 }}>
                    <Text>N/A</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, marginHorizontal: 10, marginTop: 3 }}>
                    <View>
                        <Text style={{ fontSize: 10 }}>Jone Doe</Text>
                        <Text fontWeight='500' style={{ fontSize: 10 }}>April 15</Text>

                    </View>
                    <TouchableOpacity>
                        <CommentIcon />
                    </TouchableOpacity>

                </View>


            </View>
            <Text fontWeight='500' style={{ marginTop: 5 }}>comment content</Text>
        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({})