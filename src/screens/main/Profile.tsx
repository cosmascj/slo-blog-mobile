import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useRef } from 'react'
import { BackHeader, Button, PageWrapper, Text } from '@/components'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { pallets } from '@/constants'
import { AuthContext } from '@/context/AuthContext'
import { AppRoutes, RootNavigationProp, TabRoutes } from '@/navigation/types'
import { ListItem } from './Components/ListItem'
import RBSheet from 'react-native-raw-bottom-sheet'
import { showMessage } from 'react-native-flash-message'

export const Profile = ({ navigation }: RootNavigationProp<AppRoutes, TabRoutes, 'Profile'>) => {
    const { logout, user } = useContext(AuthContext) as AuthContextType
    const drawer = useRef<RBSheet>(null)

    const item = [
        { text: 'Edit Profile', icon: <AntDesign name="edit" size={24} color="black" />, route: 'EditProfile' },
        { text: 'Settings', icon: <Ionicons name="settings-outline" size={24} color="black" />, route: 'Settings' },
        { text: 'Logout', icon: <Feather name="log-out" size={24} color="black" />, logout: 'yes' },
    ]
    return (
        <PageWrapper>
            <BackHeader showBack={false} />
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView>
                    <View>
                        <View style={{ alignItems: 'center', }}>
                            <Image source={require('../../assets/images/placeholder.png')} style={{ width: 80, height: 80, borderRadius: 50, backgroundColor: 'gray' }} />
                            <Text style={{ fontSize: 11 }}>{user?.name}</Text>
                            <View style={{ backgroundColor: pallets.lightRed, paddingHorizontal: 10, borderRadius: 10, padding: 4 }}>
                                {/* <Text>ID: {data?.profile?.userId} </Text> */}
                            </View>

                        </View>

                        {item.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        if (item.route) {
                                            showMessage({
                                                icon: 'info',
                                                type: 'info', message: 'Coming soon'
                                            })
                                            // navigation.navigate('ProfileStack', { screen: item.route })
                                        }
                                        else if (item.logout) {
                                            setTimeout(() => {

                                                // logout()
                                                drawer.current?.open()
                                            }, 100)
                                        }
                                    }}
                                    activeOpacity={0.6}>

                                    <ListItem hasAmount={true} style={{ paddingVertical: 12 }} title={item.text} icon={item.icon} />
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                </ScrollView>
                <RBSheet
                    ref={drawer}
                    height={Dimensions.get('window').height * 0.3}
                    closeOnPressBack
                    dragFromTopOnly
                    keyboardAvoidingViewEnabled={true}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            paddingHorizontal: 24,
                            paddingVertical: 24,
                        },
                    }}
                >
                    <View style={{ alignItems: 'center', marginBottom: 10 }} >
                        <Text style={{ fontSize: 13 }}>Are you sure want to log out?</Text>

                    </View>
                    <View style={{ marginHorizontal: 1, alignItems: 'center', marginTop: 10 }}>

                        <Button text='Cancel' onPress={() => drawer.current?.close()} />
                        <Text
                            fontWeight='600'
                            onPress={() => {
                                drawer.current?.close()
                                setTimeout(() => { logout() }, 290)
                            }} style={{ marginVertical: 15, color: pallets.red, fontSize: 14 }}>Log out</Text>
                    </View>
                </RBSheet>
            </View>
        </PageWrapper>
    )
}


const styles = StyleSheet.create({})