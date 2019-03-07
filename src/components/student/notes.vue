<template>
   <div>
  <!--
  Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
  -->
  <el-card  :body-style="{ padding: '0px' }">
    <el-row class="row">
     <el-col :span="24" >
      <el-form ref="infoForm" :model="infoForm" :rules="rules" >
       <el-form-item label="标题" prop="title">
        <el-input v-model="infoForm.title"></el-input>
       </el-form-item>
  <!--使用编辑器
  -->
       <el-form-item label="详细" prop="content">
        <div class="edit_container">
         <quill-editor v-model="infoForm.content"
                                     ref="myQuillEditor"
                                     class="editer"
                                     :options="editorOption" @ready="onEditorReady($event)">
         </quill-editor>
        </div>
       </el-form-item>
   
       <el-form-item>
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
       </el-form-item>
      </el-form>
     </el-col>
    </el-row>
  </el-card>
   </div>
</template>
 
<script>
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  import commonService from '@/common/service/commonService'
  export default {
    data() {
      return {
        infoForm: {
          title: '',
          content:'',
          registerNo:''
        },
        //表单验证
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      commonService.getNote(sessionStorage.getItem('registerNo')).then(res=>{
        if(res.data.data!=null) {
          this.infoForm = res.data.data;
        }
      })
    },
    methods: {
      onEditorReady(editor) {
      },
      onSubmit() {
        this.infoForm.registerNo=sessionStorage.getItem('registerNo');
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
           commonService.saveNote(this.infoForm).then(res=>{
             if(res.data.code==0){
               alert("保存成功")
             }
           })
          }
        });
      }
    },
    components: {
//使用编辑器
      quillEditor
    }
  }
</script>
<style>
  .row{
    border-top:1px solid #EBEBEB;
    min-height: 55px;
    line-height: 55px;
  }
</style>
