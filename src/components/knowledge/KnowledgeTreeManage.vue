<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <el-row class="row">
        <el-col style="text-align: left;margin-left: 10px;">
          <el-button icon="el-icon-plus" v-on:click="addTreeFlag=true" style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;">增加知识点目录树</el-button>
        </el-col>
      </el-row>


      <el-row class="row">
        <el-col span="3" style="margin-left: 10px;margin-right: 5px;">
          <el-select v-model="queryModel.subjectId" placeholder="学科"  @change="queryKnowledgeTree()">
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="3">
          <el-select v-model="queryModel.orgId" placeholder="学校" @change="queryKnowledgeTree()">
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="16">
          <el-row>
            <el-col span="16">
              <el-input placeholder="请输入知识点目录树关键字" v-model="queryModel.name"></el-input>
            </el-col>
            <el-col span="2">
              <el-button  @click="queryKnowledgeTree()" type="primary">搜索</el-button>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
      <!-- 表格-->
      <el-row class="row" style="margin-top: 20px">
        <el-table :data="knowledgeTrees"  border
                  style="width: 99%;margin: 3px 3px;" :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column label="知识目录树名称" align="center" >
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">{{scope.row.treeName}}</span>
              <span v-if="scope.row.status==0">{{scope.row.treeName}}</span>
            </template>

          </el-table-column>
          <el-table-column label="学科" width="80" align="center" prop="subjectName">

            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">{{scope.row.subjectName}}</span>
              <span v-if="scope.row.status==0">{{scope.row.subjectName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学校" align="center" prop="orgName">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">{{scope.row.orgName}}</span>
              <span v-if="scope.row.status==0">{{scope.row.orgName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学段" width="80" align="center" prop="stageName">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">{{scope.row.stageName}}</span>
              <span v-if="scope.row.status==0">{{scope.row.stageName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"  min-width="50" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">停用中</span>
              <span v-if="scope.row.status==0">启用中</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" prop="" min-width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="setKnowledgeAttributes(scope.$index, scope.row)"><span style="text-decoration-line: underline;font-size: 16px">设置知识点树属性</span></el-button>
              <el-button
                size="mini"
                type="text"
                @click="setKnowledge(scope.$index, scope.row)"><span style="text-decoration-line: underline;font-size: 16px">设置知识点</span></el-button>
              <el-button
                v-if="scope.row.status==1"
                size="mini"
                type="text"
                @click="reuse(scope.$index, scope.row)" ><span style="text-decoration-line: underline;font-size: 16px">启用</span></el-button>

              <el-button
                v-if="scope.row.status==0"
                size="mini"
                type="text"
                @click="stop(scope.$index, scope.row)" ><span style="color: red;text-decoration-line: underline;font-size: 16px">停用</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 10px;">
        <pager v-bind:totalPage="totalPages" v-on:gotoNext="nextPage"></pager>
      </el-row>

    </el-card>

    <!--增加知识目录树弹窗-->
    <el-dialog
      @close="dialogCls"
      title="增加知识目录树"
      :visible.sync="addTreeFlag"
      width="50%"
      :close-on-click-modal="false">

      <el-row class="row">
        <el-col span="3" class="add">知识目录树</el-col>
        <el-col span="20" class="add">
          <el-input v-model="knowledgeTreeManageModel.treeName"></el-input>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col span="3" class="add">选择学科</el-col>
        <el-col span="20" class="add">
          <el-select v-model="knowledgeTreeManageModel.subjectId" placeholder="学科">
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col span="3" class="add">适用学段</el-col>
        <el-col span="20" class="add">
          <el-select v-model="knowledgeTreeManageModel1.stageId" placeholder="适用学段"  >
            <el-option
              v-for="item in stages"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col span="3" class="add">学校机构</el-col>
        <el-col span="20" class="add">
          <el-select v-model="knowledgeTreeManageModel.orgId" placeholder="学校机构">
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col><el-button type="primary" @click="addKnowledgeTree">保存设置</el-button></el-col>
      </el-row>
    </el-dialog>

    <!-- 设置知识点弹窗-->
    <el-dialog
      title="设置知识点"
      :visible.sync="setKnowledgeFlag"
      width="50%"
      :close-on-click-modal="false"
      @close="dialogCls"
    >
      <el-row style="text-align: left">
        知识点目录树名称：{{currentTree.treeName}}
      </el-row>
      <el-row style="text-align: left; margin-top: 20px;">
        <el-button @click="editKnowledge('add')">新增一级知识点</el-button>
      </el-row>
      <el-row style="margin-top: 20px">
        <div class="block">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            :expand-on-click-node="false"
            :props="defaultProps"
            :render-content="renderContent">
          </el-tree>
        </div>
      </el-row>
    </el-dialog>
    <!--设置知识点目录树属性弹窗-->
    <el-dialog
      @close="dialogCls"
      title="设置知识点目录树属性"
      :visible.sync="setKnowledgeAttributesFlag"
      width="50%"
      :close-on-click-modal="false">

      <el-row class="row">
        <el-col span="3" class="add">知识目录树</el-col>
        <el-col span="20" class="add">
          <el-input v-model="knowledgeTreeManageModel1.name"></el-input>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col span="3" class="add">所属学科</el-col>
        <el-col span="20" class="add">
          <el-select v-model="knowledgeTreeManageModel1.subjectId" placeholder="学科"  disabled>
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col span="3" class="add">适用学段</el-col>
        <el-col span="20" class="add">
          <el-select v-model="knowledgeTreeManageModel1.stageId" placeholder="适用学段"  disabled>
            <el-option
              v-for="item in stages"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col span="3" class="add">学校机构</el-col>
        <el-col span="20" class="add">
          <el-select v-model="knowledgeTreeManageModel1.orgId" placeholder="学校机构"  disabled>
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col><el-button type="primary" @click="updateKnowledgeTreeAttribute">保存设置</el-button></el-col>
      </el-row>
    </el-dialog>
    <!--新增或者修改知识点目录树知识点-->
    <el-dialog
      @close="dialogCls"
      :visible.sync="editKnowledgeFlag"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-row style="text-align: left">
        知识点目录树名称：{{currentTree.treeName}}
      </el-row>
      <el-row style="margin-top: 10px; min-height: 40px; line-height: 40px;">
        <el-col span="4" style="text-align: left">知识点</el-col>
        <el-col span="20">
          <!--<el-select-->
            <!--v-model="knowledgeId"-->
            <!--filterable-->
            <!--remote-->
            <!--multiple-->
            <!--multiple-limit="1"-->
            <!--placeholder="请输入关键词"-->
            <!--@change="abc"-->
            <!--:remote-method="innerKnowledge"-->
            <!--:loading="loading">-->
            <!--<el-option-->
              <!--v-for="item in knowledgeList"-->
              <!--:key="item.id"-->
              <!--:label="item.name"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <el-autocomplete
            class="inline-input"
            v-model="knowledgeKey"
            :fetch-suggestions="querySearch"
            placeholder="请输入知识点名称"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-button @click="saveEditKnowledge">保存</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import commonService from '@/common/service/commonService'
  import orgService from '@/common/service/orgService'
  import knowledgeService from '@/common/service/knowledgeService'
  import knowledgeTreeManageModel from '@/common/js/knowledgeTreeManage'
  import pager from '@/components/pager'

  let id = 1000;
  export default {
    components: {
      pager:pager
    },
    name: "knowledge-tree-manage",
    data() {
      const data = [];
      return {
        data4: JSON.parse(JSON.stringify(data)),        //知识目录树知识点树状结构
        editType:'',            //当前操作知识点的类型：add:新增知识点目录树知识点，update:修改当前知识点目录树当前节点：delete:删除当前节点
        knowledgeTreeData:{"id":"","name":null,"children":[],"treeId":"","parentId":"","knowledgeId":""},
        knowledgeTrees:[],
        courses: [],   //所有学科
        orgs: [],       //所有机构
        addTreeFlag: false,     //增加知识点目录树
        setKnowledgeFlag: false,      //设置目录树知识点
        editKnowledgeFlag:false,      //新增或者修改知识目录树知识点
        setKnowledgeAttributesFlag:false,//设置知识点目录树属性
        editKnowledgeTitle: '',       //新增一级知识点或者孩子节点动态标题
        knowledgeTreeManageModel: knowledgeTreeManageModel.knowledgeTree,
        knowledgeTreeManageModel1: knowledgeTreeManageModel.knowledgeTree,
        queryModel: knowledgeTreeManageModel.knowledgeTree,
        stages:[],
        currentPage: 1,
        totalPages:0,
        nkey:'',               //最后用于去查询知识点的搜索关键字
        knowledgeId:'',       //用户最终选择的知识点id
        knowledgeKey:'',     //用户最终选择的知识点名称，用户树的名称展示
        loading:false,
        lastTime:null,        //用于标记当前有没有正在查询的知识点（知识点名称输入去抖查询）
        knowledgeList:[],     //根据输入的知识点关键字返回的知识点结果集
        currentTree:{},
        knowledgements:[],//智能查询知识点列表
        id,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },

    mounted() {

      commonService.getTopSubject().then(res => {
        this.courses = res.data.data;
      });
      commonService.getStages().then(res=>{
        this.stages=res.data.data;;
      })
      commonService.getOrgs().then(res=>{
        this.orgs=res.data.data;
      });
      this.queryKnowledgeTree();
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'padding:0px;height:60px;font-size:16px'
      },
      rowClass({ row, rowIndex}) {
        return 'background:#f7f7f7;padding:0px;color:#66b1ff;font-size:16px'
      },
      //设置知识点目录树属性
      setKnowledgeAttributes:function(index,row){
        this.setKnowledgeAttributesFlag=true;
        row["name"]=row['treeName'];
        this.knowledgeTreeManageModel1=row;
        this.id=row.treeId;
      },
      //关闭弹窗
      dialogCls: function () {
        this.knowledgeKey = '';

      },
      // abc:function (value) {
      //   let obj = {};
      //   obj = this.knowledgeList.find((item)=>{
      //     if(item.id==value){
      //       this.knowledgeKey = item.name;
      //       return item;
      //     }
      //   });
      //
      // },
      // innerKnowledge:function (key) {
      //   this.nkey = key;
      //   if(this.lastTime){
      //   }else{
      //     this.lastTime=1111;
      //     this.lastTime = setTimeout(()=>{
      //       if(this.nkey ===''){
      //         this.knowledgeList=[];
      //       }else{
      //         let param = {};
      //         param['name'] = this.nkey;
      //         knowledgeService.searchKnowledgeByPage(param,1,100).then(res =>{
      //           this.knowledgeList = res.list;
      //         });
      //       }
      //       this.lastTime = null;
      //     },200);
      //   }
      // },
      //新增知识目录树
      addKnowledgeTree:function () {
        knowledgeService.addKnowledgeTree(this.knowledgeTreeManageModel).then(res=>{
            if(res.hasOwnProperty("code")){
              alert(res.message);
              this.dialogCls();
              location.reload();

            }else{
              alert("新增成功");
              /*this.knowledgeTreeManageModel.name = "";
              this.knowledgeTreeManageModel.subjectId = "";
              this.knowledgeTreeManageModel.stageId = [];
              this.knowledgeTreeManageModel.orgId = "";*/
              this.dialogCls();
              location.reload();
            }
        });
      },
      updateKnowledgeTreeAttribute:function () {
        var param={};
        param['treeName']= this.knowledgeTreeManageModel1.name;
        param['treeId']=this.id;
        param['stageId']=this.knowledgeTreeManageModel1.stageId;
        param['orgId']=this.knowledgeTreeManageModel1.orgId;
        param['subjectId']=this.knowledgeTreeManageModel1.subjectId;
     knowledgeService.updateKnowledgeTreeAttribute(param).then(res=>{
       if(res.hasOwnProperty("code")){
         alert(res.message);
      }else{
         alert("设置知识点目录树属性成功");
        /*this.knowledgeTreeManageModel.name = "";
         this.knowledgeTreeManageModel.subjectId = "";
         this.knowledgeTreeManageModel.stageId = [];
        this.knowledgeTreeManageModel.orgId = "";*/
         location.reload();
       }
     });
  },
      //设置目录树知识点
      setKnowledge:function (index, row) {
        this.data4=''
        this.setKnowledgeFlag = true;
        this.currentTree = row;
        var param={}
        param['subjectId']=row.subjectId;
        knowledgeService.searchKnowledgeByPage(param,1,1000).then(res => {
          //alert(JSON.stringify(res.data.data.list))
          for(var i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i]["value"] = res.data.data.list[i]['name'];   //'text'是需要的字段
            delete res.data.data.list[i]['name'];  //key是要替换为'text'的字段
          }
          this.knowledgements=res.data.data.list;
        })
        //alert(JSON.stringify(row))

        knowledgeService.queryKnowledgeTreeKnowledge(row.treeId).then(res =>{
          // alert(JSON.stringify(res))
              this.data4 = res.data.result.nodes;
        });
      },

      //新增或者修改知识目录树知识点
      editKnowledge:function (type,data) {
        this.editType = type;
        this.knowledgeTreeData = data;
        this.editKnowledgeFlag = true;
        if(type=='update') {
          this.knowledgeKey = data.name;
        }
      },

      //保存新增或者修改知识目录树知识点到树中
      saveEditKnowledge:function () {
        if(this.editType === 'add'){
          if(this.knowledgeTreeData){     //新增孩子节点
            const newChild = { id: this._global.util.UUID(), name: this.knowledgeKey, children: [],"treeId":this.currentTree.treeId,"parentId":this.knowledgeTreeData.id,"knowledgeId":this.knowledgeId };
            if (!this.knowledgeTreeData.children) {
              this.$set(this.knowledgeTreeData, 'children', []);
            }
            this.knowledgeTreeData.children.push(newChild);

          }else{    //新增一级节点
            const newChild = { id: this._global.util.UUID(), name: this.knowledgeKey, children: [] ,"treeId":this.currentTree.treeId,"parentId":"","knowledgeId":this.knowledgeId};
            this.data4.push(newChild);
          }
        }

        if(this.editType === 'update'){
          this.knowledgeTreeData.name = this.knowledgeKey;
          this.knowledgeTreeData.knowledgeId = this.knowledgeId;
        }
        this.editKnowledgeFlag = false;

        knowledgeService.updateKnowledgeTreeKnowledge(this.data4).then(res =>{
          alert("更新成功");
          this.knowledgeKey = '';

        });


      },
      remove(store, data){
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
        store.remove(data);
        knowledgeService.updateKnowledgeTreeKnowledge(this.data4).then(res =>{
        });
      },
      //分页
      nextPage: function (index) {
        this.currentPage = index;
        this.queryKnowledgeTree();
      },

      //查询知识点目录树
      queryKnowledgeTree:function () {
        this.knowledgeTrees = '';
        this.totalPages = 0;
        this.queryModel.treeName=this.queryModel.name
        knowledgeService.queryKnowledgeTree(this.queryModel,this.currentPage,5).then(res=>{
          // alert(JSON.stringify(res))
          this.knowledgeTrees = res.data.result.list;
          this.totalPages = res.data.result.pages;
        });
      },


      renderContent(h, { node, data, store }) {
        return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
               <span>
                <el-button size="mini" type="text" on-click={ () => this.editKnowledge("add",data) }>新增</el-button>
                <el-button size="mini" type="text" on-click={ () => this.editKnowledge("update",data) }>编辑</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(store, data) }>删除</el-button>
              </span>
            </span>
        );
      },
      //智能查询用的函数
      querySearch(queryString, cb) {
        var knowledgements = this.knowledgements;
        var results = queryString ? knowledgements.filter(this.createFilter(queryString)) : knowledgements;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (knowledgements) => {
          if(knowledgements.value==null) return false;
          return (knowledgements.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
       this.knowledgeId=item.id;
      },
      //
      stop(index, row) {
        this.knowledgeTrees[index].status=1;
        var param={};
         param['id']=row.treeId;
         param['status']=1;
        param['subjectId']=row.subjectId;
        param['orgId']=row.orgId;
        param['stageId']=row.stageId;
        knowledgeService.updateKnowledgeTree(param).then(res=>{
          if(res.hasOwnProperty("code")){
             alert(res.message);
           }else{
            console.info("停用成功")
          }
         });
      },
      reuse(index, row){
        var param={};
        param['id']=row.treeId;
        param['status']=0;
        param['subjectId']=row.subjectId;
        param['orgId']=row.orgId;
        param['stageId']=row.stageId;
        knowledgeService.updateKnowledgeTree(param).then(res=>{
          if(res.hasOwnProperty("code")){
            alert(res.message);
          }else{
            this.knowledgeTrees[index].status=0;
            console.info("启动成功")
          }
        });
      },


    }
  }
</script>
<style>
  .el-dialog__header {
    padding: 10px 10px 10px;
    background: #f0f0f0;
    text-align: left;
  }
  .el-dialog__title{
    color: #66b1ff;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: 15px;
    right: 10px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<style scoped>
  @import "KnowledgeTreeManage.css";
</style>
