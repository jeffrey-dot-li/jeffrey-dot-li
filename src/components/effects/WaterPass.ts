import { EffectPass as Effect } from 'postprocessing';
import EffectPass from '~/postprocessing/EffectPass';
import { WaterEffect } from '~/three/shaders/water';
export default defineComponent({
  extends: EffectPass,
  created() {
    if (!this.renderer) return;
    const waterEffect = new WaterEffect();
    const pass = new Effect(this.renderer!.camera!, waterEffect);
    this.initEffectPass(pass);
  },
  __hmrId: 'WaterPass',
});
