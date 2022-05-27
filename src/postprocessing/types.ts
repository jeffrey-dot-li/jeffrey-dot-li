import type {RendererPublicInterface} from 'troisjs'
import type { EffectComposer } from 'postprocessing'
export type PostRendererPublicInterface = Omit<RendererPublicInterface, 'composer'> & {
    composer ?: EffectComposer | RendererPublicInterface['composer']
}