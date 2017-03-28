/**
 * @file components/chart/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import Chart from './Chart';
import Series from './Series';
import ChartLine from './Line';
import ChartPie from './Pie';
import ChartBar from './Bar';

Chart.Series = Series;
Chart.Line = ChartLine;
Chart.Pie = ChartPie;
Chart.Bar = ChartBar;

export default Chart;
