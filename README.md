# v-mobile-area-selector

## 安装

``` bash
yarn add v-mobile-area-selector
OR
npm i v-mobile-area-selector
```

### 使用

``` bash
首先引入依赖
import AreaSelector from 'v-mobile-area-selector'
```

#### 全局注册

``` bash
// main.js
Vue.use(AreaSelector)
```

#### 局部注册

``` bash
// script
components: {
  AreaSelector
}

//template
<area-selector
  :visible="true"
  :cols="3"
  :value=""
  @cancel=""
  @confirm=""
/>
```

### API

#### 属性

|参数 | 取值 | 必选 |说明
|---|----|---|---|
|cols|1/2/3（默认）| 非必选|地址选择会有几列|
|value|string｜number| 必选 |默认需要选中的地址|
|visible|true / false| 必选 |控制是否可见|

#### 事件

|事件  |说明
|---|---|
|cancel|隐藏组件|
|confirm|选中地址确认，包含选中地址的具体信息，格式如下：|

``` js
{
  value: "吉林省 辽源市"
  lists: [
    {name: "吉林省", value: "220000"},
    {name: "辽源市", value: "220400"}
  ]
}
```

### license

MIT
