<template>
  <Renderer ref="renderer" resize="window" pointer>
    <Camera :position="{ z: 0 }" :fov="50" />
    <Scene>
      <!-- <div class="bg-blue-200 h-1/2 w-full top-0 absolute"></div>
      <div class="bg-blue-800 h-1/2 w-full bottom-0 absolute"></div> -->

      <div class="flex flex-col font-display h-full font-800 text-center w-full absolute items-center " @mousemove.prevent="mousemove">
        <h1 class="my-80px text-white text-8xl leading-[1.1] w-4/5">
          OKAY YOU GOTTA<br> JUMP IN TO
        </h1>
        <h1 class="text-white text-10xl">
          SWIM
        </h1>
      </div>
      <!-- <Points ref="pointsRef" :position="{ z: -150 }">
        <BufferGeometry :attributes="attributes" />
        <ShaderMaterial :props="{vertexShader, uniforms, fragmentShader, blending : 2, depthTest: false}">
          <Texture src="https://assets.codepen.io/33787/sprite.png" uniform="uTexture" />
        </ShaderMaterial>
      </Points> -->
    </Scene>
    <!-- <Scene></Scene> -->
    <EffectComposer>
      <RenderPass />
      <RipplePass ref="Ripple"></RipplePass>
      <!-- <WaterPass></WaterPass> -->
    <!-- <SMAAPass></SMAAPass> -->
    <!-- <WooshEffect></WooshEffect> -->
    <!-- <UnrealBloomPass :strength="2" :radius="0" :threshold="0" /> -->
    <!-- <ZoomBlurPass :strength="zoomStrength" /> -->
    </EffectComposer>
  </Renderer>
</template>
<route lang="yaml">
meta:
  layout: fullscreen
</route>
<script setup lang="ts">
import {} from 'postprocessing';
import { Box, lerp, Camera, PointLight, Renderer, Scene, UnrealBloomPass, ZoomBlurPass, SMAAPass, Points, BufferGeometry, ShaderMaterial, Texture, ComposerInjectionKey } from 'troisjs';
import { MathUtils, Clock, Color, Vector3 } from 'three';
import { useMousePressed } from '@vueuse/core';
import { EffectComposer, EffectPass, RenderPass } from '~/postprocessing';
import WaterPass from '~/components/effects/WaterPass';
import RipplePass from '~/components/effects/RipplePass';

const Ripple = ref<InstanceType<typeof RipplePass>>();
const mousemove = (ev: MouseEvent) => {
  Ripple?.value?.mouseMove(ev);
};
// import {} from "postprocessing";
// const ree = inject(ComposerInjectionKey);

// const vertexShader = `
//   uniform float uTime;
//   attribute vec3 color;
//   attribute float size;
//   attribute float velocity;
//   varying vec4 vColor;
//   // varying means it is persistent and shared between vertex and frag shader.
//   void main(){
//     vColor = vec4(color, 1.0);
//     vec3 p = vec3(position);
//     p.z = -150. + mod(position.z + uTime, 300.);
//     vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
//     gl_PointSize = size * (-50.0 / mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
//   }
// `;

// // const fragmentShader = `
// // #define PI 3.14159265359
// // #define MAX_ITER 10 // water depth

// // uniform sampler2D uTexture;
// // varying vec4 vColor;
// // uniform float uTime;

// // void main() {

// // vec2 sp = gl_PointCoord;
// //  vec2 p = sp * 15.0 - vec2(20.0);
// // vec2 i = p;
// // //float c = 0.0; // brightness; larger -> darker
// // float c = 1.0; // brightness; larger -> darker
// // float inten = 0.025; // brightness; larger -> brighter
// // float speed = 1.5; // larger -> slower
// // float speed2 = 3.0; // larger -> slower
// // float freq = 0.8; // ripples
// // float xflow = 1.5; // flow speed in x direction
// // float yflow = 0.0; // flow speed in y direction

// // for (int n = 0; n < MAX_ITER; n++) {
// // float t = uTime * (1.0 - (3.0 / (float(n) + speed)));
// // i = p + vec2(cos(t - i.x * freq) + sin(t + i.y * freq) + (uTime * xflow), sin(t - i.y * freq) + cos(t + i.x * freq) + (uTime * yflow));
// // c += 1.0 / length(vec2(p.x / (sin(i.x + t * speed2) / inten), p.y / (cos(i.y + t * speed2) / inten)));
// // }

// // c /= float(MAX_ITER);
// // c = 1.5 - sqrt(c);
// // gl_FragColor = vec4(vec3(c * c * c * c), 0.0) + vec4(0.0, 0.4, 0.55, 1.0);
// // }
// // `;

// const fragmentShader = `
//   uniform sampler2D uTexture;
//   varying vec4 vColor;
//   void main() {
//     gl_FragColor = vColor * texture2D(uTexture, gl_PointCoord);
//   }
// `;
// const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

// const POINTS_COUNT = 50000;

// const positions = reactive(new Float32Array(POINTS_COUNT * 3));
// const colors = new Float32Array(POINTS_COUNT * 3);
// const sizes = reactive(new Float32Array(POINTS_COUNT));
// const v3 = new Vector3();
// const color = new Color(40, 2, 24);
// for (let i = 0; i < POINTS_COUNT; i++) {
//   v3.set(rndFS(200), rndFS(200), rndFS(300));
//   v3.toArray(positions, i * 3);
//   color.toArray(colors, i * 3);
//   sizes[i] = rnd(5, 20);
// }

// const zoomStrength = ref(0);

// const attributes = reactive([
//   { name: 'position', array: positions, itemSize: 3 },
//   { name: 'color', array: colors, itemSize: 3 },
//   { name: 'size', array: sizes, itemSize: 1 },
// ]);

// const uniforms = reactive({ uTime: { value: 0 } });

// const clock = new Clock();

// const timeCoef = ref(1);
// const targetTimeCoef = ref(1);

// const renderer = ref<any| null>(null);
// const pointsRef = ref<any | null>(null);

// onMounted(() => {
//   const positionN = renderer.value?.three.pointer.positionN;
//   const points = pointsRef.value?.points;
//   renderer.value?.onBeforeRender(() => {
//     timeCoef.value = lerp(timeCoef.value, targetTimeCoef.value, 0.02);
//     uniforms.uTime.value += clock.getDelta() * timeCoef.value * 4;
//     // console.log(uniforms.uTime.value);
//     zoomStrength.value = timeCoef.value * 0.004;
//     const da = 0.05;
//     const tiltX = lerp(points.rotation?.x || 0, positionN.y * da, 0.02);
//     const tiltY = lerp(points.rotation?.y || 0, -positionN.x * da, 0.02);
//     points.rotation.set(tiltX, tiltY, 0);
//   });
// });

</script>
