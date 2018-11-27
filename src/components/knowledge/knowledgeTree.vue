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
        this.$emit('knowledgeName',data.name)
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
          knowledgeService.queryKnowledgeTreeById(res[0]).then(res=>{

            if(res.treeInfo.status==0) {
              this.data = res.nodes
            }
            else{
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
          knowledgeService.queryKnowledgeTreeById(res[0]).then(res=>{
            if(res.treeInfo.status==0) {
              this.data = res.nodes
            }
            else{
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
