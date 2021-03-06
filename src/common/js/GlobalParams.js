export const srcPaper = null

//请求url
export const requestUrl = {
  testUrl: process.env.BASE_URL+'/api/auth/get',
  allOrgUrl: process.env.Human_Service_URL+'/org/api/query/list',
  addOrgUrl: process.env.Human_Service_URL+'/org/api/add',
  updateOrgUrl: process.env.Human_Service_URL+ '/org/api/modify',
  queryOrgUrl: process.env.Human_Service_URL+ '/org/api/query/',
  queryStudentUrl :process.env.Human_Service_URL+'/user/api/query/student/',
  addStudentUrl: process.env.Human_Service_URL +'/user/api/addStudent',
  authStudentUrl: process.env.Human_Service_URL +'/user/api/authStudent',
  updateStudentUrl: process.env.Human_Service_URL +'/user/api/updateStudent',
  queryTeacherUrl :process.env.Human_Service_URL+'/user/api/query/teacher/',
  addTeacherUrl: process.env.Human_Service_URL +'/user/api/addTeacher',
  updateTeacherUrl: process.env.Human_Service_URL +'/user/api/updateTeacher',
  authTeacherUrl: process.env.Human_Service_URL +'/user/api/authTeacher',
  addClassUrl: process.env.Human_Service_URL+'/class/api/add',
  getOrgIdUrl: process.env.Human_Service_URL+'/user/api/orgId/',
  modifyClassUrl: process.env.Human_Service_URL+'/class/api/modify',
  getClassByRegisterNoUrl: process.env.Human_Service_URL+'/class/api/searchClass/',
  addStudentToClassUrl: process.env.Human_Service_URL+'/class/api/add/student',
  removeStudentFromClassUrl: process.env.Human_Service_URL+'/class/api/remove/student',
  //获取顶级学科
  getTopSubjectUrl: process.env.Human_Service_URL + "/course/api/getAllCourse",
  // //获取所有年级
  // getGradesUrl: process.env.BASE_URL + "/api/common/findAllGrades",
  //获取所有学段
  getStagesUrl: process.env.Human_Service_URL + "/segment/api/getAllSegment",
  //获取所有年级
  getGradesUrl: process.env.Human_Service_URL + "/grade/api/getAllGrade",

  loginUrl: process.env.Human_Service_URL+"/user/api/login",
  updateUserUrl: process.env.Human_Service_URL+"/user/api/modify",
  registerUrl:  process.env.Human_Service_URL+"/user/api/register" ,
  sendMsgUrl:    process.env.Human_Service_URL+"/message/api/sendMsg",
  validateNumUrl:    process.env.Human_Service_URL+"/message/api/validateNum",

  //分页查询题目
  questionSearchUrl: process.env.Subject_Service_URL + 'query/',
  addQuestionUrl: process.env.Subject_Service_URL+ 'add',
  modifyQuestionUrl: process.env.Subject_Service_URL+ 'modify',
  deleteQuestionUrl: process.env.Subject_Service_URL+ 'delete/',

  //试卷班型（精英数学等）
  getTestPaperClassTypeUrl: process.env.BASE_URL + '/api/exam/paper/searchClassTypes',

  //分页查询试卷
  testPaperSearchUrl: process.env.Paper_Service_URL + 'query/',
  modifyPaperUrl:process.env.Paper_Service_URL+'modify',
  deletePaperUrl:process.env.Paper_Service_URL+'delete/',
  addPaperUrl:process.env.Paper_Service_URL+'add',
  //获取试卷题目
  getTestPaperQuestionsUrl: process.env.Paper_Service_URL + 'subject/',
  //获取试卷题目
  getTestPaperQuestionIdsUrl: process.env.Paper_Service_URL + 'subjectId/',
  //添加题目至试卷
  addQuestionToTestPaperUrl: process.env.Paper_Service_URL + 'add/subject',
  //删除试卷题目
  deleteQuestionFromTestPaperUrl: process.env.Paper_Service_URL + 'delete/subject',
  //保存试卷
  saveTestPaperUrl: process.env.Paper_Service_URL + 'update/subject',
 //发布考试
  addExamRecordUrl: process.env.Paper_Service_URL+'add/exam/record',
  //获取考试信息
  searchExamRecordUrl: process.env.Paper_Service_URL+'get/exam/record',
  //提交考试试卷
  submitRecordAnswerUrl: process.env.Paper_Service_URL+'submit/record/answer/',
  getExamResultUrl: process.env.Paper_Service_URL+'exam/result/',
  getErrorRecordUrl: process.env.Paper_Service_URL+'record/error/',


  getNoteUrl: process.env.Note_Service_URL+'get/',
  saveNoteUrl: process.env.Note_Service_URL+'save',
  // //批量添加题目至试卷
  // batchAddQuestionsToTestPaperUrl: process.env.Paper_Service_URL + '/api/exam/paper/batchAddSubjectToPaper',
  // //批量删除试卷题目
  // batchDeleteQuestionsFromTestPaperUrl: process.env.Paper_Service_URL + '/api/exam/paper/batchDeletePaperSubject',


  //根据学段学科获取知识点
  getKnowledgeByStageCourseUrl: process.env.Subject_Service_URL + '/subject/api/knowledge/',

  //根据不同条件查询知识点
  knowledgeSearchUrl: process.env.Knowledge_Service_URL+'query/',
  //增加知识
  addKnowledgeUrl: process.env.Knowledge_Service_URL+'add',
  //修改知识点
  updateKnowledgeUrl: process.env.Knowledge_Service_URL+'update',
  downloadExcelUrl: process.env.Knowledge_Service_URL+'knowledge/api/downloadExcel',

  //新增知识目录树
  addKnowledgeTreeUrl: process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/add-use-info',
  queryKnowledgeTreeUrl:process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/query/',
  queryKnowledgeTreeUseInfoUrl: process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/use-info/query/',
  updateKnowledgeTreeKnowledgeUrl:process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/knowledge/update',
  queryKnowledgeTreeKnowledgeUrl:process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/',
  updateKnowledgeTreeUrl:process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/update',
  updateKnowledgeTreeAttributeUrl: process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/update-use-info',
  searchTreeIdByConditionUrl:process.env.Exam_Web_URL +'knowledge/api/knowledge-tree/use-info/treeId/query',
  queryKnowledgeTreeByIdUrl: process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/',
  deleteNodeAndChildrensUrl: process.env.Exam_Web_URL+'knowledge/api/knowledge-tree/node/delete/',



  //手工录题跳入老版本题库url
  manualAddQuestionUrl: process.env.Exam_Web_URL + 'import/single-import-paper/',
  //批量导入跳入老题库url
  batchAddQuestionUrl: process.env.Exam_Web_URL + 'import/batch-import-paper/',
  //进入组卷跳转URL
  entryPaperEditUrl: process.env.Exam_Web_URL + 'import/teachNet-paperSubject-list?page=1&paperId=',
  //获取题目类型
  getQuestionTypeUrl: process.env.Subject_Service_URL + '/subject/api/subjecttype/',
  //根据学段，学科获取学段学科id
  getStageSubjectIdUrl: process.env.Paper_Service_URL + "/api/common/findSegmentCourseIds",
  //根据年级获取学段
  getStageByGradeUrl: process.env.Paper_Service_URL + '/api/common/findSegmentByGradeId?gradeId=',
  //获取所有区域
  allAreasUrl: process.env.BASE_URL + '/api/exam/area/findAllAreas'

}

//封装增加删除题目题目数变化函数
export const paperUtil = {
  flushSrcPaperSubjectSum: function (subject, type) {
    var srcPaperSubjectSum = storage.getSession('srcPaperSubjectSum');
    var subLen = 1;
    if (type == 'add') {
      storage.setSession('srcPaperSubjectSum', (srcPaperSubjectSum + subLen), 0);
    }
    if (type == 'del') {
      storage.setSession('srcPaperSubjectSum', (srcPaperSubjectSum - subLen), 0);
    }
  },
  getSrcPaperSubjectSum: function () {
    var srcPaperSubjectSum = storage.getSession('srcPaperSubjectSum');
    return srcPaperSubjectSum;
  }
}

//封装storaged的使用
export const storage = {
  setStorage: function (key, value, duration) {
    var data = {
      value: value,
      expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
    };

    localStorage[key] = JSON.stringify(data);
  },
  getStorage: function (key) {
    var data = localStorage[key];
    if (!data || data === "null") {
      return null;
    }
    var now = this.getCurrentTimeStamp();
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }

    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj.value;
    }
    return null;
  },
  removeStorage: function (key) {
    localStorage.removeItem(key);
  },
  getSession: function (key) {
    var data = sessionStorage[key];
    if (!data || data === "null") {
      return null;
    }
    return JSON.parse(data).value;
  },
  setSession: function (key, value) {
    var data = {
      value: value
    }
    sessionStorage[key] = JSON.stringify(data);
  },
  getCurrentTimeStamp: function () {
    return Date.parse(new Date());
  }
}

export const grades = [
  {
    id: '16005289-5034-411a-89f7-92868c327ac1',
    name: '一年级'
  },
  {
    id: '450a363a-4b66-4af7-928a-35e890c2b14f',
    name: '二年级'
  },
  {
    id: '70d450d3-84fa-47ea-bba7-601c2280a6d7',
    name: '三年级'
  },
  {
    id: 'e8c1a8f2-f848-41f9-ac84-e0af7b5f33c6',
    name: '四年级'
  },
  {
    id: '21279be5-f1c8-4344-92f0-bed245a30ec4',
    name: '五年级'
  },
  {
    id: '6f773beb-b898-46b3-9ce1-1e17d026bb01',
    name: '六年级'
  },
  {
    id: '9a9535ab-e930-4d84-bb85-0801fb2dbbd8',
    name: '七年级'
  },
  {
    id: 'dcf1cbb8-3c13-4cc1-aed9-534861abcd83',
    name: '八年级'
  },
  {
    id: 'fba3a5f3-bcd7-4ffd-aa75-ee34b65febf7',
    name: '九年级'
  },
  {
    id: '8603ca73-9d98-4a07-a506-c69d83e06210',
    name: '高一'
  },
  {
    id: '8f03a5e8-53b0-4e86-8927-70d4f45598f2',
    name: '高二'
  },
  {
    id: '7b7add7e-b354-4659-9927-5f92c6ab111d',
    name: '高三'
  }
]


export const courses = [
  {
    id: 'be50a0bb-642c-4d8b-842c-ebe08bedfbb6',
    name: '语文'
  },
  {
    id: 'd02fbd0c-83b8-44eb-8b45-ce0020f2f90c',
    name: '数学'
  },
  {
    id: '3384a275-50bc-49ff-9911-48eeafcfeea3',
    name: '英语'
  },
  {
    id: 'b67d176c-ea79-469d-8116-6e0bc4c60dfc',
    name: '物理'
  },
  {
    id: '2f7145bd-0f87-4b04-b6d2-59e89b2d3581',
    name: '化学'
  },
  {
    id: '93da4f0d-1324-439f-bebd-999ea94da342',
    name: '生物'
  },
  {
    id: '2a42484e-222b-467d-ab87-a343f5024119',
    name: '地理'
  },
  {
    id: '40f484a5-47a2-48a1-8a30-1dca5e5f2efa',
    name: '政治'
  },
  {
    id: 'e29bee14-a686-4476-b6d5-96dbde08222f',
    name: '历史'
  }
]

export const subjectTypeName = {
  '1': "填空题",
  '2': "选择题",
  '3': "判断题",
}


export const util ={
  UUID:function () {
    return this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4();
  },

  S4:function () {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  },

  debounce:function (func,delay) {
    let timer;
    return function (...args) {
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        func.apply(this,args);
      },delay);
    }
  }

}


export default {
  srcPaper,
  storage,
  courses,
  grades,
  subjectTypeName,
  paperUtil,
  requestUrl,
  util
}
