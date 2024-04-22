import { FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { pallets } from '@/constants'
import { Input, Text } from '@/components'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import { RF } from '@/utils'

interface routeType {
    id: number,
    image: string
}

interface props {
    item?: PostItem[]
    onPress: (id: number, image: string) => void
    refetch: () => void
    isRefresh: boolean
    searchText: string
    onChangeSearchValue?: (val: string) => void


}

export default function BlogItem({ item, onPress,
    onChangeSearchValue,
    refetch, searchText = '',
    isRefresh, }: props) {
    const [search, setSearch] = useState(searchText);


    return (
        <>
            <View style={{ marginHorizontal: 12 }}>
                <Input
                    onChangeText={(val) => setSearch(val)}
                    autoFocus={false}
                    clearButtonMode="while-editing"
                    LeftComponent={<Feather name="search" size={24} color="grey" />}
                    placeholder='Search for articles here' />
            </View>

            <FlatList

                data={item?.filter((items) => items.title?.toLowerCase()?.includes(search?.toLowerCase()))}
                keyExtractor={({ title }) => title}

                refreshControl={
                    <RefreshControl
                        colors={[pallets.primaryBlue]}
                        tintColor={pallets.primaryBlue}
                        refreshing={isRefresh}
                        onRefresh={() => refetch?.()}
                    />
                }
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => onPress?.(item?.id, item?.media)} style={styles.post}>
                            <Image
                                resizeMode='stretch'
                                source={item?.media ? { uri: item?.media } : require('../../../assets/images/blogImage.png')}
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

                ListEmptyComponent={() => {
                    return (
                        <View style={{ marginTop: '40%' }}>
                            <Text style={styles.empty}>No Posts yet</Text>
                            <Text style={styles.empty}>All blogs will appear here</Text>
                        </View>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    post: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 7

    },
    image: { height: 135, width: 135, borderRadius: 6 },
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