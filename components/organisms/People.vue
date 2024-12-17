<template>
  <div id="people" class="people">
    <Person
      v-for="person in store.state.people"
      :key="person.id"
      :person="person"
      :board="store.state.board"
      :class="person.class"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/composables/store';
import Person from '../molecules/Person.vue';

const store = useStore();
</script>
