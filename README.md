# 物与日新 · EverNews

费曼读书助手作者 Wilson / HachikoJ 的独立官网与产品目录，展示正在制作的产品、Agent Skills、开源工具与联系方式。

[English README](README.en.md) · [GitHub Issues](https://github.com/HachikoJ/evernews-website/issues)

官网：<https://www.deline.top/>

![品牌 Logo 动效](public/animations/evernews-logo-four-round-clockwise.gif)

备用动效：`public/animations/evernews-logo-single-round-backup.gif`

## 快速开始

需要 Node.js 20 或更高版本：

```bash
npm install
npm run dev
```

打开 <http://localhost:8081>。生产构建与启动：

```bash
npm run build
npm run start
```

## 项目结构

- `src/app/page.tsx`：官网入口与语言偏好
- `src/components/ProductPortal.tsx`：官网主要交互与内容
- `src/app/globals.css`：官网视觉样式与响应式布局
- `public/brand`、`public/portfolio`：品牌和作品图片资源
- `public/animations`：两套品牌 Logo 动效 GIF

官网中的“费曼读书助手”入口指向独立产品站 <https://reader.deline.top/>；官网与阅读器可以分别部署和维护。

## 产品入口

| 产品 | 地址 | 状态 |
| --- | --- | --- |
| 费曼读书助手 | <https://reader.deline.top/> | 已上线 |
| 匿证 | <https://anonyproof.deline.top/> | 公开预览 |
| 星仓印记 | <https://starvault.deline.top/> | 研发中 |
| 神笔宝宝 | <https://magic-draw-kids.deline.top/> | 研发中 |
| 听间 Tingjian | <https://audio.deline.top/> | 已上线 |

听间是小蓝主持的 AI 音乐电台，支持主题节目、点歌互动、收藏与收听历史。[项目源码](https://github.com/HachikoJ/easy-radio-host)。

各产品的域名、根路径、跳转与部署边界见 [`docs/product-integration.md`](docs/product-integration.md)。

## 域名与部署

- `https://deline.top` 通过 308 跳转到 `https://www.deline.top`。
- `https://www.deline.top` 是官网和产品目录；官网旧地址 `/reader/` 通过 308 跳转到 `https://reader.deline.top/`，并保留查询参数。
- `https://reader.deline.top` 是费曼读书助手，产品根路径直接进入工作区。

静态构建产物位于 `out/`。Nginx 主路由示例见 [`www.deline.top.conf`](www.deline.top.conf)，部署时将网站根目录指向 `/var/www/deline-website`，并在 HTTPS 虚拟主机中保留相同的跳转规则。

官网部署脚本是 [`deploy.sh`](deploy.sh)，默认使用 `/var/www/deline-website` 和 `/var/www/deline-website-deploy/releases/`，通过软链接原子切换并执行 `nginx -t`、`systemctl reload nginx`。首次接入腾讯云时，应先按契约完成 DNS、证书、80/443 监听者和现有 Nginx 配置的只读检查，再根据实际证书/WAF 架构安装配置；不要替换产品侧的 `reader.deline.top` 配置。

未来产品使用小写、短横线分隔的独立子域名，例如 `anonyproof.deline.top`、`starvault.deline.top`。产品卡片只负责跳转到对应子域名，产品项目自己负责该子域名下的根路径、旧路径和部署配置。

费曼读书助手使用浏览器本地 `localStorage` 和 IndexedDB。旧域名与新产品子域名是不同存储源；如果旧地址已经存在真实用户数据，应先暂时保留旧 `/reader/` 页面作为导出备份入口，再启用这里的 308 规则。新域名首次打开后需要在“设置 > 数据管理”导入备份，不能依赖浏览器自动迁移。

## 隐私与反馈

语言偏好仅保存在当前浏览器的 `localStorage`，官网不收集表单数据。问题反馈请提交到 [GitHub Issues](https://github.com/HachikoJ/evernews-website/issues) 或使用官网展示的邮箱。

## 许可证

本项目使用 MIT 许可证，见 [LICENSE](LICENSE)。

## 项目趋势

[![Star History](https://api.star-history.com/svg?repos=HachikoJ/evernews-website&type=Date)](https://star-history.com/#HachikoJ/evernews-website&Date)

[![Star Trend](https://starchart.cc/HachikoJ/evernews-website.svg)](https://github.com/HachikoJ/evernews-website)
