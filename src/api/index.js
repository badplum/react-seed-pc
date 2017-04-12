import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {

  // 暴露api上的几个底层方法: get / post
  ...api,

  // 获取xx列表
  getList: query => api.post('/test/list', query),

  // 获取xx详情
  getDetail: query => api.post('/test/detail', query),

  // 保存xx详情
  saveDetail: query => api.post('/test/saveDetail', query),
};
