import { ShaderPass, EffectPass as Effect } from 'postprocessing';
import { Pass } from 'three/examples/jsm/postprocessing/EffectComposer';
import { EffectPass } from 'troisjs';
import { WaterEffect } from '~/three/shaders/water';
export default defineComponent({
  extends: EffectPass,
  created() {
    if (!this.renderer) return;
    const waterEffect = new WaterEffect();
    const pass = new Effect(this.composer!.renderer!.camera!, waterEffect);
    this.initEffectPass(pass as any as Pass);
  },
  __hmrId: 'SMAAPass',
});
