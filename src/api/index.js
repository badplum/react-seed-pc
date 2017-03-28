import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {

  /**
   * 暴露api上的几个底层方法: get / post
   */
  ...api,

  getKPIList: query => api.post('/groovy/getKPIList', query),
};
