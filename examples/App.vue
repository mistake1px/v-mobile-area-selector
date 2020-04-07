<template>
  <div id="app">
    <div class="demo">
      <div class="btn" @click="showAreaSelector">选择地址</div>
      <p>
        value为：'北京市 北京市市辖区 海淀区' 格式，3列
      </p>
    </div>
    <div class="demo">
      <div class="btn" @click="showAreaSelector2">选择地址</div>
      <p>
        value为：'320100' 格式，2列
      </p>
    </div>
    <div class="result">
       <p>选择结果为：</p>
      <p>{{ result }}</p>
    </div>
    <area-selector
      v-if="visible"
      @cancel="visible = false"
      @confirm="confirm"
      :visible="visible"
      :value="area" 
      :cols="cols" 
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      area: '',
      cols: 3,
      result: '',
      lists: ''
    }
  },
  methods: {
    showAreaSelector() {
      this.cols = 3
      this.area = '北京市 北京市市辖区 海淀区'
      this.visible = true
    },
    showAreaSelector2() {
      this.cols = 2
      this.area = '320100'
      this.visible = true
    },
    confirm(data) {
      this.result = data.value
      this.lists = data.lists
      this.visible = false
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.demo {
  margin: 24px auto;
  text-align: center;
  font-size: 18px;
  .btn {
    width: 18vw;
    height: 4vh;
    margin : 0 auto;
    border: 1px solid #303030;
    border-radius: 4px;
    background: #ccc;
  }
}
.result {
  margin: 12px auto;
  border-top: 1px solid #3c3c3c;
  text-align: center;
}
</style>
