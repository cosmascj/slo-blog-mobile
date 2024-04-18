import { ApiOptions } from '@/types/global';
import api from '@/utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetBlogs = (options?: ApiOptions) =>
  useQuery(
    ['getBlogs'],
    async () => {
      const { data } = await api.get('posts');
      return data as PostResponse;
    },
    { ...options },
  );
export const useGetBlogDetails = (id: number, options?: ApiOptions) =>
  useQuery(
    ['getBlogDetail', id],
    async () => {
      const { data } = await api.get(`posts/${id}`);
      return data as PostDetails;
    },
    { ...options },
  );
export const useGetBlogComments = (id: number, options?: ApiOptions) =>
  useQuery(
    ['getBlogComment', id],
    async () => {
      const { data } = await api.get(`posts/${id}/comments`);
      return data as CommentResponse;
    },
    { ...options },
  );
interface Postdata {
  comment: string;
}
export const usePostBlogComment = (id: number, options: ApiOptions) =>
  useMutation(async (data: Postdata) => await api.post(`posts/${id}/comments`, data), {
    ...options,
  });
