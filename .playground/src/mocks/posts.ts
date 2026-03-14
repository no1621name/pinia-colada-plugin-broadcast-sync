export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
}

export type PostBody = Omit<Post, 'id' | 'createdAt'>

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Vue 3',
    content: 'Vue 3 introduces the Composition API, which provides a flexible way to organize component logic.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Why Pinia Colada?',
    content: 'Pinia Colada is a great data fetching layer for Vue and Pinia applications.',
    createdAt: new Date().toISOString(),
  },
]

export const postsApi = {
  async getPosts(): Promise<Post[]> {
    await delay(600)
    return [...posts]
  },

  async createPost(data: PostBody): Promise<Post> {
    await delay(800)
    const newPost: Post = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    }

    posts = [newPost, ...posts]
    return newPost
  },

  async updatePost(id: string, data: Partial<PostBody>): Promise<Post> {
    await delay(600)
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) {
      throw new Error(`Post with id ${id} not found`)
    }

    const updatedPost = { ...posts[index], ...data }
    posts = [
      ...posts.slice(0, index),
      updatedPost,
      ...posts.slice(index + 1),
    ]
    return updatedPost
  },

  async removePost(id: string): Promise<void> {
    await delay(500)
    posts = posts.filter(post => post.id !== id)
  },
}
