<template>
  <div>
    <div class="stage">
      <Board />
      <People />
    </div>
    <div v-show="defaultOverlayVisible" class="overlay default">
      <div>
        <p class="v-application">
          <StartButton
            v-for="level in levels"
            :key="level"
            :level="level"
            @default-overlay-hide="defaultOverlayHide"
          />
        </p>
        <p class="message">
          Let's Play!
        </p>
      </div>
    </div>
    <div class="overlay restart">
      <div>
        <p>
          <v-btn @click="reload">
            Retry
          </v-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/composables/store';
import Board from '~/components/organisms/Board.vue';
import People from '~/components/organisms/People.vue';
import StartButton from '~/components/molecules/StartButton.vue';

const store = useStore();
const defaultOverlayVisible = ref(true);
const defaultOverlayHide = () => {
  defaultOverlayVisible.value = false;
};
const reload = () => {
  location.reload();
};
const levels = store.levels;

store.setBoard();
</script>

<style scoped lang="scss">
.stage {
  position: relative;
  background: url(~/assets/images/burned.gif) no-repeat 0 -5000px;

  @media screen and (max-width: 640px) {
    transform: scale(0.4);
  }
}
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;

  &.restart {
    display: none;
  }
  .v-application {
    justify-content: center;
  }
  button {
    margin: 0 10px;
  }
  .message {
    padding: 20px 0 30px;
    font-family: 'Avenir', sans-serif;
  }
}
</style>
