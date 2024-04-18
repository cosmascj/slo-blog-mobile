import { FlatList, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { pallets } from '@/constants'
import { Input, Text } from '@/components'
import { Feather } from '@expo/vector-icons'

interface props {
    item: PostItem[]

}
export default function BlogItem({ item }: props) {
    return (

        <FlatList
            data={[...Array(3)]}
            renderItem={({ item }) => {
                return (
                    <View style={styles.post}>
                        <Image
                            source={require('../../../assets/images/blogImage.png')}
                            style={styles.image} />
                        <View style={{ marginStart: 10, flex: 1 }}>
                            <View style={styles.slug}>
                                <Text fontWeight='400' style={{ color: pallets.primaryBlue, fontSize: 12 }}>Investment</Text>
                            </View>
                            <Text style={{ marginVertical: 5 }} fontWeight='600' >title</Text>
                            <Text fontWeight='500'>blog content</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 10 }}>
                                <Text style={{ fontSize: 11 }} fontWeight='500'>🕓  April 10, 2024</Text>
                                <Text style={{ fontSize: 11 }} fontWeight='500'>💬 Comments</Text>
                            </View>
                        </View>

                    </View>
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
                    <View>
                        <Text>No Posts found</Text>
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
    slug: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'rgba(0, 86, 253, 0.08)'
    }
})