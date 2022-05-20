<template>
  <div class="polaroid" :style="transformStyle" @click="$emit('click')">
    <div
      :class="{ dynamic, active }"
      class="m-1 p-3 pb-5 polaroid-frame md:p-4 md:pb-7 lg:m-6 lg:p-6 lg:pb-10"
    >
      <img
        :src="photoUrl"
        class="polaroid-img"
        draggable="false"
        :alt="alt"
        :style="maxSizeStyle"
        ondragstart="return false;"
        :loading="lazy? 'lazy' : ''"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Gaussian from 'gaussian';
import { defineProps, reactive, onBeforeMount, computed, ref } from 'vue';

const props = defineProps({
  dynamic: {
    default: false,
    type: Boolean,
  },
  alt:
  {
    type: String,
    required: false,
  },
  caption:
  {
    type: String,
    required: false,
  },
  active:
  {
    default: false,
    type: Boolean,
  },
  isStatic:
  {
    default: false,
    type: Boolean,
  },
  maxSize:
  {
    default: '300px',
    type: String,
  },
  date:
  {
    // TODO: Implement date.
    type: Date,
    required: false,
  },
  lazy:
  {
    default: true,
    type: Boolean,
  },
  photoUrl:
  {
    required: true,
    type: String,
  },
});

const { active, dynamic, photoUrl, lazy, maxSize, isStatic, alt } = reactive(props);

const angleDistribution = Gaussian(0, 15);
const offsetDist = Gaussian(0, 50);

const maxSizeStyle = computed(() => (`--maxImgSize: ${maxSize};`));

const angleOffset = ref(0);
const offset = reactive({
  x: 0, y: 0, z: 0,
});

function generateOffsets() {
  angleOffset.value = angleDistribution.ppf(Math.random());
  offset.x = offsetDist.ppf(Math.random());
  offset.y = (Math.random() - 0.5) * 100;
}

onBeforeMount(generateOffsets);

const transformStyle = computed (() => {
  if (isStatic) return 'filter : none;';
  return `--transform: rotate(${angleOffset.value}deg) translate3d(${offset.x}px, ${offset.y}px, ${offset.z}px);`;
});

</script>

<style lang="scss" scoped>
$maxImgSize: 30vw;
$smallBoxShadow: 0 10px 16px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
$bigBoxShadow: 0 20px 32px 0 rgba(0, 0, 0, 0.4), 0 12px 40px 0 rgba(0, 0, 0, 0.1);

.polaroid {
  --transform: translate3d(0, 0, 0);
  --maxImgSize: 250px;
  display: block;
  width: max-content;
  cursor: pointer;
  transform : var(--transform);

  &.modal
  {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) var(--transform);
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .polaroid-names {
    max-width: 100%;
    font-weight: 900;
    .link {
      &:not(:first-child) {
        &::before {
          content: "\00a0\00a0\00a0";
        }
      }
    }

    .link:hover {
      text-shadow: 0 0 5px;
    }
  }
  .polaroid-frame {
    width: min-content;

    background: #ffffff;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    -webkit-box-shadow: $smallBoxShadow;
    -moz-box-shadow: $smallBoxShadow;
    box-shadow: $smallBoxShadow;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    transition: all 0.1s linear;
    z-index: 0;

    transform: translate3d();
    position: relative;
    &.extra-space {
      // 20px top and bottom, 30px left and right.
      // margin: 20px 30px;
    }
    filter: grayscale(40%) sepia(20%);

    &.dynamic {
      &:hover {
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
        z-index: 10;
        -webkit-box-shadow: $bigBoxShadow;
        -moz-box-shadow: $bigBoxShadow;
        box-shadow: $bigBoxShadow;
        filter: none;
      }
    }

    &.active {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      transform: scale(1.2);
      z-index: 10;
      -webkit-box-shadow: $bigBoxShadow;
      -moz-box-shadow: $bigBoxShadow;
      box-shadow: $bigBoxShadow;
      filter: none;
    }
  }

  .polaroid-frame:after {
    color: #333;
    font-size: 25px;
    content: attr(title);
    position: relative;
    top: 15px;
  }

  .polaroid-img {
    display: block;
    cursor: pointer;
    max-height: var(--maxImgSize);
    max-width: var(--maxImgSize);
  }
}
</style>
