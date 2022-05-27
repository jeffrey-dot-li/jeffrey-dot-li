import { EffectPass as Pass } from 'postprocessing';
import { Clock, Raycaster } from 'three';
import EffectPass from '~/postprocessing/EffectPass';
import { RippleEffect } from '~/three/shaders/ripple';
import TouchTexture from '~/three/textures/ripple';
import { WaterEffect } from '~/three/shaders/water';

const touchTexture = new TouchTexture();
const clock = new Clock();

export default defineComponent({
    extends: EffectPass,
    created() {
        if (!this.renderer) return;
        touchTexture.initTexture();
        const rippleEffect = new RippleEffect({ texture: touchTexture.texture });
        const waterEffect = new WaterEffect();
        const pass = new Pass(this.renderer!.camera!, rippleEffect, waterEffect);
        pass.renderToScreen = true;
        this.initEffectPass(pass);
        this.renderer.onBeforeRender(() => {
            touchTexture.update(clock.getDelta());
        })
    },
    methods:
    {
        mouseMove(ev: MouseEvent) {
            const mouse = {
                x: ev.clientX / window.innerWidth,
                y: 1 - ev.clientY / window.innerHeight
            };
            touchTexture.addTouch(mouse);
        }
    },
    __hmrId: 'RipplePass',
});
