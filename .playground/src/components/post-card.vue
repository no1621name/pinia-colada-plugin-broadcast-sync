<script lang="ts" setup>
import { ref } from 'vue';
import type { Post } from '../mocks/posts';
import EditingForm from './editing-form.vue';
import { useRemovePost } from '../queries/use-remove-post';

defineProps<{
  post: Post
}>()

const { mutate: removePost, isLoading } = useRemovePost();
const editingPost = ref<boolean>(false);

const startEditing = () => {
  editingPost.value = true;
}

const cancelEditing = () => {
  editingPost.value = false;
}
</script>

<template>
  <EditingForm v-if="editingPost" :post="post" @cancel="cancelEditing"/>
  <div v-else class="post-card">
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <div class="actions">
      <button @click="startEditing">edit</button>
      <button @click="removePost(post.id)" :disabled="isLoading">{{ isLoading ? 'deleting...' : 'delete' }}</button>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 1rem;
  width: 70%;
  align-items: center;
}
</style>