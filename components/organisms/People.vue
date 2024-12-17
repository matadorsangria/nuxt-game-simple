<template>
  <div id="people" class="people">
    <Person
      v-for="person in people"
      :key="person.id"
      :person="person"
      :board="board"
      :class="person.class"
    />
  </div>
</template>

<script>
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api';
import Person from '../molecules/Person.vue';

export default defineComponent({
  components: {
    Person,
  },
  setup() {
    const store = useStore();
    const people = computed(() => store.state.people);
    const board = computed(() => store.state.board);

    return {
      people,
      board,
    };
  },
});
</script>
