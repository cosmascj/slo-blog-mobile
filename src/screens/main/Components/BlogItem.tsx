import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { pallets } from '@/constants'
import { Input, Text } from '@/components'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import { RF } from '@/utils'


interface props {
    item?: PostItem[]
    onPress: (id: number) => void

}
export default function BlogItem({ item, onPress }: props) {

    return (
        <FlatList
            data={item}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => onPress?.(item?.id)} style={styles.post}>
                        <Image
                            source={require('../../../assets/images/blogImage.png')}
                            style={styles.image} />
                        <View style={styles.body}>
                            <View style={styles.slug}>
                                <Text fontWeight='400' style={styles.slugText}>{item?.category ?? 'none'}</Text>
                            </View>
                            <Text style={{ marginVertical: 5 }} fontWeight='600' >{item?.title ?? ''}</Text>
                            <Text fontWeight='500'>{item?.body.slice(0, 55)}...</Text>

                            <View style={styles.time}>
                                <Text style={{ fontSize: 11 }} fontWeight='500'>🕓  {moment(item?.created_on).format("LL")}</Text>
                                <Text style={{ fontSize: RF(8) }} fontWeight='500'>💬 {item?.comments_count} Comments</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )
            }}
            ListHeaderComponent={() => {
                return (
                    <View style={{ marginHorizontal: 12 }}>
                        <Input
                            LeftComponent={<Feather name="search" size={24} color="grey" />}
                            placeholder='Search for articles here' />
                    </View>
                )
            }}
            ListEmptyComponent={() => {
                return (
                    <View style={{ marginTop: '40%' }}>
                        <Text style={styles.empty}>No Posts yet</Text>
                        <Text style={styles.empty}>All blogs will appear here</Text>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    post: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 7

    },
    image: { height: 130, width: 140, borderRadius: 6 },
    body: { marginStart: 10, flex: 1 },
    slug: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'rgba(0, 86, 253, 0.08)'
    },
    slugText: { color: pallets.primaryBlue, fontSize: 12 },
    empty: { textAlign: 'center', color: pallets.lightGrey },
    time: { flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 10 }
})