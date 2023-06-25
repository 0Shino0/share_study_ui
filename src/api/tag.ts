import request from '@/utils/request'
// 资料标签


/** 获取标签分页接口
 * @param {}
 * @method get
 * @returns {}
  */
export function getTagList() {
  return request({
    url: `/tag/list`,
    method: "get",
  })
}