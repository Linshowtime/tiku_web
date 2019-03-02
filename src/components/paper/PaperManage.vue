<template>
 <div>
   <headcommon  v-bind:manageIndex="2"></headcommon>
   <el-row :gutter="20">
   <el-col :span="18" offset="3">
     <el-row>
       <el-col span="4"><el-button type="primary" @click="manualcreate">手工创建试卷</el-button></el-col>
       <el-col span="3"><el-button type="danger"  @click="autocreate">智能创建试卷</el-button></el-col>
     </el-row>
   <div v-for="paper in papers" class="paperItem">
     <el-button type="text" ><div class="paperItemName" >{{paper.name}}</div></el-button>
     <div class="paperItemScore">
       <el-row>
         <el-col :span="4">
           <div style="margin-left: 10px;">
             试卷类型:<span v-if="paper.typeName!=null">{{paper.typeName}}</span>
             <span v-else>无类型</span>
           </div>
         </el-col>
         <el-col :span="14"  style="text-align: right;">
           <div style="margin-right: 10px;">创建时间:{{paper.createDate}}</div>
         </el-col>
         <el-col :span="2" style="text-align: right" v-if="paper.type==0">
           <el-button type="text"  @click="modifyPaper(paper)" >修改试卷</el-button>
         </el-col>
         <el-col :span="2" style="text-align: right" v-if="paper.type==0">
           <el-button type="text"  @click="selectSubject(paper.id)">进入选题</el-button>
         </el-col>
         <el-col :span="2" style="text-align: right">
           <el-button type="text"  @click="deletePaper(paper.id)"v-if="paper.type==0" ><span style="color: red">删除此卷 </span></el-button>
         </el-col>
         <el-col :span="3" style="text-align: right" v-if="paper.type==1">
           <el-button type="text"  @click="modifyPaper(paper)" >修改试卷</el-button>
         </el-col>
         <el-col :span="3" style="text-align: right">
           <el-button type="text"  @click="deletePaper(paper.id)"v-if="paper.type==1" ><span style="color: red">删除此卷 </span></el-button>
         </el-col>
       </el-row>
     </div>
     <el-row style="margin-top: 10px;">
       <pager v-bind:totalPage="pages" v-on:gotoNext="nextPage"></pager>
     </el-row>
   </div>
   </el-col>
   <!-- 右侧空白列-->
   <el-col :span="3"><div class="grid-content"></div></el-col>
   </el-row>
   <el-dialog
     @close="dialogCls"
     :visible.sync="addVisible"
     title="创建试卷"
     width="50%" :close-on-click-modal="false"
   >
     <el-input v-model="addPaperModel.name"  placeholder="请输入试卷名称" style="margin-bottom: 15px" ></el-input>
     <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学科" v-model="addPaperModel.courseId" >
       <el-option
         v-for="item in courses"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select></div>
     <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="年级" v-model="addPaperModel.gradeId">
       <el-option
         v-for="item in grades"
         :key="item.id"
         :label="item.gradename"
         :value="item.id">
       </el-option>
     </el-select></div>
     <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="期数" v-model="addPaperModel.periodId" >
       <el-option
         v-for="item in periods"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select></div>
     <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="试卷类型" v-model="addPaperModel.paperTypeId">
     <el-option
       v-for="item in paperTypes"
       :key="item.id"
       :label="item.name"
       :value="item.id">
     </el-option>
   </el-select></div>
     <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="地区" v-model="addPaperModel.areaId">
       <el-option
         v-for="item in areas"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select></div>
     <el-input v-if="addPaperModel.type==1" v-model="addPaperModel.selectCount"  placeholder="选择题个数" style="margin-bottom: 15px" ></el-input>
     <el-input v-if="addPaperModel.type==1" v-model="addPaperModel.bankCount"  placeholder="填空题个数" style="margin-bottom: 15px" ></el-input>
     <el-input v-if="addPaperModel.type==1" v-model="addPaperModel.judgeCount"  placeholder="判读题个数" style="margin-bottom: 15px" ></el-input>
     <div style="height: 100%;text-align: left;margin-bottom: 15px" v-if="addPaperModel.type==1"><el-select placeholder="难易度" v-model="addPaperModel.difficulty" >
       <el-option
         v-for="item in difficultys"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select></div>
     <el-button  @click="save()"  type="primary" >保存并上传</el-button>
   </el-dialog>
   <el-dialog
     @close="dialogCls"
     :visible.sync="updateVisible"
     title="修改试卷"
     width="50%" :close-on-click-modal="false"
   >
     <el-input v-model="updatePaperModel.name"  placeholder="请输入试卷名称" style="margin-bottom: 15px" ></el-input>
     <el-button  @click="confirmModify()"  type="primary" >保存并上传</el-button>
   </el-dialog>
 </div>
</template>

<script>
  import Head from '@/components/head'
  import productPaper from '@/common/js/productPaper'
  import commonService from '@/common/service/commonService'
  import testPaperService from '@/common/service/testPaperService'
  import Pager from '@/components/pager'
  export default {
    name: 'PaperManage',
    data(){
      return{
        pages:0,
        currentPage: 1,
        courses:[],
        grades:[],
        updateVisible:false,
        difficultys:[{
          id:1,
          name:'易'
        },
          {
            id:2,
            name:'中'
          },
          {
            id:3,
            name:'难'
          }
        ]
      ,
        areas: [{
          id:1,
          name:'广州'
        },
          {
            id:2,
            name:'佛山'
          },
          {
            id:3,
            name:'揭阳'
          },
          {
            id:4,
            name:'东莞'
          },
          {
            id:5,
            name:'中山'
          },
          {
            id:6,
            name:'珠海'
          }
        ],
        paperTypes: productPaper.model.paperTypes,
        periods:productPaper.model.periods,
       papers:[
      //    {
      //   id:1,
      //   name:"佛山顺德小学入学测试",
      //   typeName:"入学测试",
      //   createDate:"2018-12-01"
      // },
      //   {
      //     id:1,
      //     name:"佛山顺德小学入学测试",
      //     typeName:"入学测试",
      //     createDate:"2018-12-01"
      //   }
        ],
        addVisible:false,
        addPaperModel:{
          name:'',
          courseId:'',
          gradeId:'',
          periodId:'',
          paperTypeId:'',
          areaId:'',
          type:'',
          selectCount:'',
          judgeCount:'',
          bankCount:''
        },
        updatePaperModel:{
          id:'',
          name:''
        }
      }
    },
    methods:{
      search(){
        var param={name:''}
        testPaperService.searchTestPaperByPage(param,this.currentPage,5).then(res=>{
          if(res.data.data.list==null){
            this.papers=[],
              this.pages=0
          }
          this.papers =res.data.data.list;
          this.pages=res.data.data.page_total;
        })
      },
      confirmModify(){
        testPaperService.modifyTestPaper(this.updatePaperModel).then(res=>{
          this.search();
        })
      },
      modifyPaper(paper){
       this.updatePaperModel.id=paper.id;
       this.updatePaperModel.name=paper.name;
       this.updateVisible=true;
      },
      deletePaper(id){
        alert("确认删除试卷？");
        testPaperService.deleteTestPaper(id).then(res=>{
          this.search();
        })
      },
      save(){
        testPaperService.addTestPaper(this.addPaperModel).then(res=>{
          this.search();
        })
      },
      manualcreate(){
        this.addPaperModel.type=0;
        this.addVisible=true
      },
      autocreate(){
        this.addPaperModel.type=1;
        this.addVisible=true
      },
      nextPage: function (index) {
        this.currentPage = index;
        this.search()
      },
      selectSubject:function (id) {
        this.$router.push({
          path: '/knowledgeSubject',
          query: {
            paperId: id
          }
        })
      }

    },
    components:{
      headcommon: Head,
      pager:Pager
    },
    created:function () {
      this.search();
      commonService.getTopSubject().then(res=>{
        this.courses=res.data.data;
      });
      // 获取年级信息
      commonService.getAllGrade().then(res=>{
        this.grades = res.data.data;
      });
    }
  }
</script>

<style scoped>
  .paperItem{
    border:1px solid #EBEBEB;
    margin: 10px;
    min-height: 80px;
    text-align: left;
  }
  .paperItemName{
    min-height: 50px;
    line-height:50px;
    color: #1794D8;
    text-decoration: underline;
    font-size: 16px;
    margin-left: 10px;
  }
  .paperItemScore{
    min-height: 40px;
    background: #FAFAFA;
    line-height:40px;
    border-top: 1px solid #EBEBEB;
  }
</style>
