import axios from 'axios';

const postData = async (grade,progress,qqNumber,userName,direction) => {
  if(grade === '准大一') grade = 0
  if(grade === '大一') grade = 1
  if(grade === '大二') grade = 2
  if(grade === '大三') grade = 3
  console.log(grade,progress,qqNumber,userName,direction);
  try {
    const response = await axios.post('http://6p9cux.natappfree.cc/api/register', {
      grade , 
      progress,
      qqNumber,  
      userName,
      direction,
    });
    console.log('成功:', response.data,);

  } catch (error) {
    console.error('请求失败:', error);
  }
};

export default postData
