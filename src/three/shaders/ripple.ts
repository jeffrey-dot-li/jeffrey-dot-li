import { Effect } from 'postprocessing';
import { Texture, Uniform } from 'three';

const fragment = `

uniform sampler2D uTexture;
// #define PI 3.14159265359

void mainUv(inout vec2 uv) {
        vec4 tex = texture2D(uTexture, uv);
        float angle = -((tex.r) * (PI * 2.) - PI) ;
        float vx = -(tex.r *2. - 1.);
        float vy = -(tex.g *2. - 1.);
        float intensity = tex.b;
        uv.x += vx * 0.2 * intensity;
        uv.y += vy * 0.2  *intensity;
        // uv.xy *= 1. - 0.5 * smoothstep( 0., 1., intensity) ;
        // uv.x +=  0.2 * intensity;
        // uv.y +=  0.2  *intensity;
    }
`;

export class RippleEffect extends Effect {
  constructor(options: {texture: Texture}) {
    super('RippleEffect', fragment, {
      uniforms: new Map([['uTexture', new Uniform(options.texture)]]),
    });
  }
}
