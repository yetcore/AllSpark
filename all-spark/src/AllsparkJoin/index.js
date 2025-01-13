import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography } from 'antd';


const { Title } = Typography

const AllsparkJoin = () => {

    const [form] = Form.useForm();
    const [grade, setGrade] = useState('大一');
    const [direction, setDirection] = useState('后端');

    const onFinish = (values) => {
    console.log('Form values:', values);
    };
    return (
        <div>
            <Title level={3} style={{ textAlign: 'center' }}>报名入口</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入您的姓名' }]}
              >
                <Input placeholder="请输入您的姓名" />
              </Form.Item>

              <Form.Item label="年级" name="grade">
                <Radio.Group value={grade} onChange={(e) => setGrade(e.target.value)}>
                  <Radio.Button value="大一">大一</Radio.Button>
                  <Radio.Button value="大二">大二</Radio.Button>
                  <Radio.Button value="大三">大三</Radio.Button>
                  <Radio.Button value="准大一">准大一</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="方向" name="direction">
                <Radio.Group value={direction} onChange={(e) => setDirection(e.target.value)}>
                  <Radio.Button value="后端">后端</Radio.Button>
                  <Radio.Button value="前端">前端</Radio.Button>
                  <Radio.Button value="产品经理">产品经理</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="学习进展" name="progress">
                <Input.TextArea placeholder="请用100字以内，描述你对编程的学习程度" rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  立即报名
                </Button>
              </Form.Item>
            </Form>
        </div>
    )
}

export default AllsparkJoin