/**
 * @file components/chart/Line.js
 *  折线图
 * @author maoquan(maoquan@htsc.com)
 */

import 'echarts/lib/chart/line';

import ChartBase from './ChartBase';

export default class Line extends ChartBase {
  static defaultProps = {
    type: 'line',
  }
}
