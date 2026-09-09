# 产品接入交接契约

把下面内容交给对应产品项目即可完成官网侧对接。

## 固定地址

| 产品 | 子域名 | 官网入口 |
| --- | --- | --- |
| 费曼读书助手 | `reader.deline.top` | `https://reader.deline.top/` |
| 匿证 | `anonyproof.deline.top` | `https://anonyproof.deline.top/` |
| 星仓印记 | `starvault.deline.top` | `https://starvault.deline.top/` |
| 神笔宝宝 | `magic-draw-kids.deline.top` | `https://magic-draw-kids.deline.top/` |
| 听间 Tingjian | `audio.deline.top` | `https://audio.deline.top/` |

听间项目仓库：<https://github.com/HachikoJ/easy-radio-host>。官网展示图 `public/portfolio/tingjian-latest.png` 来自用户提供的真实产品截图。

## 产品侧必须满足

- 子域名根路径 `/` 直接进入产品主界面。
- 产品内“官网”按钮使用绝对地址 `https://www.deline.top/`。
- 产品自身的 `metadataBase`、canonical、Open Graph、manifest 和分享链接统一使用自己的子域名。
- 若存在旧的站内产品路径，使用 HTTP 308 跳转到新子域名根路径，并保留 query 参数；费曼旧路径为 `/reader/`。
- 不设置 `.deline.top` 域级 Cookie；产品数据保持本域隔离。
- 各产品独立维护 DNS、证书、Nginx、部署目录、健康检查和缓存，不修改其他产品配置。

## 数据迁移

跨域后的 `localStorage`、IndexedDB 和 Cookie 不会自动迁移。已有真实用户数据时，旧地址必须先提供导出备份页；新地址首次打开提供导入入口。没有真实用户数据时可直接启用 308。

官网只负责目录入口，不承载产品运行时数据和 API。
