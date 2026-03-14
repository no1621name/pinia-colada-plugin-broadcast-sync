import type { Post, PostBody } from '../mocks/posts'
import { useMutation, useQueryCache } from '@pinia/colada'
import { postsApi } from '../mocks/posts'
import { postsOptions } from './use-get-posts'

export function useCreatePost() {
  const queryCache = useQueryCache()
  return useMutation<Post, PostBody>({
    mutation: async (post: PostBody) => postsApi.createPost(post),
    onSuccess: (post) => {
      const postsList = (queryCache.getQueryData(postsOptions.key) || []).slice()
      postsList.push(post)
      queryCache.setQueryData(['posts'], postsList)
    },
  })
}
