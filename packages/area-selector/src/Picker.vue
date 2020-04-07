<template>
  <div class="list" :style="{ width: (100 / cols) + '%' }">
    <ul ref="list">
      <li v-for="item in lists" :key="item.value">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getInitIndex } from './utils'
export default {
  name: 'Pciker',
  props: ['picked', 'lists', 'cols', 'index'],
  data() {
    return {
      liItemHeight: 0
    }
  },
  async mounted() {
    await this.getLiItemHeight()
    const initIndex = getInitIndex(this.picked, this.lists)
    this.scrollLists(3 - initIndex)
    this.handleMove(3 - initIndex)
  },
  methods: {
    getLiItemHeight() {
      this.$nextTick(() => {
        const ul = this.$refs['list']
        this.liItemHeight = ul.children[0].clientHeight
      })
    },
    scrollLists(to) {
      const distance = this.liItemHeight * to
      const ul = this.$refs['list']
      ul.style.transform = 'translateY(' + distance + 'px)'
    },
    handleMove(initIndex) {
      const ul = this.$refs['list']
      let startY = initIndex * this.liItemHeight // 列表开始时的位置
      let lastDiff = initIndex * this.liItemHeight // 每次滑动的距离
      const maxUpBounce = 3 * this.liItemHeight
      const maxDownBounce = ( this.lists.length - 7 + 3 ) * this.liItemHeight
      ul.addEventListener('touchstart', (e) => {
        startY = e.changedTouches[0].clientY
      })
      ul.addEventListener('touchmove', (e) => {
        const diff = e.changedTouches[0].clientY - startY
        let temp = diff + lastDiff
        // 有多少滑动多少，会在最后end的时候进行纠错
        ul.style.transform = 'translateY(' + temp + 'px)'
      })
      ul.addEventListener('touchend', (e) => {
        lastDiff += e.changedTouches[0].clientY - startY
        if (lastDiff > maxUpBounce) {
          lastDiff = maxUpBounce
          ul.style.transition = 'transform .5s ease'
          ul.style.transform = 'translateY(' + lastDiff + 'px)'
        } else if (lastDiff < 0 - maxDownBounce) {
          lastDiff = 0 - maxDownBounce
          ul.style.transition = 'transform .5s'
          ul.style.transform = 'translateY(' + lastDiff + 'px)'
        } else {
          const temp = lastDiff / this.liItemHeight
          this.scrollLists(Math.round(temp))
        }
        // 向父组件传递信息：此次共滑动了多少
        const step = Math.round(lastDiff / this.liItemHeight)
        const pos = this.lists[0 - step + 3]
        // 该列确实滑动了：值变化了
        if (pos.name !== this.picked /* && this.index !== this.cols - 1 */) {
          this.$emit('changed', {
            index: this.index,
            value: pos
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul, li {
  list-style: none;
}
.list {
  overflow: hidden;
  float: left;
  width: 33.3%;
  height: 100%;
  ul {
    li {
      width: 60%;
      height: 6vh;
      margin: 0 auto;
      line-height: 6vh;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
