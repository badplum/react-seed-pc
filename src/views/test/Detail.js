/**
 * @file test/Detail.js
 *  xx详情
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import Info from '../../components/test/Info';

const mapStateToProps = state => ({
  detail: state.test.detail,
});

const mapDispatchToProps = {
  getDetail: query => ({
    type: 'test/getDetail',
    payload: query || {},
  }),
  save: query => ({
    type: 'test/save',
    payload: query || {},
  }),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    getDetail: PropTypes.func.isRequired,
    detail: PropTypes.object,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: 'xx详情',
    detail: {},
  }

  componentWillMount() {
    this.props.getDetail();
  }

  render() {
    const { detail, save } = this.props;
    return (
      <div className="page-test-detail">
        <Info
          data={detail}
          save={save}
        />
      </div>
    );
  }
}

