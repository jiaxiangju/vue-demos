<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="'/c-goods'">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/c-ratings'">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/c-seller'">
          商家
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header.vue';
import {urlParse} from '@/common/js/util';
// import '/common/css/mixin.css';
const ERR_OK = 0;
export default {
  name: 'App',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }//header内容的数据
    }
  },
  created () {
    this.$http.get('/seller?id='+this.seller.id).then(response => {
      let res = response.body;
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data);
      }
    }, response => {
      console.log('error');      
    });
  },
  components : {
    'v-header': header
  }
};
</script>

<style>

@import '/common/css/icon.css';

body, html{
  line-height: 1;
  font-weight: 200;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif;  
}

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  /*border-bottom: 1px solid rgba(7, 17, 27, 0.1);*/
}
.tab .tab-item{
  flex: 1;
  text-align: center;
} 
.tab .tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.tab .tab-item a.active{
  color: rgb(240, 20, 20);
}
.border-1px{
  position: relative;
}
.border-1px:after{
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  content: ' ';
}
@media(-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
  .border-1px:after{
    -webkit-transform: scaleY(0.7);
    transform: scaleY(0.7);
  }
}
@media(-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
  .border-1px:after{
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
