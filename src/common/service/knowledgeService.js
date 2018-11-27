import _global from '@/common/js/GlobalParams'
import {fetch} from '@/common/js/fetch'

// /**
//  * 根据学段学科获取知识点树
//  * @param stageSubjectId
//  * @returns {*}
//  */
// export function getKnowledgeByStageSjubject(stageSubjectId) {
//   return fetch({
//     url: _global.requestUrl.getKnowledgeByStageCourseUrl + stageSubjectId,
//     method: 'get',
//     params: null
//   })
// }


/**
 * 根据不同查询条件返回知识点列表
 * @param param
 * @returns [*]
 */
export function searchKnowledgeByPage(param, pageNo, pageSize) {
  return fetch({
    url: _global.requestUrl.knowledgeSearchUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })

}
/**
 * 增加知识点
 * @param param
 * @returns [*]
 */
export function addKnowledge(param) {
  return fetch({
    url: _global.requestUrl.addKnowledgeUrl,
    method: 'post',
    data: param
  })

}
/**
 * 更新知识点
 * @param param
 * @returns [*]
 */
export function updateKnowledge(param) {
  return fetch({
    url: _global.requestUrl.updateKnowledgeUrl,
    method: 'post',
    data: param
  })
}
/**
 * 下载批量导入知识点模板
 * @param param
 * @returns [*]
 */
export function downloadExcelTemplate() {
  return fetch({
    url: _global.requestUrl.downloadExcelUrl,
    method: 'get',
    params: null
  })

}

/**
 * add knowledgeTree
 * @param param
 * @returns {*}
 */
export function addKnowledgeTree(param) {
  return fetch({
    url: _global.requestUrl.addKnowledgeTreeUrl,
    method: 'post',
    data: param
  })
}
/**
 * upodate knowledgeTree
 * @param param
 * @returns {*}
 */
export function updateKnowledgeTree(param) {
  return fetch({
    url: _global.requestUrl.updateKnowledgeTreeUrl,
    method: 'post',
    data: param
  })
}

/**
 * update KnowledgeTreeAttribute
 * @param param
 * @returns {*}
 */
export function updateKnowledgeTreeAttribute(param) {
  return fetch({
    url: _global.requestUrl.updateKnowledgeTreeAttributeUrl,
    method: 'post',
    data: param
  })
}
/**
 * query knowledgeTree
 * @param param
 * @returns {*}
 */
export function queryKnowledgeTree(param,pageNo,pageSize) {
  return fetch({
    url: _global.requestUrl.queryKnowledgeTreeUseInfoUrl+pageNo+"/"+pageSize,
    method: 'post',
    data: param
  })
}

export function updateKnowledgeTreeKnowledge(param) {
  return fetch({
    url: _global.requestUrl.updateKnowledgeTreeKnowledgeUrl,
    method: 'post',
    data: param
  })
}

export function queryKnowledgeTreeKnowledge(treeId) {
  return fetch({
    url: _global.requestUrl.queryKnowledgeTreeKnowledgeUrl+treeId,
    method: 'get',
    params: null
  })
}

/**
 * 根据学科学段机构获取应用知识树Id
 * @param param
 * @returns [*]
 */
export function searchTreeIdByCondition(param) {
  return fetch({
    url: _global.requestUrl.searchTreeIdByConditionUrl,
    method: 'post',
    data: param
  })

}
/**
 * 根据学科学段机构获取应用知识树Id
 * @param treeId
 * @returns [*]
 */
export function queryKnowledgeTreeById(treeId) {
  return fetch({
    url: _global.requestUrl.queryKnowledgeTreeByIdUrl+treeId,
    method: 'get',
    params: null
  })
}
/**
 * 删除知识点目录树节点
 * @param Id
 * @returns [*]
 */
export function deleteNodeAndChildrens(Id) {
  return fetch({
    url: _global.requestUrl.deleteNodeAndChildrensUrl+Id,
    method: 'get',
    params: null
  })
}
export default {
  // getKnowledgeByStageSjubject,
  searchKnowledgeByPage,
  addKnowledge,
  updateKnowledge,
  downloadExcelTemplate,
  addKnowledgeTree,
  queryKnowledgeTree,
  updateKnowledgeTreeKnowledge,
  queryKnowledgeTreeKnowledge,
  updateKnowledgeTree,
  updateKnowledgeTreeAttribute,
  searchTreeIdByCondition,
  queryKnowledgeTreeById,
  deleteNodeAndChildrens
}
