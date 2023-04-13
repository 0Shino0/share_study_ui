/* 待审批接口 */
import request from "@/utils/request"

/** 获取待审批资料 Excel
 * @param {null}
 * @method get
  */
export function getAuditExcel() {
  return request({
    url: `/resource/download`,
    method: "get",
    responseType: 'blob'
  })
}

/** 待审批资料 删除接口
 * @param {string} id
 * @method delete
  */
export function delAudit(id) {
  return request({
    url: `/resource_censor/delete/${id}`,
    method: "delete",
  })
}

/** 待审批资料 批量删除接口
 * @param {object} data
 * @method delete
  */
export function delAuditBatch(data) {
  return request({
    url: `/resource/deleteBatch`,
    method: "get",
    data
  })
}

/** 管理员根据id获取待审批资料
 * @param {string} id
 * @method get
  */
export function getAudit(id) {
  return request({
    url: `/resource/get/${id}`,
    method: "get",
  })
}

/** 修改待审批资料 接口
 * @param {object} data
 * @method put
  */
export function updateAudit(data) {
  return request({
    url: `/resource/update`,
    method: "put",
    data
  })
}

/** 待审批资料 分页查询接口
 * @param {number} current
 * @param {number} pageSize
 * @method post
  */
export function getAuditPageInfo(current, pageSize) {
  return request({
    url: `/resource_censor/page/${current}/${pageSize}`,
    method: "get",
  })
}

/** 审批资料
 * @param {object} data
 * @method put
  */
export function updateAuditResource(data) {
  return request({
    url: `/resource_censor/update`,
    method: "put",
    data
  })
}

/** 审批资料 超管发布审批资料
 * @param {string} id
 * @method put
  */
export function publishAuditResource(id) {
  return request({
    url: `/resource_censor/publish/${id}`,
    method: "post",
  })
}
