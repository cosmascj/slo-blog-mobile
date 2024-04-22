import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { BackHeader, PageWrapper, Text } from '@/components'
import { Feather } from '@expo/vector-icons'
import { pallets } from '@/constants'
import CommentView from './Components/CommentView'
import { HomeRoutes, StackNavigationProps } from '@/navigation/types'
import { useGetBlogComments, useGetBlogDetails, usePostBlogComment } from '@/service/useBlog'
import { showMessage } from 'react-native-flash-message'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ApiError } from '@/types/global'
import { handleApiError } from '@/utils/api'
import moment from 'moment'

export const BlogDetails = ({ navigation, route }: StackNavigationProps<HomeRoutes, 'BlogDetails'>) => {
    const { data, isLoading } = useGetBlogDetails(route?.params?.id ?? '')

    const { data: Comment } = useGetBlogComments(route?.params?.id)

    const query = useQueryClient()

    const { mutate, isLoading: loadingPostComment } = usePostBlogComment(route?.params?.id, {
        onSuccess: () => {
            query.invalidateQueries(['getBlogComment'])
            showMessage({ message: 'Comment added', type: 'success', icon: 'success' })
        },
        onError: (err: AxiosError<ApiError>) => {
            console.log(err.config?.data, 'diooo')
            handleApiError(err)
        }
    })

    return (
        <PageWrapper bgColor='#FAF9F6' safeAreaDownColor='#FAF9F6' safeAreaUpColor='#FAF9F6'>
            <BackHeader showLeftComponent={true} leftComponent={<Feather name="share-2" size={24} color={pallets.primaryBlue} />} />

            {isLoading ? <ActivityIndicator color={pallets.primaryBlue} /> :
                <>
                    <View style={{ marginHorizontal: 15 }}>
                        <View style={styles.slug}>
                            <Text fontWeight='400' style={styles.category}>{data?.data?.category ?? 'none'}</Text>
                        </View>
                        <Text style={{ marginVertical: 5 }} fontWeight='600' >{data?.data?.title}</Text>

                        <Image
                            resizeMode='contain'
                            source={data?.data?.media ? { uri: route?.params.image } : require('../../assets/images/blogImage.png')}
                            style={styles.image}
                        />

                        <Text fontWeight='500'>{data?.data?.body}</Text>

                        <View style={styles.postDetails}>
                            <Text style={{ fontSize: 11 }} fontWeight='500'>🕓  {moment(data?.data?.created_on).format('LL')}</Text>
                            <Text style={{ fontSize: 11 }} fontWeight='500'>💬 {data?.data?.comments_count} Comments</Text>
                        </View>
                    </View>

                    <View style={styles.comment}>
                        <CommentView
                            isPostingComment={loadingPostComment}
                            postId={route?.params?.id}
                            item={Comment?.data ?? []} />
                    </View>
                </>
            }

        </PageWrapper>
    )
}


const styles = StyleSheet.create({
    slug: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(0, 86, 253, 0.08)'
    },
    category: { color: pallets.primaryBlue, fontSize: 12 },
    postDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    image: { width: '100%', borderRadius: 10, marginVertical: 9, height: 120, },
    comment: { marginHorizontal: 15, marginTop: 15 }
})