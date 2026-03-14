import type { Post } from '../mocks/posts'
import { defineQueryOptions, useQuery } from '@pinia/colada'
import { postsApi } from '../mocks/posts'

export const postsOptions = defineQueryOptions<Post[]>({
  key: ['posts'],
  query: () => postsApi.getPosts(),
})

export function useGetPosts() {
  return useQuery<Post[]>(postsOptions)
}
