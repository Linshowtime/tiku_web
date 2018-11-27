<template>
    <div>
      <div style="display: none">{{allpage=totalPage}}</div>
      <el-button-group>
        <el-button v-show="current != 1" type="primary" icon="el-icon-arrow-left" @click="current-- && gotoNextPage(current)"></el-button>
        <el-button v-for="index in pages" :key="index" @click="gotoNextPage(index)" :class="{'active':current == index}">{{index}}</el-button>
        <el-button v-show="allpage != current && allpage>0" type="primary" @click="current++ && gotoNextPage(current)"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          current:1,
          showItem:5,
          allpage:5
        }
      },
        name: "pager",
        props:['totalPage'],
        computed:{
          pages:function () {

            var pag =[];
            if(this.current< this.showItem){

              var i = Math.min(this.showItem,this.allpage);
              while(i){
                pag.unshift(i--);
              }
            }else{  //当前页数大于显示页数了
              var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                i = this.showItem;
              if( middle >  (this.allpage - this.showItem)  ){
                middle = (this.allpage - this.showItem) + 1
              }
              while(i--){
                pag.push( middle++ );
              }
            }
            return pag;
          }
        },
      methods:{
        gotoNextPage: function (index) {
          console.info(index);
          this.current = index;
          this.$emit("gotoNext",index);
        }
      }
    }
</script>

<style scoped>
  .active{
    background: #409EFF;
    color: aliceblue;
  }
</style>
