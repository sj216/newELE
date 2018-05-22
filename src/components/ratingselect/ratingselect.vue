<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{ 'active': type === 2 }">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{ 'active': type === 0 }">{{desc.positive}} <span class="count">{{positive.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{ 'active': type === 1 }">{{desc.negative}} <span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{ 'on': toggle }">
      <span class="icon-keyboard_arrow_right" @click="toggleContent"></span>
      <span class="text">只看内容和评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  name: 'ratingselect',
  data () {
    return {
      type: '',
      toggle: false
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negative () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    // 选择类型
    selectType: {
      type: Number,
      default: ALL
    },
    // 是否读取内容
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  created () {
    // 过程中涉及修改属性的值，这时可用一个变量将值保存下来
    this.type = this.selectType
    this.toggle = this.onlyContent
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return false
      }
      this.type = type
      this.$emit('changeType', type)
    },
    toggleContent () {
      this.toggle = !this.toggle
      this.$emit('changeOnlyContent', this.toggle)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.ratingselect
  .rating-type
    padding: 18px 0
    margin: 0 18px
    border-1px(rgba(7,17,27,0.1))
    font-size:0
    .block
      display: inline-blobk
      padding: 8px 12px
      margin-right:8px
      border-radius: 1px
      color:rgb(77,85,93)
      font-size: 12px
      line-height: 16px
      &.active
        color:#fff
      .count
        font-size: 8px
        margin-left: 2px
      &.positive
        background:rgba(0,160,220,0.2)
        &.active
          background:rgb(0,160,220)
      &.negative
        background:rgba(77,85,93,0.2)
        &.active
          background:rgb(77,85,93)
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    color: rgb(147,153,159)
    font-size: 0
    &.on
      .icon-keyboard_arrow_right
        color: #00c850
    .icon-keyboard_arrow_right
      display:inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      font-size:12px
</style>
