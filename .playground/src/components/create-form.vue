<script setup lang="ts">
import { ref } from 'vue'
import { useCreatePost } from '../queries/use-create-post'

const { mutateAsync: createPost, isLoading } = useCreatePost()

const title = ref('')
const content = ref('')

async function onSubmit() {
  if (!title.value || !content.value) return
  
  try{
  await createPost({
    title: title.value,
    content: content.value
  })
    
  title.value = ''
  content.value = ''

  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="create-form">
    <h3>Create New Post</h3>
    <div class="field">
      <label for="title">Title</label>
      <input id="title" v-model="title" type="text" placeholder="Enter post title..." required />
    </div>
    <div class="field">
      <label for="content">Content</label>
      <textarea id="content" v-model="content" placeholder="Write your post content..." required></textarea>
    </div>
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Creating...' : 'Create Post' }}
    </button>
  </form>
</template>

<style scoped>
.create-form {
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 50%;
  min-width: max-content;
  align-items: center;
}

.field { 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}
</style>
