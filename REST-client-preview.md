http://localhost:3000/api/v1/articles/1234

usage:
vscode 安装 REST client --> 新建文件 --> 输入要测试的 api --> ctrl+shift+p -->
--> 选择 REST Client: send request --> 会打开新的窗口显示请求内容

post 请求如下: 可以带参数

POST https://test.someapi.com/v1/account/user/login/
Content-Type: application/json

{ "email": "someemail@gmail.com", "password": 1 }
