import _global from '@/common/js/GlobalParams'
import {fetch} from '@/common/js/fetch'
/**
 * 根据不同查询条件返回知识点列表
 * @param param
 * @returns [*]
 */
export function searchOrgByPage(param, pageNo, pageSize) {
  return fetch({
    url: _global.requestUrl.queryOrgUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })

}
export function searchOrgList(param) {
  return fetch({
    url: _global.requestUrl.allOrgUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })

}
/**
 * 增加知识点
 * @param param
 * @returns [*]
 */
export function addOrg(param) {
  return fetch({
    url: _global.requestUrl.addOrgUrl,
    method: 'post',
    data: param
  })

}
/**
 * 更新知识点
 * @param param
 * @returns [*]
 */
export function updateOrg(param) {
  return fetch({
    url: _global.requestUrl.updateOrgUrl,
    method: 'post',
    data: param
  })
}



export default {
  // getKnowledgeByStageSjubject,
  searchOrgByPage,
  addOrg,
  updateOrg,
  searchOrgList


}
