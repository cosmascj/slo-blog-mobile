import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { PageWrapper, Text } from '@/components'
import BlogItem from './Components/BlogItem'
import { Ionicons } from '@expo/vector-icons'
import { pallets } from '@/constants'
import { AppRoutes, RootNavigationProp, TabRoutes } from '@/navigation/types'
import { useGetBlogs } from '@/service/useBlog'
import { AuthContext } from '@/context/AuthContext'
import { getInitials } from '../../utils/formatter';

const DashboardHome = ({ navigation }: RootNavigationProp<AppRoutes, TabRoutes, 'Home'>) => {
    const { user } = useContext(AuthContext) as AuthContextType

    const { data, isLoading } = useGetBlogs({})

    return (
        <PageWrapper>
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-between', marginBottom: 19 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#0056FD', borderRadius: 100, padding: 10 }}>
                        <Text fontWeight='600' style={{ color: pallets.white }}>{getInitials(user?.name!!)}</Text>
                    </View>
                    <Text fontWeight='600' style={{ marginStart: 5, fontSize: 14 }}>{user?.name ?? 'N/A'}</Text>
                </View>

                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {isLoading ? <ActivityIndicator color={pallets.primaryBlue} /> :

                <BlogItem item={data?.data} onPress={(val) => navigation.navigate('HomeStack', { screen: 'BlogDetails', params: { id: val } })} />
            }
        </PageWrapper>
    )
}

export default DashboardHome

const styles = StyleSheet.create({})