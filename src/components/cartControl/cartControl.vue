<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cartDecrease" v-show="food.count>0" @click="decreaseCount($event)">
        <span class="icon-shopping_cart inner inner_move"></span>
      </div>
    </transition>
    <div class="cartCount" v-show="food.count>0">{{food.count}}</div>
    <div class="cartAdd icon-thumb_down" @click="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'cartControl',
  props: {
    food: {
      type: Object,
      default () {
        return {
          count: 1
        }
      }
    }
  },
  created () {
    console.log(this.food)
  },
  methods: {
    addCart (event) {
      // 阻止pc端的派发事件
      if (!event._constructed) {
        return
      }
      console.log('click')
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCount (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .cartDecrease
      display: inline-block
      padding: 6px

      &.move-enter-active,&.move-leave-active
        opacity: 1
        transform: translate3d(0,0,0)
        transition: all 0.4s linear
      &.move-enter,&.move-leave-to
        opacity: 0
        transform: translate3d(24px,0,0)
      &.move-enter-active,&.move-leave-active .inner_move
        transform: rotate(0deg)
        transition: all 0.4s linear
      &.move-enter,&.move-leave-to .inner_move
        transform: rotate(180deg)
      .inner
        display: block
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
  .cartCount
      display: inline-block
      vertical-align: top
      font-size: 10px
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      color: rgb(147,153,159)
    .cartAdd
      display: inline-block
      font-size: 24px
      line-height: 24px
      padding: 6px
      color: rgb(0,160,220)
</style>
