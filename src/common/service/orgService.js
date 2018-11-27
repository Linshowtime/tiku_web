import _global from '@/common/js/GlobalParams'
import {fetch} from "@/common/js/fetch";

export function getAllOrg() {
  return fetch({
    url: _global.requestUrl.allOrgUrl+"1/100",
    method: 'post',
    data: null
  })
}

export default {
  getAllOrg
}
