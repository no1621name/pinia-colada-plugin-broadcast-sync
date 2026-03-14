import type { Post } from '../mocks/posts'
import { useMutation, useQueryCache } from '@pinia/colada'
import { postsApi } from '../mocks/posts'
import { postsOptions } from './use-get-posts'

export function useRemovePost() {
  const queryCache = useQueryCache()
  return useMutation<void, Post['id']>({
    mutation: async (id: string) => postsApi.removePost(id),
    onSuccess: (_, id) => {
      const postsList = (queryCache.getQueryData(postsOptions.key) || []).slice()
      const index = postsList.findIndex(post => post.id === id)
      postsList.splice(index, 1)
      queryCache.setQueryData(['posts'], postsList)
    },
  })
}
