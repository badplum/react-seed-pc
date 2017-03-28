/**
 * @file components/chart/Chart.js
 *  chart主容器，所有chart图标均通过该组件渲染
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent, cloneElement } from 'react';
// 按需引入组件, 保证代码最小
import echarts from 'echarts/lib/echarts';
import _ from 'lodash';
// import elementResizeEvent from 'element-resize-event';

export default class Charts extends PureComponent {
  /* eslint-disable */
  static propTypes = {
    options: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    backgroundColor: PropTypes.string,
    animation: PropTypes.bool,
    calculable: PropTypes.bool,
    renderAsImage: PropTypes.bool,
    style: PropTypes.object,
    theme: PropTypes.object,
    timeline: PropTypes.object,
    title: PropTypes.object,
    toolbox: PropTypes.object,
    tooltip: PropTypes.object,
    legend: PropTypes.object,
    dataRange: PropTypes.object,
    dataZoom: PropTypes.object,
    roamController: PropTypes.object,
    grid: PropTypes.object,
    color: PropTypes.array,
    children: PropTypes.node,
    xAxis: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    yAxis: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    onReady: PropTypes.func,
  };
  /* eslint-enable */

  static defaultProps = {
    height: 400,
    width: 300,
  };

  componentDidMount() {
    const { onReady } = this.props;
    this.drawChart();
    if (onReady) {
      onReady(this.chart);
    }
  }

  componentDidUpdate(prevProps) {
    const { onReady } = this.props;

    if (this.props.options) {
      if (prevProps.options !== this.props.options) {
        this.drawChart();
        if (onReady) {
          onReady(this.chart);
        }
      }
    } else {
      const prevPropsArray = React.Children.map(prevProps.children, preChild => preChild.props);
      const propsArray = React.Children.map(this.props.children, child => child.props);
      propsArray.forEach((props, index) => {
        if (props !== prevPropsArray[index]) {
          this.drawChart();
          if (onReady) {
            onReady(this.chart);
          }
        }
      });
    }
  }

  componentWillUnmount() {
    this.chart.dispose();
  }

  getChartData(options) {
    const series = [];
    React.Children.map(this.props.children, (child) => {
      series.push({ ...child.props });
    });
    return { ...options, series };
  }

  drawChart() {
    let options;
    if (this.props.options) {
      options = this.props.options;
    } else {
      options = _.pick(this.props, [
        'backgroundColor',
        'animation',
        'calculable',
        'renderAsImage',
        'timeline',
        'title',
        'toolbox',
        'tooltip',
        'legend',
        'dataRange',
        'dataZoom',
        'roamController',
        'grid',
        'color',
        'xAxis',
        'yAxis',
        'series',
      ]);
      options = this.getChartData(options);
    }

    const node = this.chartInstance;
    const chart = echarts.getInstanceByDom(node);
    if (!chart) {
      this.chart = echarts.init(node);
    }
    this.chart.setOption(options, this.props.theme);
  }

  renderChildren() {
    return React.Children.map(
      this.props.children,
      child => cloneElement(child, { hasChart: true }),
    );
  }

  render() {
    const { width, height, style } = this.props;
    return (
      <div
        ref={ref => (this.chartInstance = ref)}
        style={{
          height,
          width,
          ...style,
        }}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
