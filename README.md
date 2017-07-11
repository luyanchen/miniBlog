# minBlog
<h1>前言</h1>
本项目是<a href="https://github.com/luyanchen/nej-regular-app">nej-regular-app</a>的优化版，主要优化一下几方面：

<ul>
<li>重写部分模块，并添加至公共组件库 /src/js/widget/（form,search,scroll.login.register等）</li>
<li>优化MCSS，根据功能划分文件 /src/mcss/</li>
<li>首页列表改为NEJ waterfall，并优化cache</li>
<li>数据请求统一放在/src/js/cache/中</li>
</ul>
<h1>项目结构</h1>
<p>前端：NEJ+Regular+MCSS</p>
<p>后端：nodejs+express+mongodb</p>

<p>安装：npm install</p>
<p>启动服务：</p>
<p>npm run mongod</p>
<p>npm run start</p>
<p>npm run mcss</p>
<p>登录：http://127.0.0.1:3000/login/</p>
<p>首页：http://127.0.0.1:3000/index/</p>

