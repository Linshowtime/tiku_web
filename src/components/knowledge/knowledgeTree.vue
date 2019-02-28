<template>
    <div>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
  import knowledgeService from '@/common/service/knowledgeService'
  export default {
    // props: ["segmentCourseId"],
    props: ["orgId","subject","studySection"],
    data() {
      return {
        // segmentCourseId:'',
        orgId:'',
        subject:'',
        studySection:'',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        this.$emit('knowledgeId',data.knowledgeId)
      }
    },
    watch: {
      // segmentCourseId(newValue,oldvalue){
      //   knowledgeService.getKnowledgeByStageSjubject(newValue).then(res=>{
      //     this.data = res;
      //   })
      // },
      //
      subject(newValue,oldvalue){
        var param ={}
        param["orgId"]=this.orgId
        param['subjectId']=newValue
        param['stageId']=this.studySection;
        knowledgeService.searchTreeIdByCondition(param).then(res=>{
          knowledgeService.queryKnowledgeTreeById(res.data.result[0]).then(res=>{
            // alert(JSON.stringify(res))
            if(res.data.result.treeInfo!=null) {
              this.data = res.data.result.nodes
            }
            else{
              alert("该学科学段不存在知识点树")
              this.data=[]
            }

          })
        })
      },
      studySection(newValue,oldvalue){
        var param ={}
        param["orgId"]=this.orgId
        param['subjectId']=this.subject
        param['stageId']=newValue
        knowledgeService.searchTreeIdByCondition(param).then(res=>{
          knowledgeService.queryKnowledgeTreeById(res.data.result[0]).then(res=>{
            //alert(JSON.stringify(res))
            if(res.data.result.treeInfo!=null) {
              this.data = res.data.result.nodes
            }
            else{
              alert("该学科学段不存在知识点树")
              this.data=[]
            }
          })
        })
      }

    }
  }
</script>

<style scoped>

</style>
