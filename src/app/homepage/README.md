# HomePage 主页

用于展示用户/组织的个人信息，项目列表，动态等，/homepage路由不对外暴露，在[中间件](../../middleware.ts)中完成重写，实际映射路由为/@:username。

> 详见issue：https://github.com/SwanHubX/SwanLab-Core-App/issues/6