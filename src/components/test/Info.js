/**
 * @file test/List.js
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes, PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { autobind } from 'core-decorators';

const FormItem = Form.Item;

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@Form.create()
export default class TestDetail extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    save: PropTypes.func,
  }

  static defaultProps = {
    save: () => {},
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();

    const { form, save } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // 保存数据
      save(fieldsValue);
    });
  }

  render() {
    const { data, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="姓名"
        >
          {getFieldDecorator(
            'name',
            {
              initialValue: data.name,
              rules: [
                {
                  required: true, message: '姓名不能为空',
                },
              ],
            },
          )(
            <Input />,
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="钱"
        >
          {getFieldDecorator(
            'money',
            {
              initialValue: data.money,
              rules: [
                {
                  required: true, message: '钱不能为空',
                },
              ],
            },
          )(
            <Input />,
          )}
        </FormItem>

        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}
