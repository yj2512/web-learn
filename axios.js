<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

get 请求：
//发起一个user请求，参数为给定的ID
axios.get('/user?ID=1234')
.then(function(respone){
    console.log(response);
})
.catch(function(error){
    console.log(error);
});

//上面的请求也可选择下面的方式来写
axios.get('/user',{
    params:{
        ID:12345
    }
})
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error)
    });


post 请求：
axios.post('/user',{
    firstName:'friend',
    lastName:'Flintstone'
})
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
});

axios API 
axios(config):
//发起 GET请求
axios({
	url: 'http://jsonplaceholder.typicode.com/users',
		method: 'get',
		responseType: 'json', // 默认的
		data: {
		  //'a': 1,
		   //'b': 2,
		}
	}).then(function (response) {
	    console.log(response);
	   console.log(response.data);
	}).catch(function (error) {
		console.log(error);
})
//发起 POST请求
axios({
	url: 'http://jsonplaceholder.typicode.com/users',
		method: 'POST',
		responseType: 'json', // 默认的
		data: {
		  //'a': 1,
		   //'b': 2,
		}
	}).then(function (response) {
	    console.log(response);
	   console.log(response.data);
	}).catch(function (error) {
		console.log(error);
})

多重并发请求：
function getUserAccount(){
    return axios.get('/user/12345');
}

function getUserPermissions(){
    return axios.get('/user/12345/permissions');
}

axios.all([getUerAccount(),getUserPermissions()])
    .then(axios.spread(function(acc,pers){
        //两个请求现在都完成
    })).catch(function (error) {
	//其一失败
		console.log(error);
});





全局默认设置 Global axios defaults:
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';


//POST请求，，formData格式传数据
axios({
	url: '/api/setting/Department_data/add_department',
	method: 'POST',
	responseType: 'json', // 默认的
	// headers: { 'content-type': 'application/json' },
	headers:{'Content-type': 'application/x-www-form-urlencoded'},
	data: {
	   dept_id: dept_id,
	   dept_name: dept_name,
	   remark: remark
	},
	transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
	}).then(function (response) {
		console.log(response);
	})
