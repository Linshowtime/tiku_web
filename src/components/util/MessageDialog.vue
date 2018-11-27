<template>
  <el-dialog
    :visible.sync="messageVisible"
    width="30%"
  >
    <span>{{message}}</span>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog()">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "message-dialog",
        props: ['message','messageVisible'],
      methods:{
        closeDialog:function(){
          this.messageVisible=false;
          this.$emit('visable',false)
        }
      }
    }
</script>

<style scoped>

</style>
