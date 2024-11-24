# 部署 Swanlab-Core-App 到开发环境

借助 github action，可以将持续集成并入当前工作流，整个自动部署过程分为三部分。

## 一、服务镜像

### 1.1 Next 构建与服务

首先，需要明确的是，next 项目与传统前端项目的部署方式存在显著差异。传统前端项目在打包成 HTML 等资源文件后，只需将其放置
于 nginx 的配置目录中，后续的更新操作也仅限于替换这些资源文件。

然而，next 作为一个全栈框架，在打包完成后会生成服务控件，这意味着它并不依赖于 nginx 等服务器软件。因此我们不能像传统前端
项目那样，通过简单地替换资源文件来实现更新。在打包完成后，我们需要重新运行整个服务。

我们采用[standalone](https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files) 模式进行打包（默认输出目录为 `.next`）和部署（node 启动 server.js）。
该模式仅复制生产部署所需的文件，包括node_modules中的选择文件。部署前需要注意两个地方（文档中有说明，与 CDN 有关）：

- `public` 需要手动复制到 `standalone/public`
- `.next/static` 需要手动复制到 `standalone/.next/static`

### 1.2 Docker镜像

镜像文件存放于根目录下 `Dockerfile.dev`，其功能十分简单：使用 `node` 启动 `/app` 下的 `server.js`。
镜像并未包含打包等操作，而是需要通过挂载的方式，将打包后的内容同步到 `/app`，从而实现重启后动态更新服务内容。

## 二、Github Action

action 负责在 main 分支更新后，构建新的程序并添加到服务器上。构建结果即上一步中需要挂载到 `/app` 中的内容。

主要步骤：

- 拉取代码
- 安装依赖
- 构建项目
- 移动必要内容（public、static）到 `standalone`
- 连接服务器，推送压缩包（standalone.tar.gz）
- 解压压缩包，重启 docker compose 中的 swanlab-core-app 服务

其中，docker compose 由 SwanLab-IaC 管理。

## 三、SwanLab-IaC

通过 docker-compose.yml 定义 core-app 的服务内容，综合上面两部分，主要包含：

- 使用第一部分中构建的服务镜像
- 挂载第二部分中 action 推送的内容到容器
- 定义网关路由分发规则和网络

服务定义前，需要完成服务镜像的构建并保证服务器上存在服务镜像。

之后每次 action 执行到最后都会重启这个服务，重启时会重新挂载目录，这个时候容器就可以同步到最新的程序。

test content

![image-20241124134259590](C:\Users\SIMON TANG\AppData\Roaming\Typora\typora-user-images\image-20241124134259590.png)
