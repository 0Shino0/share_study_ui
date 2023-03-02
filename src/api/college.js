import request from '@/utils/request'

/** 获取单个高校信息
 * id 高校id
 * get
  */
export function getCollegeName(id) {
  return request({
    url: `/college/get/${id}`,
    method: "get",
  })
}