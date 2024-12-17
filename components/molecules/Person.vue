<template>
  <article
    :class="{ hover: isHover }"
    :style="styleArticle"
    @mouseenter="isHover = !isHover"
    @mouseleave="isHover = !isHover"
  >
    <p :class="person.classP" :style="styleP">
      <span :style="person.styleSpan" />
    </p>
    <div class="person_hp" :style="person.styleHP">
      <div class="person_hp_indicator" :style="styleIndicator" />
    </div>
    <div class="person_info">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{{ person.name }}</td>
          </tr>
          <tr>
            <th>HP</th>
            <td>{{ person.hp }} / {{ person.maxhp }}</td>
          </tr>
          <tr>
            <th>Distance</th>
            <td>{{ person.move }}</td>
          </tr>
          <tr>
            <th>Attack</th>
            <td>{{ person.power }}</td>
          </tr>
          <tr>
            <th>Range</th>
            <td>{{ person.attack }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script lang="ts">
import { Person, Board } from 'original';
import {
  defineComponent,
  ref,
  reactive,
  watch,
  useStore,
  PropType,
} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    person: {
      type: Object as PropType<Person>,
      required: true,
    },
    board: {
      type: Array as PropType<Board>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const isHover = ref(false);
    const calcPosition = (pos: number) => {
      const squareWidth = props.board[0].width;
      return (
        pos * squareWidth - (squareWidth + props.person.width! - 1) / 2 + 'px'
      );
    };

    const styleArticle = reactive({
      left: calcPosition(props.person.x),
      top: calcPosition(props.person.y),
    });

    const styleP = {
      width: props.person.width + 'px',
      height: props.person.width + 'px',
      transform: `rotateY(${props.person.direction === 'right' ? 0 : 180}deg)`,
    };

    const styleIndicator = {
      width: (props.person.hp / props.person!.maxhp!) * 100 + '%',
      backgroundColor:
        props.person.hp / props.person!.maxhp! > 0.3 ? 'lime' : 'red',
    };

    if (props.person.id === 1) {
      store.dispatch('moveFocus', props.person);
    }

    watch(
      () => [props.person.x, props.person.y],
      (newVal) => {
        const [x, y] = newVal;
        styleArticle.left = calcPosition(x);
        styleArticle.top = calcPosition(y);
      }
    );

    return {
      isHover,
      styleArticle,
      styleP,
      styleIndicator,
    };
  },
});
</script>

<style scoped lang="scss">
article {
  position: absolute;
  transition: all 0.6s;

  &.hover {
    z-index: 100;
  }

  p {
    position: absolute;
    margin: 0;
    transition: transform 0.3s ease-out;

    span {
      display: block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
    }
    &.pengin span {
      background-image: url(~assets/images/pengin.png);
    }
    &.enemy1 span {
      background-image: url(~assets/images/enemy1.png);
    }
    &.enemy2 span {
      background-image: url(~assets/images/enemy2.png);
    }
    &.enemy3 span {
      background-image: url(~assets/images/enemy3.png);
    }
  }

  @at-root .stage .board.turn0 + .people article.current p span {
    animation: current 0.7s linear infinite;
  }

  &.attacked p span {
    animation: shake 0.3s linear;
  }

  &.burned p {
    position: relative;
    animation: burn 1.6s linear;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: -30px;
      top: -30px;
      width: 160px;
      height: 160px;
      background: url(~assets/images/burned.gif) no-repeat 0 0;
      background-size: 160px 160px;
      animation: burnP 1.6s linear;
    }
  }

  .person_hp {
    position: absolute;
    left: 0;
    top: -15px;
    width: 50px;
    border: 1px solid #666;
    background: #fff;
    opacity: 1;
  }

  &.dead {
    animation: die 0.3s linear forwards;

    .person_hp {
      animation: dieHP 0.3s linear forwards;
    }
  }

  &.burnDead {
    animation: die 1.6s linear forwards;

    .person_hp {
      animation: dieHP 1.6s linear forwards;
    }
  }

  .person_hp_indicator {
    overflow: hidden;
    height: 3px;
    transition: all 0.3s;
  }
  .person_info {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 40px;
    bottom: 4px;
    background: #fff;
    white-space: nowrap;
    font-size: 14px;
    cursor: default;
    transition: opacity 0.3s;
    transition-delay: 0.8s;

    @at-root article.hover .person_info {
      visibility: visible;
      opacity: 1;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
      font-family: 'Avenir', sans-serif;
    }
    table {
      width: 160px;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 4px;
      border: 1px solid #999;
      text-align: left;
    }
    th {
      width: 1%;
      padding-right: 10px;
      white-space: nowrap;
      font-weight: normal;
    }
  }
}

@keyframes current {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-1px);
  }
  30% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(-3px);
  }
  70% {
    transform: translateY(-2px);
  }
  90% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes shake {
  0% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  10% {
    transform: translate(-2px, -3px) rotate(-1deg);
  }
  20% {
    transform: translate(-4px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(0px, 3px) rotate(0deg);
  }
  40% {
    transform: translate(2px, -2px) rotate(1deg);
  }
  50% {
    transform: translate(-2px, 3px) rotate(-1deg);
  }
  60% {
    transform: translate(-4px, 2px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 2px) rotate(-1deg);
  }
  80% {
    transform: translate(-2px, -2px) rotate(1deg);
  }
  90% {
    transform: translate(2px, 4px) rotate(0deg);
  }
  100% {
    transform: translate(2px, -3px) rotate(-1deg);
  }
}
@keyframes burn {
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(20%);
  }
}
@keyframes burnP {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.3;
  }
}
@keyframes die {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes dieHP {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
