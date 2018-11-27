<template>
  <div>
  <headcommon v-bind:initIndex="3" v-bind:manageIndex="0"></headcommon>
    <el-row :gutter="20">

      <el-col :span="18" offset="3">
        <el-row :gutter="10">
          <!--左侧栏-->
          <el-col :span="5">
            <el-card :body-style="{ padding: '0px' }">
              <el-row style="background: #F3F7F9" class="row">
                <el-col :span="12">
                  <el-select placeholder="学科" style="margin: 0px 3px;" v-model="courseId"  @change="change()">
                    <el-option
                      v-for="item in courses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select placeholder="年级" style="margin: 0px 3px;" v-model="gradeId" @change="change()">
                    <el-option
                      v-for="item in grades"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>



              <div v-for="o in paperTypes" :key="o" class="text leftItem"
                   v-bind:class="{leftItemClick:currentPaperType==o}"
                   v-on:click="chickPaperType(o)"
              >
                <el-row class="row">
                  <el-col :span="12" style="text-align: left; ">
                    <el-button type="text" style="margin-left: 10px;color: #505050" >{{ o }}</el-button>
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <el-button type="text" style="margin-right: 10px; color: #505050">></el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>


          <!--右侧栏-->
          <el-col :span="19">
            <el-card :body-style="{ padding: '0px' }">
              <el-row class="row" id="paperProduct-search">
                <el-col :span="3">
                  <el-button type="text" class="serachTextButton">搜索试卷</el-button>

                </el-col>
                <el-col :span="10">
                  <div class="demo-input-size">
                    <el-input placeholder="请输入试卷标题或关键字" v-model="paperName">
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-button v-on:click="search">搜索</el-button>
                </el-col>
              </el-row>
            <el-row class="row">
              <el-col :span="2" >
                <el-button type="text" class="serachTextButton">地区</el-button>
              </el-col>
              <el-col :span="22" style="text-align: left">
                <el-button-group style="margin-top: 5px;margin-bottom: 5px;">
                  <el-button  v-bind:type="currentArea==''?'primary':'button'" v-on:click='currentArea = "";search()'>全部</el-button>
                  <el-button
                    v-for="area in commonlyAreas"
                    v-on:click='currentArea = area.id;search()'
                    v-bind:type="currentArea==area.id?'primary':'button'"
                  >
                    {{area.name}}
                  </el-button>
                </el-button-group>
              </el-col>
            </el-row>


            <el-row class="row">
              <el-col :span="2" >
                <el-button type="text" class="serachTextButton">日期</el-button>
              </el-col>
              <el-col :span="22" style="text-align: left">
                <el-button-group style="margin-top:5px;margin-bottom: 5px;">
                  <el-button  v-bind:type="currentDate==''?'primary':'button'" v-on:click="handleDate(1)">全部</el-button>
                  <el-button
                    v-for="lt in dates"
                    v-on:click='handleDate(lt)'
                    v-bind:type="currentDate==lt.text?'primary':'button'"
                  >
                    {{lt.text}}
                  </el-button>
                </el-button-group>
              </el-col>

            </el-row>


            <el-row class="row">
              <el-col :span="2">
                <el-button type="text" class="serachTextButton">年份</el-button>
              </el-col>
              <el-col :span="22" style="text-align: left">
                <el-button-group style="margin-top: 5px;margin-bottom: 5px;">
                  <el-button  v-bind:type="currentYear==''?'primary':'button'" v-on:click='currentYear = "";lessYear=1;search()'>全部</el-button>
                  <el-button
                    v-for="year in years"
                    v-on:click='currentYear = year;lessYear=1;search()'
                    v-bind:type="currentYear==year?'primary':'button'"
                  >
                    {{year}}
                  </el-button>
                  <el-button
                    v-for="year in lessYears"
                    v-on:click='lessYear = year;currentYear=1;search()'
                    v-bind:type="lessYear==year?'primary':'button'"
                  >
                    {{year}}以前
                  </el-button>

                </el-button-group>
              </el-col>
            </el-row>
              <el-row class="row"></el-row>
              <el-row class="row"></el-row>
            </el-card>


           <el-row v-if="papers" style="margin-top: 10px">
             <el-card :body-style="{ padding: '0px'}">
               <el-row >
                 <paper-item v-bind:parentPapers="papers"></paper-item>
               </el-row>

               <el-row>
                 <pager v-bind:totalPage="pages"  v-on:gotoNext="nextPage"></pager>
               </el-row>
             </el-card>
           </el-row>


          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3"><div class="grid-content"></div></el-col>
    </el-row>


  </div>
</template>

<script>
  import {paperTypes,dates,years,lessYears} from '@/common/js/examPaper'
  import {getCommonAreas} from '@/common/js/examPaper'
  import paperItem from '@/components/paper/paperItem'
  import Pager from "../pager";
  import Head from '@/components/head'
  import testPaperService from '@/common/service/testPaperService'
  import commonService from '@/common/service/commonService'
  export default {
    created:function(){
      commonService.getAllAreas().then(res => {
        this.commonlyAreas = getCommonAreas(res);
      })
      // var baseUrl =  this._global.requestUrl.testPaperSearchUrl+this.currentPage+'/'+this.pageSize
      // var param = {};
      // this.paper = this._global.storage.getSession('srcPaper');
      // if (this.paper) {
      //   param['courseid'] = this.paper.list[0].courseid;;
      //   param['gradeid'] = this.paper.list[0].gradeid;
      // }
      // this.$ajax.post(
      //   baseUrl,
      //   param,
      // ).then( res =>{
      //
      //   if(res.data.resultCode == '0000'){
      //
      //     if(res.data.data == null){
      //
      //       this.papers = {};
      //       this.pages = 0;
      //     }else{
      //
      //       this.papers = res.data.data;
      //       this.pages = res.data.data.pages;
      //     }
      //
      //   }else{
      //     this.papers = {};
      //     this.pages = 0;
      //   }
      // })
      //获取顶级学科
      this.$ajax.get(this._global.requestUrl.getTopSubjectUrl).then(res => {
        if (res.data.resultCode == '0000') {
          this.courses = res.data.data;
        }
      });
      //获取年级信息
      this.$ajax.get(this._global.requestUrl.getGradesUrl).then(res => {
        if (res.data.resultCode == '0000') {
          this.grades = res.data.data;
        }
      });

      this.paper = this._global.storage.getSession('srcPaper');
      if (this.paper) {
        this.courseId = this.paper.list[0].courseid;
        this.gradeId = this.paper.list[0].gradeid;
      }
      this.search()
    },
    data() {
      return {
        commonlyAreas:[],
        paperTypes:paperTypes,
        dates:dates,
        years:years,
        papers:null,
        currentDate: '',
        lessCreateDate:'',
        moreCreateDate:'',
        lessYears:lessYears,
        currentArea:'',
        currentYear:'',
        lessYear:'',
        paperName:'',
        currentPaperType:'',
        pages:0,
        currentPage:1,
        pageSize:20,
        courseId: '',  //学科id
        gradeId: '',    //年级id
        courses: [],
        grades: [],
        paper:{}
      }
    },
    methods:{
      handleDate:function(o){
        if(o==1){
          this.currentDate=''
          this.moreCreateDate='';
          this.lessCreateDate=''
        }
        else{
        this.currentDate=o.text;
        if(o.type=="week"){
          var myDate=new Date();
         myDate.setDate(myDate.getDate()-o.value*7);
          if(o.compare=="more"){
            this.moreCreateDate=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
            this.lessCreateDate=''
          }
          else if(o.compare=="less"){
            this.lessCreateDate=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
            this.moreCreateDate=''
          }
        }
        else if(o.type=="month"){
          var myDate=new Date();
        myDate.setMonth(myDate.getMonth()-o.value);
          if(o.compare=="more"){

            this.moreCreateDate=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
            this.lessCreateDate=''
          }
          else if(o.compare=="less"){
            this.lessCreateDate=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
            this.moreCreateDate=''
          }
        }
        else if(o.type=="year"){
          var myDate=new Date();
        myDate.setFullYear(myDate.getFullYear()-o.value);
          if(o.compare=="more"){
            this.moreCreateDate=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
            this.lessCreateDate=''
          }
          else if(o.compare=="less"){
            this.lessCreateDate=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
            this.moreCreateDate=''
          }
        }
        }
        this.search()
      },
      chickPaperType:function(o){
        this.currentPaperType=o;
        this.search()
      },
      change:function(){
        this.search()
      },
      search: function () {
        var param = {};
        if(this.paperName.length>0){
          param['name'] = this.paperName;
        }
        if(this.currentArea.length>0){
          param['areaid'] = this.currentArea;
        }
        if(this.currentPaperType.length>0){
          param['typename'] =this.currentPaperType;
        }
        if(this.currentYear.length>0){
          param['yearid'] = this.currentYear;
        }
        if(this.lessYear.length>0){
          param['lessYear'] = this.lessYear;
        }
        if(this.lessCreateDate.length>0){
          param['lessCreateDate'] = this.lessCreateDate;
        }
        if(this.moreCreateDate.length>0){
          param['moreCreateDate'] = this.moreCreateDate;
        }
        if (this.gradeId.length > 0) {
          param['gradeid'] = this.gradeId;
        }
        if (this.courseId.length > 0) {
          param['courseid'] = this.courseId;
        }
        testPaperService.searchTestPaperByPage(param,this.currentPage,this.pageSize).then(res => {
          if(res == null){
            this.papers = {};
            this.pages = 0;
          }else{
            this.papers = res;
            this.pages = res.pages;
          }
        })
      },
      nextPage:function (index) {
        this.currentPage = index;
        this.search();
      }
    },
    components:{
      Pager,
      headcommon: Head,
      paperItem: paperItem
    }
  }
</script>

<style scoped>
  @import "examPaper.css";
</style>
