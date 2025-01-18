import React, { useEffect, useState } from 'react';
import { Tabs, Card } from 'antd';
import styles from './Common.module.scss'
import axios from 'axios';

const AllsparkHow = () => {
  const [dataImg, setDataImg] = useState(null)
  const [dataStr, setDataStr] = useState(null)
  const [imgLoading, setimgLoading] = useState(true)
  const [strLoading, setstrLoading] = useState(true)

  useEffect(() => {
    const ajax = async() => {
      try {
        const response1 = await axios.get('http://dx98hf.natappfree.cc/api/json/join.json',{
          params: {
              data: 'join.json'  
            }
      })

      if (response1 && response1.data) {
        setDataStr(JSON.parse(response1.data.data)); // 设置字符串数据
        setstrLoading(false)
      } else {
        console.error('响应1无效：', response1);
      }
        
  
  
      const response2 = await axios.get('http://dx98hf.natappfree.cc/api/img/join.png',{
        params: {
            data: 'join.png'  
          }
    })

      if (response2 && response2.data) {
        setDataImg(response2.data.data); // 设置图片数据
        setimgLoading(false)
      } else {
        console.error('响应2无效：', response2);
      } 
    }
      catch(error){
        console.error('获取数据时发生错误：', error);
      }
     
       
    } 
    ajax()

   }, []);

  
  const CustomTabBar = (props) => {
    const { DefaultTabBar } = props; // 解构出 DefaultTabBar
    return (
      <div className={styles['tab-head']}>
        <DefaultTabBar {...props} />
      </div>
    );
  };
  const tabItems = [
    {
      label: "秋季纳新",
      key: '1',
      children: (
        <Card className={styles.content}>
          <div className={styles.card}>
              <img 
                 src={!imgLoading && dataImg}
                alt="秋季纳新" 
                className={styles.img}
              />
              <div className={styles.incontent}>
                <p className={styles.p}> <img src='/time.png' className={styles['small-img']}/> <span className={styles.solid}>时间：</span>{ !strLoading && dataStr.autumn.time }</p>
                <p className={styles.p}> <img src='/require.png' className={styles['small-img']}/> <span className={styles.solid}>要求：</span>{ !strLoading && dataStr.autumn.requirement }</p>
                <p className={styles.p}> <img src='/process.png' className={styles['small-img']}/> <span className={styles.solid}>流程：</span>{ !strLoading && dataStr.autumn.flow }</p>
              </div>
          </div>
        </Card>
      )
    },
    
    {
      label: '春季纳新',
      key: '2',
      children: (
        <Card className={styles.content}>
          <div className={styles.card}>
              <img 
                src="/1.2.jpg" 
                alt="春季纳新" 
                className={styles.img}
              />
              <div className={styles.incontent}>
                <p className={styles.p}> <img src='/time.png' className={styles['small-img']}/> <span className={styles.solid}>时间：</span>{ !strLoading && dataStr.spring.time }</p>
                <p className={styles.p}> <img src='/require.png' className={styles['small-img']}/> <span className={styles.solid}>要求：</span>{ !strLoading && dataStr.spring.requirement }</p>
                <p className={styles.p}> <img src='/process.png' className={styles['small-img']}/> <span className={styles.solid}>流程：</span>{ !strLoading && dataStr.spring.flow }</p>
              </div>
          </div>
        </Card>
      )
    },
    {
      label: '日常霸面',
      key: '3',
      children: (
        <Card className={styles.content}>
          <div className={styles.card}>
              <img 
                src="/1.2.jpg" 
                alt="日常霸面" 
                className={styles.img}
              />
              <div className={styles.incontent}>
                <p className={styles.p}> <img src='/time.png' className={styles['small-img']}/> <span className={styles.solid}>时间：</span>{ !strLoading && dataStr.challenge.time }</p>
                <p className={styles.p}> <img src='/require.png' className={styles['small-img']}/> <span className={styles.solid}>要求：</span>{ !strLoading && dataStr.challenge.requirement }</p>
                <p className={styles.p}> <img src='/process.png' className={styles['small-img']}/> <span className={styles.solid}>流程：</span>{ !strLoading && dataStr.challenge.flow }</p>
              </div>
          </div>
        </Card>
      )
    },
  ];
  
  if(!dataStr) return <div>jiazai</div>

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>如何加入我们</h2>
    <Tabs 
    defaultActiveKey="1" items={tabItems}  
    className={styles.tab} 
    centered  
    tabBarGutter
    size='large'
    renderTabBar={(props, DefaultTabBar) => (
          <CustomTabBar {...props} DefaultTabBar={DefaultTabBar} />
        )}/>
    </div>
  );
};

export default AllsparkHow;
