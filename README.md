# TGU 官网 / TGU Website

途捷餐饮官方网站，基于 Next.js App Router 构建，支持中英文双语切换。

## 技术栈

| 用途 | 依赖 |
| --- | --- |
| 框架 | Next.js 16（App Router） |
| UI | React 19 + Tailwind CSS v4 |
| 动效 | framer-motion |
| 图标 | lucide-react |

## 本地开发

```bash
npm install
npm run dev
```

打开 http://localhost:3000 查看。

在同一局域网的手机上调试时，用电脑的内网 IP 访问（例如 `http://192.168.31.195:3000`），
并把该 IP 加入 `next.config.ts` 的 `allowedDevOrigins`。

## 构建与启动

```bash
npm run build
npm run start
```

## 目录结构

```
app/          页面路由（首页、关于我们、公司业务、合作案例、荣誉、新闻、联系、招聘）
components/   Navbar、Footer、品牌跑马灯、案例卡片等公共组件
contexts/     LanguageContext，中英文切换与 localStorage 持久化
data/         品牌与合作案例的结构化数据
messages/     zh.json / en.json 全站文案
lib/img.ts    图片地址助手，按环境变量决定走 OSS 还是本地 public
public/       静态资源（图片不纳入 Git，见下）
```

## 图片资源

图片存放在 `public/images/`，随仓库一起部署，由站点同源提供（`/images/...`）。

`lib/img.ts` 默认使用这些相对路径。若设置了 `NEXT_PUBLIC_OSS_BASE_URL`，则会改走阿里云 OSS。

线上若要使用仓库内图片而不是 OSS，请在 Vercel 环境变量中删除 `NEXT_PUBLIC_OSS_BASE_URL`。

## 文案维护

全站文案集中在 `messages/zh.json` 与 `messages/en.json`，两份文件的键结构必须保持一致，
否则切换语言时会取到 `undefined`。新增文案时两边同时补齐。
