import type { Register, ThemeSetArgs } from 'claude-code'
import { makeColors } from './make-colors.js'
import { SCENE } from './scene.js'
import { DONE, GREETINGS, pick, RESPONDING, THINKING, WORKING } from './words.js'

const { theme, problems } = makeColors({
  label: 'Star Wars',
  roles: { accent: '#1f6fb5', danger: '#b3342a', success: '#3f7d3a', warning: '#a8700f', pro: '#6d4f94' },
  light: { gray: { anchors: { 'surface-0': '#efe3c8', 'surface-1': '#f5ecd6', 'surface-2': '#fbf5e6', 'text-primary': '#2b2218', 'text-secondary': '#54462f', 'text-muted': '#6b5b40' } } },
  dark: {
    roles: { accent: '#e03a3a', danger: '#ff8a6b', success: '#6fd08c', warning: '#f0b45a', pro: '#b79cf0' },
    gray: { anchors: { 'surface-0': '#0b0d12', 'surface-1': '#12151c', 'surface-2': '#1a1e28', 'surface-3': '#222733', 'text-primary': '#e8ecf4', 'text-secondary': '#b9c0cf', 'text-muted': '#8f98ab' } },
  },
})
const LOOK: ThemeSetArgs = { colors: theme, backdrop: { scene: 'star-wars', glass: { blur: 10, opacity: 0.5 } } }
const LONG_TURN_MS = 20_000

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) { $.ui.toast(unpainted) }
    const set = await $.theme.set(LOOK)
    $.ui.status(pick(GREETINGS, String(Date.now())))
    return next(e)
  })
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') { return next(e) }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="Twin suns over Tatooine by day, a starfield by night" isInteractive />
  })
  on('ui.render', { component: 'Spinner' }, ($, e, next) => {
    const list = e.props.mode === 'thinking' ? THINKING : e.props.mode === 'responding' ? RESPONDING : WORKING
    return next({ ...e, props: { ...e.props, word: pick(list, e.props.word) } })
  })
  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined && !e.isAborted && e.durationMs >= LONG_TURN_MS) { $.ui.toast(pick(DONE, e.turnId)) }
    return next(e)
  })
}
