<template>
    <div v-on:click="gotoEditPaper">
      <div class="fixed">
        <div style="margin-top: 10px;">{{srcPaperSubjectSum}}/100</div>
        <div><hr style="border: 1px solid #EAF6FD"/></div>
        <div>进</div>
        <div>入</div>
        <div>组</div>
        <div>卷</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "entry-paper-edit",
        data(){
          return {
            srcPaperSubjectSum : 0
          }
        },
        methods:{
          gotoEditPaper:function() {
            var paper = this._global.storage.getSession('srcPaper');

            this.$router.push({ path: '/paperEdit'
            })

          },
          flushSubject: function () {
            var sum = this._global.storage.getSession('srcPaperSubjectSum');

              this.srcPaperSubjectSum = sum==null?0:sum;
          }
        },
      mounted(){
       this.flushSubject();
      }
    }
</script>

<style scoped>
  .fixed{
    position: fixed;
    width: 60px;
    height: 150px;
    right:13%;
    top:35%;
    background: #32A3DD;
    color: #EAF6FD;
  }
</style>
