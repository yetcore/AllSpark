import axios from 'axios';

const getStringHow = async() => {
        const response = await axios.get('http://dx98hf.natappfree.cc/api/json/join.json',{
            params: {
                data: 'join.json'  
              }
        }).then(response => {
            console.log('成功:', response.data);
          })
          .catch(error => {
            console.error('请求失败:', error);
          });
          return response
    }


const getImageHow = async() => {
    const response = await axios.get('http://dx98hf.natappfree.cc/api/img/join.png',{
        params: {
            data: 'join.png'  
          }
    }).then(response => {
        console.log('成功:', response.data);
      })
      .catch(error => {
        console.error('请求失败:', error);
      });
      
      return response
}

export { getStringHow, getImageHow}