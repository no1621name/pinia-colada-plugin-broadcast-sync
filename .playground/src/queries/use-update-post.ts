import type { Post, PostBody } from '../mocks/posts'
import { useMutation, useQueryCache } from '@pinia/colada'
import { postsApi } from '../mocks/posts'
import { postsOptions } from './use-get-posts'

export function useUpdatePost() {
  const queryCache = useQueryCache()
  return useMutation<Post, {
    id: Post['id']
    body: PostBody
  }>({
    mutation: async ({ id, body }) => postsApi.updatePost(id, body),
    onSuccess: (postItem) => {
      const postsList = (queryCache.getQueryData(postsOptions.key) || []).slice()
      const index = postsList.findIndex(post => post.id === postItem.id)
      postsList[index] = postItem
      queryCache.setQueryData(['posts'], postsList)
    },
  })
}
