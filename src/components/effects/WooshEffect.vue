<script setup lang="ts">
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { EffectPass, RenderPass, EffectComposer, } from 'postprocessing';
import { Camera, Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ComposerInjectionKey, RendererInjectionKey } from 'troisjs';
import { RippleEffect } from '~/three/shaders/ripple';
import { WaterEffect } from '~/three/shaders/water';
import TouchTexture from '~/three/textures/ripple';

const waterEffect = new WaterEffect();
const renderRef = inject(RendererInjectionKey);
const touchTexture = new TouchTexture();
const rippleEffect = new RippleEffect({ texture: touchTexture.texture });

const clock = new Clock();
let renderer : WebGLRenderer;
let composer : EffectComposer

const resize = () => {
  // if(re)
}
onMounted(() => {
  if (!renderRef) return;
  const scene = renderRef.scene!;
  const camera = renderRef.camera!;
  renderer = renderRef.renderer!;
  composer = new EffectComposer(renderer);
  touchTexture.initTexture();

  const renderPass = new RenderPass(scene, camera);
  const effectPass = new EffectPass(camera!, waterEffect, rippleEffect);

  effectPass.renderToScreen = true;
  renderPass.renderToScreen = false;
  composer.addPass(renderPass);
  composer.addPass(effectPass);

  renderRef.onBeforeRender(() => {
    composer.render(clock.getDelta());
    touchTexture.update(clock.getDelta());
  })
});
</script>
<template>
  <slot/>
</template>
