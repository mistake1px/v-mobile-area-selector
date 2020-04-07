import areas from './data'

function getAreaByValue(value, array) {
  const target = areas.find(item => item.value === '' + value)
  array.unshift(target.name)
  if (target.parent) {
    return getAreaByValue(target.parent, array)
  } else {
    return array
  }
}

export function getValues(str) {
  const s = str.trim().replace(/^\s+(.*)\s+$/, function ($1, $2) {
    return $2
  })
  if (!s) return []
  if (Number.isNaN(+s)) {
    return s.split(/\s+/)
  }
  if (typeof(+s) === 'number') {
    return getAreaByValue(s, [])
  }
}


export function getFirstLevelData() {
  return areas.filter(item => {
    return !item.parent
  })
}

export function getListsByParent(name) {
  const target = areas.find(item => item.name === name)
  const code = target && target.value
  return areas.filter(item => {
    return item.parent === code
  })
}

export function getInitIndex(picked, list) {
  if (typeof picked === 'object') {
    return list.findIndex(item => picked.value === item.value)
  }
   // 传入的为字符串
  if (Number.isNaN(+picked)) {
    return list.findIndex(item => picked === item.name)
  }
  if (!Number.isNaN(+picked)) {
    return list.findIndex(item => picked === item.value)
  }
}

export function getListsByValues(values) {
  return values.reduce((prev, next) => {
    const { name, value } = areas.find(item => item.name === next)

    return prev.concat({ name, value })
  }, [])
}
