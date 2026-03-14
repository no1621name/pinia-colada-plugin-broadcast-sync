<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Post } from '../mocks/posts';
import { useUpdatePost } from '../queries/use-update-post';

const props = defineProps<{ post?: Post }>();
const { mutateAsync: updatePost, isLoading } = useUpdatePost();
const emit = defineEmits<{
  (e: 'cancel'): void
}>();

const editForm = ref({ title: props.post?.title || '', content: props.post?.content || '' });
watch(() => props.post, (post) => {
  if (post) {
    editForm.value = { title: post.title, content: post.content };
  }
})

const onSubmit = async () => {
  if (!props.post) return

  try {
    await updatePost({ id: props.post.id, body: editForm.value })
    emit('cancel')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form 
    class="editing-form"
    @submit.prevent="onSubmit"
  >
    <h3>Editing Post {{ post?.id }}</h3>
    <input v-model="editForm.title" />
    <textarea v-model="editForm.content"></textarea>
    <div class="actions">
      <button type="submit" :disabled="isLoading">{{ isLoading ? 'saving...' : 'save' }}</button>
      <button type="button" @click="emit('cancel')" :disabled="isLoading">cancel</button>
    </div>
  </form>
</template>

<style scoped>
.editing-form {
  width: max-content;
  max-width: 100%;
  padding: 1rem;
  border: 1px solid;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
</style>