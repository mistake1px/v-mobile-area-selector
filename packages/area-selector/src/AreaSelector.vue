<template>
  <transition name="fade">
    <div class="area" v-if="visible">
      <div class="mask" @click="$emit('cancel')"></div>
      <div class="main">
        <div class="header">
          <div class="text cancel" @click="$emit('cancel')">取消</div>
          <div class="text title">
            {{ title }}
          </div>
          <div class="text confirm" @click="confirm">确认</div>
        </div>
        <div class="content">
          <Picker
            @changed="pickChanged"
            v-for="(item, index) in values"
            :key="item"
            :lists="lists[index]"
            :picked="values[index]"
            :index="index"
            :cols="cols"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Picker from './Picker'
import { getFirstLevelData, getListsByParent, getListsByValues, getValues } from './utils'

export default {
  name: 'AreaSelector',
  components: { Picker },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '请选择' },
    cols: { type: Number, default: 1 }, // 一级/二级/三级
    value: { type: String, default: '' }
  },
  data () {
    return {
      lists: [],
      values: getValues(this.value)
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'
    this.lists.push(getFirstLevelData())
    for (let i=0;i<this.cols;i++) {
      if (!this.values[i]) {
        const parent = this.lists[i][0].name
        this.values.push(parent)
      }
      if (this.lists.length < this.cols) {
        this.lists.push(getListsByParent(this.values[i]))
      }
    }
  },
  beforeDstroy() {
    document.body.style.overflow = ''
  },
  methods: {
    pickChanged({ index, value }) {
      this.lists.splice(index + 1)
      this.values.splice(index)
      for(let i = index;i <= this.cols - 1;i++) {
        if (i === index) {
          this.values.push(value.name)
          this.lists.push(getListsByParent(value.name))
        } else {
          const parent = this.lists[i][0].name
          i < this.cols -1 && this.lists.push(getListsByParent(parent))
          this.values.push(parent)
        }
      }
    },
    confirm() {
      this.$emit('confirm', {
        value: this.values.join(' '),
        lists: getListsByValues(this.values)
      })
    }
  }
}
</script>

<style lang="less">
html, body, ul {
  margin: 0;
  padding: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .6s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #3c3c3c;
    opacity: .1;
  }
  .main {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 48vh;
    width: 100%;
    .header {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 6vh;
      background: #fff;
      &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        content: ' ';
        width: 100vw;
        height: 1px;
        background: #c3c3c3;
        transform: scaleY(.33);
      }
    }
    .content {
      width: 100%;
      height: 42vh;;
      background: linear-gradient(#fff 0%,#fff 42.8%, #f3f3f3 42.8%, #e3e3e3 57.1%, #fff 57.1%);
      background-size: 100% 42vh;
      font-size: 16px;
      &::after {
        display: block;
        content: ' ';
        height: 0;
        clear: both;
      }
    }
    .text {
      font-size: 16px;
      line-height: 6vh;
    }
    .cancel, .confirm {
      color: #1989fa;
    }
    .title {
      width: 48vw;
      font-size: 18px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
