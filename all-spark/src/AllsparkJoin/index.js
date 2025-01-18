import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography, Space } from 'antd';
import styles from './Common.module.scss'
import postData from '../hooks/join';

const { Title, Paragraph } = Typography

const AllsparkJoin = () => {

    const [form] = Form.useForm();
    const [grade, setGrade] = useState('大一');
    const [direction, setDirection] = useState('后端');
    const [progress, setProgress] = useState('');
    const [number, setNumber] = useState(0)
    const [nickname, setNickname] = useState('')
    const onFinish = (values) => {
    
    };

    const handleInputChange = (e) => {
      let value = e.target.value;
      if (value.length > 100) {
      value = value.slice(0, 100); // 限制输入最多100字符
    }
    setProgress(value);
  };
    
  const handleupdata = () => {
    postData(grade,progress,number,nickname,direction);
    
  }
    return (
        <div className={styles.wrapper}>
            <Title level={3} style={{ textAlign: 'center' }} className={styles['join-entra']}>报名入口</Title>
            <div className={styles.content}>
                <Form
                  form={form}
                  layout="vertical" 
                  onFinish={onFinish}
                  className={styles['form-content']}
                  
                >
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入您的姓名' },{min: 2, max: 15, message: '请输入正确格式的姓名'}]}
                  className = {styles.name}
                >
                  <Input placeholder="请输入您的姓名" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </Form.Item>

                <Form.Item
                  label="手机号/QQ号"
                  name="number"
                  rules={[{ required: true, message: '请输入您的手机号/QQ号' }, {pattern: /^\d{1,15}$/, message: '请输入最多15位的纯数字'},]}
                >
                  <Input placeholder="请输入您的手机号/QQ号" value={number} onChange={(e) => setNumber(e.target.value)}/>
                </Form.Item>

                <Form.Item label="年级" name="grade" initialValue='大一'>
                  <Radio.Group value={grade} onChange={(e) => setGrade(e.target.value)}>
                    <Space>
                      <Radio.Button value="大一">大一</Radio.Button>
                      <Radio.Button value="大二">大二</Radio.Button>
                      <Radio.Button value="大三">大三</Radio.Button>
                      <Radio.Button value="准大一">准大一</Radio.Button>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="方向" name="direction" initialValue='后端'>
                  <Radio.Group value={direction} onChange={(e) => setDirection(e.target.value)}>
                    <Space>
                      <Radio.Button value="后端">后端</Radio.Button>
                      <Radio.Button value="前端">前端</Radio.Button>
                      <Radio.Button value="产品经理">产品经理</Radio.Button>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                {grade === '大一' && direction === '前端' &&<Paragraph>要求：<br />掌握任何一门编程语言基础（如C、Python），具备简单算法能力（如排序）</Paragraph>}
                {grade === '大一' && direction === '后端' &&<Paragraph>要求：<br />掌握任何一门编程语言基础（如C、Python），具备简单算法能力（如排序）</Paragraph>}
                {grade === '大一' && direction === '产品经理' && <Paragraph>要求：<br />了解产品经理工作内容及就业前景，并对自己发展有一定规划</Paragraph>}
                {grade === '大二' && direction === '前端' &&<Paragraph>要求：<br />了解JS等编程知识，对VUE、REACT等框架有一定认知；熟悉算法与数据结构</Paragraph>}
                {grade === '大二' && direction === '后端' &&<Paragraph>要求：<br />了解JAVASE、EE等知识，对Spring boot等框架有一定认知；熟悉算法与数据结构</Paragraph>}
                {grade === '大二' && direction === '产品经理' &&<Paragraph>要求：<br />实习产品经理工作内容及项目实现流程，有一定的申美及项目经验</Paragraph>}
                {grade === '大三' && <Paragraph>要求：<br />有项目开发能力，或有互联网公司实习经验</Paragraph>}
                {grade === '准大一' && <Paragraph>要求：<br />已拿到西邮录取通知书且在9月报名之前，有学习编程知识的意向</Paragraph>}
                
                <Form.Item label="学习进展" name="progress"  help={`${progress.length}/100`}>
                  <Input.TextArea placeholder="请用100字以内，描述你对编程的学习程度" 
                  rows={4}  
                  onChange={handleInputChange}
                  value={progress}
                  maxLength={100}/>
                </Form.Item>
                

                <Form.Item>
                  <Button type="primary" htmlType="submit" block onClick={handleupdata}>
                    立即报名
                  </Button>
                </Form.Item>
              </Form>
            </div>
        </div>
    )}


export default AllsparkJoin

  