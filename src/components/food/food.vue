<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-add_circle"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text" v-show="food.info">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent"
                        :desc="desc" :ratings="food.ratings" @changeType="changeType"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    cartControl,
    split,
    ratingselect
  },
  methods: {
    show () {
      this.showFlag = true
      // 当组件显示的时候将这两个值进行初始化
      this.selectType = ALL
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) {
        return false
      }
      this.$emit('drop', event.target)
      this.$set(this.food, 'count', 1)
    },
    changeType (val) {
      this.selectType = val
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left:0
    top:0
    bottom:48px
    z-index:30
    width: 100%
    background: #fff
    &.move-enter-active,&.move-leave-active
      transform: translate3d(0,0,0)
      transition :all 0.2s linear
    &.move-enter,&.move-leave-to
      transform: translate3d(100%,0,0)
    .food-content
      .image-header
        position:relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-add_circle
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        padding: 18px
        position: relative
        .title
          line-height: 14px
          margin-bottom: 8px
          font-weight: 700
          font-size: 14px
          color: rgb(7,17,27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size:0
          .sell-count,.rating
            font-size: 10px
            color:rgb(147,153,159)
          .sell-count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size:14px
            color:rgb(240,20,20)
          .old
            text-decoration :line-through
            font-size:10px
            color: rgb(147,153,159)
        .cartcontrol-wrapper
          position:absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right:18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          color: #fff
          font-size: 10px
          border-radius: 12px
          background :rgb(0,160,220)
          &.fade-enter-active,&.fade-leave-active
            transition: all 0.2 linear
          &.fade-enter,&fade-leave-to
            opacity: 0
      .info
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color:rgb(7,17,27)
        .text
          color:rgb(77,85,93)
          font-weight: 200
          font-size: 12px
          line-height:24px
          padding:0 8px
      .rating
        padding-top: 18px
        .title
          margin-left: 18px
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color:rgb(7,17,27)
    </style>
