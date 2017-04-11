/**
 * @file example/Detail.js
 *  xx详情
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import Info from '../../components/example/Info';

const mapStateToProps = state => ({
  detail: state.example.detail,
});

const mapDispatchToProps = {
  getDetail: query => ({
    type: 'example/getDetail',
    payload: query || {},
  }),
  save: query => ({
    type: 'example/save',
    payload: query || {},
  }),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {

  static propTypes = {
    getDetail: PropTypes.func.isRequired,
    detail: PropTypes.object,
    save: PropTypes.func.isRequired,
  }

  static defaultProps = {
    detail: {},
  }

  componentWillMount() {
    this.props.getDetail();
  }

  render() {
    const { detail, save } = this.props;
    return (
      <div className="page-example-detail">
        <Info
          data={detail}
          save={save}
        />
      </div>
    );
  }
}

