import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { PageWrapper, Text } from '@/components'
import BlogItem from './Components/BlogItem'
import { Ionicons } from '@expo/vector-icons'
import { pallets } from '@/constants'

const DashboardHome = () => {
    return (
        <PageWrapper >
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#0056FD', borderRadius: 100, padding: 10 }}>
                        <Text fontWeight='600' style={{ color: pallets.white }}>JD</Text>
                    </View>
                    <Text style={{ marginStart: 5 }}>N/A</Text>
                </View>

                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            <BlogItem />
        </PageWrapper>
    )
}

export default DashboardHome

const styles = StyleSheet.create({})