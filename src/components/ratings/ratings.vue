<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType"
                    :onlyContent="onlyContent"
                    :desc="desc"
                    :ratings="ratings"
                    @changeType="changeType"
                    @changeOnlyContent="changeOnlyContent"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in ratings" v-show="needShow(rating.rateType, rating.text)" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" alt="">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-arrow_lift"></span>
                <span v-for="(item, index) in rating.recommend" :key="index" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/date'

const ALL = 2
const ERR_OK = 0
export default {
  name: 'ratings',
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    }
  },
  props: {
    seller: {
      type: Object
    },
    desc: {
      type: String
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  components: {
    star,
    split,
    ratingselect
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    changeType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    changeOnlyContent (val) {
      this.onlyContent = val
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      // 判断是否要显示内容
      if (this.onlyContent && !text) {
        return false
      }
      // 判断显示的类型
      if (this.selectType === ALL) { // 是否显示全部
        return true
      } else { // 推荐或者吐槽
        return type === this.selectType
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import  '../../common/stylus/mixin.styl'
  .ratings
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .overview
      display:flex
      padding:18px
      .overview-left
        display:flex
        flex-direction:column
        flex:0 0 137px
        width: 137px
        border-right: 1px solid rgb(147,153,159,0.1)
        text-align:center
        padding: 6px 0
        @media only screen and (max-width: 320px)
          flex: 0 0 100px
        .score
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
          margin-bottom: 6px
        .title
          font-size: 12px
          line-height: 12px
          color: rgb(7,17,27)
          margin-bottom: 8px
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex:1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size:0
          .title
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 18px
          .star
            display: inline-block
            vertical-align: top
            margin:0 6px
          .score
            font-size: 12px
            display: inline-block
            vertical-align: top
            line-height: 18px
            color: rgb(255,153,0)
        .delivery-wrapper
          font-size: 0
          .title
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 18px
          .deliveryTime
            font-size: 12px
            color: rgb(147,153,159)
            margin-left: 12px
    .rating-wrapper
      padding:0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex:0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex:1
          position:relative
          .name
            font-size: 10px
            color:rgb(7,17,27)
            line-height: 12px
            margin-bottom :4px
          .star-wrapper
            margin-bottom:6px
            font-size:0
            .star
              display:inline-block
              vertical-align :top
              margin-right:6px
            .delivery
              font-size: 10px
              font-weight: 200
              color:rgb(147,153,159)
              line-height: 12px
          .text
            margin-bottom: 8px
            line-height:18px
            font-size:12px
            color:rgb(7,17,27)
          .recommend
            line-height: 16px
            font-size:0
            .icon-arrow_lift,.item
              display:inline-block
              margin-right: 8px
              margin-bottom:4px
              font-size:9px
            .icon-arrow_lift
              color:rgb(0,160,220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
              border-radius: 1px
              color:rgb(147,153,159)
              background: #fff
          .time
            position:absolute
            right: 0
            top: 0
            font-size: 10px
            font-weight:200
            color:rgb(147,153,159)
            line-height: 12px
</style>
