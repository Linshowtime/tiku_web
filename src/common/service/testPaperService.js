import _global from '@/common/js/GlobalParams'
import {fetch} from "@/common/js/fetch";

/**
 * 添加题目至试卷
 * @param testPaperSubject
 * @returns {*}
 */
export function addSubjectToTestPaper(testPaperSubject) {
  return fetch({
    url: _global.requestUrl.addQuestionToTestPaperUrl,
    method: 'post',
    data: testPaperSubject
  })
}

/**
 * 删除试卷题目
 * @param testPaperId
 * @param subjectId
 * @returns {*}
 */
export function deleteSubjectFromTestPaper(param) {
  return fetch({
    url: _global.requestUrl.deleteQuestionFromTestPaperUrl,
    method: 'post',
    data: param
  })
}

/**
 * 分页查询试卷
 * @param param
 * @param pageNo
 * @param pageSize
 * @returns {*}
 */
export function searchTestPaperByPage(param, pageNo, pageSize) {
  return fetch({
    url: _global.requestUrl.testPaperSearchUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })
}
export function deleteTestPaper(testPaperId) {
  return fetch({
    url: _global.requestUrl.deletePaperUrl + testPaperId ,
    method: 'get',
    params: null
  })
}
  export function modifyTestPaper(param) {
    return fetch({
      url: _global.requestUrl.modifyPaperUrl,
      method: 'post',
      data: param
    })
  }
    export function addTestPaper(param) {
      return fetch({
        url: _global.requestUrl.addPaperUrl,
        method: 'post',
        data: param
      })
    }



/**
 * 保存试卷
 * @param subjectList
 * @returns {*}
 */
export function saveTestPaper(subjectList) {
  return fetch({
    url: _global.requestUrl.saveTestPaperUrl,
    method: 'post',
    data: subjectList
  })
}
/**
* 发布考试
* @param subjectList
* @returns {*}
*/
export function addExamRecord(param) {
  return fetch({
    url: _global.requestUrl.addExamRecordUrl,
    method: 'post',
    data: param
  })
}
/**
 * 获取考试信息
 * @param subjectList
 * @returns {*}
 */
export function searchExamRecord(param) {
  return fetch({
    url: _global.requestUrl.searchExamRecordUrl,
    method: 'post',
    data: param
  })
}
/**
 * 提交考试试卷
 * @param subjectList
 * @returns {*}
 */
export function submitRecordAnswer(recordId,param) {
  return fetch({
    url: _global.requestUrl.submitRecordAnswerUrl+recordId,
    method: 'post',
    data: param
  })
}
/**
 * 根据试卷id获取试卷题目
 * @param testPaperId
 * @returns {*}
 */
export function getTestPaperQuestions(testPaperId) {
  return fetch({
    url: _global.requestUrl.getTestPaperQuestionsUrl + testPaperId,
    method: 'get',
    params: null
  })
}
/**
 * 获取考试结果
 * @param recordId
 * @returns {*}
 */
export function getExamResult(recordId) {
  return fetch({
    url: _global.requestUrl.getExamResultUrl + recordId,
    method: 'get',
    params: null
  })
}
/**
 * 获取错题本
 * @param registerNo
 * @returns {*}
 */
export function getErrorRecord(registerNo) {
  return fetch({
    url: _global.requestUrl.getErrorRecordUrl + registerNo,
    method: 'get',
    params: null
  })
}
export default {
  addSubjectToTestPaper,
  deleteSubjectFromTestPaper,
  searchTestPaperByPage,
  saveTestPaper,
  getTestPaperQuestions,
  deleteTestPaper,
  modifyTestPaper,
  addTestPaper,
  addExamRecord,
  searchExamRecord,
  submitRecordAnswer,
  getExamResult,
  getErrorRecord
}
