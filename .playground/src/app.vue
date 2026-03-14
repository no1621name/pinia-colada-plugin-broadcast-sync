<script setup lang="ts">
import CreateForm from './components/create-form.vue';
import PostCard from './components/post-card.vue';
import { useGetPosts } from './queries/use-get-posts';

const { state, isLoading } = useGetPosts();
</script>

<template>
  <h1>Pinia Colada Plugin Broadcast Sync</h1>
  <CreateForm />
  <h2>Posts</h2>
  <div class="posts">
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="state.status === 'error'">Oops, an error happened...</p>
    <template v-else-if="state.data">
      <TransitionGroup name="list">
        <PostCard v-for="post in state.data" :key="post.id" :post="post"/>
      </TransitionGroup>
    </template>
  </div>
</template>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 50%;
} 
</style>