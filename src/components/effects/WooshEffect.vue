<script setup lang="ts">
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { EffectPass, RenderPass, EffectComposer } from 'postprocessing';
import { Camera, Clock, PerspectiveCamera, Scene } from 'three';
import { ComposerInjectionKey, RendererInjectionKey } from 'troisjs';
import { RippleEffect } from '~/three/shaders/ripple';
import { WaterEffect } from '~/three/shaders/water';
import TouchTexture from '~/three/textures/ripple';

const waterEffect = new WaterEffect();
const renderRef = inject(RendererInjectionKey);
const touchTexture = new TouchTexture();
const rippleEffect = new RippleEffect({ texture: touchTexture.texture });

const clock = new Clock();

onMounted(() => {
  // console.log(EffectComposer);
  if (!renderRef) return;
  const { scene, camera, renderer } = renderRef;
  const composer = new EffectComposer(renderer);
  touchTexture.initTexture();

  const tick = () => {
    composer.render(clock.getDelta());
    touchTexture.update(clock.getDelta());
    requestAnimationFrame(tick);
  };

  const renderPass = new RenderPass(scene, camera);
  const waterPass = new EffectPass(camera!, waterEffect);
  const ripplePass = new EffectPass(camera!, rippleEffect);
  //   waterPass.setSize;
  waterPass.renderToScreen = true;
  ripplePass.renderToScreen = false;
  renderPass.renderToScreen = false;
  const s = Object.assign(ripplePass, { clear: true });
  composer.addPass(renderPass);
  composer.addPass(s);
  composer.addPass(waterPass);

  tick();

  // composer.onBeforeRender(() => {
  //   touchTexture.update(clock.getDelta());
  //   console.log('hi');
  // })
});
</script>
<template>
  <div></div>
</template>
