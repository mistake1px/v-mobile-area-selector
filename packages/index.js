import AreaSelector from './area-selector/index'

const comps = [ AreaSelector ]

const install = Vue => {
  if (install.installed) return
  install.installed = true
  comps.map(comp => {
    Vue.component(comp.name, comp)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...comps
}
