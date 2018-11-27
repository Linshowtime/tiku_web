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
export function deleteSubjectFromTestPaper(testPaperId, subjectId) {
  return fetch({
    url: _global.requestUrl.deleteQuestionFromTestPaperUrl + testPaperId + '/' + subjectId,
    method: 'get',
    params: null
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

export default {
  addSubjectToTestPaper,
  deleteSubjectFromTestPaper,
  searchTestPaperByPage,
  saveTestPaper,
  getTestPaperQuestions
}
