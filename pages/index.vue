<template>
  <div v-if="isAuth">
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
            @defaultOverlayHide="defaultOverlayHide"
          />
        </p>
        <p class="sound-alert">
          Sound will be played, so pay attention to volume.
        </p>
        <v-btn @click="firebaseSignOut">
          Sign Out
        </v-btn>
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
  <div v-else>
    <div id="firebaseui-auth-container" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api';
import 'firebaseui/dist/firebaseui.css';
import Board from '~/components/organisms/Board.vue';
import People from '~/components/organisms/People.vue';
import StartButton from '~/components/molecules/StartButton.vue';

export default defineComponent({
  components: {
    Board,
    People,
    StartButton,
  },
  setup() {
    const store = useStore();
    const isAuth = ref(false);
    const defaultOverlayVisible = ref(true);
    const defaultOverlayHide = () => {
      defaultOverlayVisible.value = false;
    };
    const reload = () => {
      location.reload();
    };
    const levels = store.getters.levels;
    const firebaseSignOut = () => {
      store.dispatch('firebaseSignOut');
    };

    store.dispatch('firebaseSignIn').then((user) => {
      if (user !== null) {
        isAuth.value = true;
        store.dispatch('setUserId', user.uid);
        store.dispatch('setBoard');
      } else {
        isAuth.value = false;
        store.dispatch('showLoginForm');
      }
    });

    return {
      isAuth,
      defaultOverlayVisible,
      defaultOverlayHide,
      reload,
      levels,
      firebaseSignOut,
    };
  },
});
</script>

<style scoped lang="scss">
.stage {
  position: relative;
  background: url(~assets/images/burned.gif) no-repeat 0 -5000px;

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
  .sound-alert {
    padding: 20px 0 30px;
    font-family: 'Avenir', sans-serif;
  }
}
</style>
