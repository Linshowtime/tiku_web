import _global from '@/common/js/GlobalParams'
import {fetch} from "@/common/js/fetch"; //引用fetch.js

/**
 * 根据条件分页查询题目
 * @param param
 * @param pageNo
 * @param pageSize
 * @returns {*}
 */
export function searchQuestionByPage(param, pageNo, pageSize) {
  return fetch({
    url: _global.requestUrl.questionSearchUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })
}

/**
 * 根据学段学科获取题目类型
 * @param stageSubjectId
 * @returns {*}
 */
export function getQuestionType(stageSubjectId) {
  return fetch({
    url: _global.requestUrl.getQuestionTypeUrl + stageSubjectId,
    method: 'get',
    params: null
  })
}

export default {
  searchQuestionByPage,
  getQuestionType
}
