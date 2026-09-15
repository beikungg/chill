# Chili Career GmbH — 官网设计稿 v1.0

> 依据：`docs/raw_design.md`（业务需求）+ 五个参考站点实测抓取
> 目标：2026 年 5 月前上线三语（EN / DE / ZH）基础站点
> 技术栈：Next.js 16 App Router · Tailwind v4 · next-intl · shadcn/ui · content-collections

---

## 0. 竞品实测结论（设计决策的依据）

五个参考站点全部用 `curl` 实测抓取（`WebFetch` 对这些域名全部拒绝，见项目记忆）。

| 站点 | 主色 | 字体 | 结构特征 | 对我们的意义 |
|---|---|---|---|---|
| Hays.de | `#002776` 海军蓝 | 定制 Saans Hays | 求职者优先，H1「Jetzt Top Jobs finden」，86 项导航 | 反面教材：典型招聘门户，信息过载 |
| MichaelPage.de | `#124395` 蓝 + `#f7a600` 黄 | — | H1「Personalberatung für Ihren Personalbedarf」，77% 客户满意度数字 | 德语咨询文案的最佳范本 |
| Manatal.com | `#1976d2` 蓝 | — | SaaS 产品营销结构 | 仅参考布局机械，定位不符 |
| AIMS International | `#dc603c` 陶土红 / `#c85736` | — | 12 语言，Hero「Leadership for **Future Impact**」 | 定位最接近，配色思路可借鉴 |
| mariafischerundteam.de | — | — | 导航仅 4 项 + 页脚仅 Impressum/Datenschutz | 精品所的克制范本 + DSGVO 模板 |

**关键发现一：整个竞品集合都是蓝色。** Hays 蓝、Michael Page 蓝、Manatal 蓝。而定位最接近的 AIMS 用的是低饱和陶土红。

→ **决策：黑 + 白 + 辣椒红（chili red）。** 既在品类中形成即时区隔，又与公司名 "Chili" 同源。需求文档里的「黑/白/红/Silver」方向本身是对的，本设计稿把它精确化。

**关键发现二：AIMS 的 `/de` 与 `/zh` 实际仍返回 `locale: en` 的英文内容。** 多语言只做了路由、没做内容。这是我们必须避免的陷阱——三语必须是真三语。

**关键发现三：mariafischerundteam 的克制值得学习。** 4 项导航、2 个页脚链接。对精品咨询公司，少即是贵。我们的 6 项导航已是上限，不再增加。

---

## 1. 设计策略

### 1.1 一句话定位
一家总部在杜塞尔多夫的精品 Executive Search 公司，为中国企业打开欧洲人才市场。

### 1.2 视觉主张：Precision, not Volume
需求里「We don't search. We target.」是整个设计的轴心。
- **Search** = 大海捞针、职位列表、翻页、数量 → 竞品在做的事
- **Target** = 坐标、瞄准、精确、单点命中 → 我们的视觉语言

因此全站的结构性符号是**准星 / 坐标（reticle）**，而非图标堆砌。它以三种形式出现，仅此三种：
1. 章节序号前的十字准星标记（8×8px 十字，chili 红）
2. Hero 中一次性的、克制的准星定位动效
3. 数据/坐标类信息使用等宽字体（经纬度、日期、编号）

### 1.3 需求中的「避免清单」如何落到设计约束

需求文档列了 6 条禁忌。逐条转成可验收的硬约束：

| 需求禁忌 | 设计约束（可验收） |
|---|---|
| 传统猎头网站模板 | 无职位搜索框、无职位列表、无「上传简历」入口。导航 ≤ 6 项 |
| 大量招聘类 Stock Photos | 全站摄影 ≤ 4 张，且仅限：城市/建筑肌理、活动实拍。人物照仅出现在真实活动照片中 |
| 握手/面试/开会图片 | 明令禁止此三类素材，代码评审时直接拒收 |
| 过多图标 | 全站图标总数 ≤ 8。服务模块**不使用**图标，用编号 + 排版层级区分 |
| 页面信息过于拥挤 | 章节垂直间距 ≥ 120px（桌面）；正文行宽 ≤ 68 字符；单屏信息块 ≤ 3 |
| 过度使用中国元素 | 无红灯笼、无书法体、无水墨。"China × Europe" 仅通过**排版对照**和**经纬度坐标**表达 |

---

## 2. 设计令牌（Design Tokens）

### 2.1 色彩

调色板 6 个命名色值，全部实测过 WCAG 对比度。

| 名称 | HEX | OKLCH | 用途 |
|---|---|---|---|
| `ink` | `#0C0D0F` | `oklch(0.1588 0.0045 264.44)` | 主文字、深色区底色 |
| `paper` | `#F6F6F7` | `oklch(0.9734 0.0013 286.38)` | 浅色区底色（非纯白，带极轻冷偏） |
| `chili` | `#C7202F` | `oklch(0.5359 0.1990 23.58)` | 唯一强调色，CTA、准星、单词高亮 |
| `graphite` | `#4E535A` | `oklch(0.4403 0.0132 256.75)` | 浅底次级文字 |
| `silver` | `#8E9299` | `oklch(0.6589 0.0113 261.78)` | **仅深色底**次级文字、大号装饰字 |
| `steel` | `#E2E3E6` | `oklch(0.9159 0.0042 271.37)` | 浅底分隔线、边框 |

深色模式补充：`dk-surface #15171A`、`dk-text #F1F2F3`、`dk-line #24272B`、`chili-on-dark #E8404F`。

**对比度实测结果：**

```
ink on paper              18.00:1  AA ✓
graphite on paper          7.18:1  AA ✓
chili on paper             5.29:1  AA ✓   ← 红色正文可用
white on chili (按钮)      5.71:1  AA ✓
silver on paper            2.89:1  ✗ 不合格
dk-text on ink            17.35:1  AA ✓
silver on ink              6.22:1  AA ✓
chili-on-dark on ink       4.89:1  AA ✓
chili-on-dark on dk-surf   4.51:1  AA ✓
```

> ⚠️ **实现必读**：`silver #8E9299` 在浅色底上只有 2.89:1，**不合格**。浅色底的次级文字必须用 `graphite #4E535A`。silver 仅用于深色底文字，或浅色底上 ≥ 48px 的纯装饰性大字。
> ⚠️ 深色底不要直接用 `chili #C7202F`（在 `#0C0D0F` 上仅 3.6:1），必须切到 `chili-on-dark #E8404F`。

**红色用量纪律：** chili 红覆盖面积 **≤ 5%** 视口。允许出现的位置仅限：主 CTA 按钮、每个标题中最多一个单词、准星标记、hover 下划线、活动日期。红色一旦铺开，精品感立刻变成打折促销感。

### 2.2 字体

三语混排是真实约束：拉丁字母 + 德语变音（ä ö ü ß）+ 中文汉字。

| 角色 | 字体 | 理由 |
|---|---|---|
| 展示 / 标题 | **Archivo** (400/500/600/700) | Grotesque，字腔紧、末端切割干净，带工程测量感而非人文感。变音字符完整，避免了 Inter / Space Grotesk 这类"安全默认"观感 |
| 正文 | **Source Sans 3** (400/600) | 与 Archivo 同为无衬线但骨架更开，长段落德语（复合长词）可读性好 |
| 中文 | **Noto Sans SC** (400/500/700) | 与 Archivo 灰度接近，仅在 `:lang(zh)` 下接管 |
| 数据 / 标签 | **IBM Plex Mono** (400/500) | 坐标、日期、编号、章节号。强化"精确瞄准"语义 |

字体加载（`src/assets/fonts/index.ts`，替换现有 Noto Sans / Bricolage）：

```ts
import { Archivo, Source_Sans_3, Noto_Sans_SC, IBM_Plex_Mono } from 'next/font/google';

export const fontDisplay = Archivo({
  subsets: ['latin', 'latin-ext'],   // latin-ext 覆盖德语变音
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

export const fontBody = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '600'],
});

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const fontCJK = Noto_Sans_SC({
  subsets: ['latin'],   // 中文字形按需子集化
  display: 'swap',
  variable: '--font-cjk',
  weight: ['400', '500', '700'],
});
```

**字号阶梯**（1.25 比例，桌面 / 移动）：

| 用途 | 桌面 | 移动 | 字重 | 字距 |
|---|---|---|---|---|
| Hero 大标题 | 76px / 1.02 | 40px / 1.06 | 600 | −0.03em |
| 章节标题 (h2) | 44px / 1.1 | 30px / 1.15 | 600 | −0.02em |
| 卡片标题 (h3) | 24px / 1.25 | 20px | 600 | −0.01em |
| 正文 | 17px / 1.65 | 16px / 1.6 | 400 | 0 |
| 次级正文 | 15px / 1.6 | 15px | 400 | 0 |
| 标签 / eyebrow | 12px | 12px | 500 | **+0.14em**，全大写，mono |

中文排版覆盖：`:lang(zh)` 下标题字距归零（`letter-spacing: 0`），行高 +0.08，字重降一级（中文 600 视觉过重，用 500）。

### 2.3 版式与间距

- **栅格**：12 列，最大内容宽 `1280px`，页面左右留白 `24px`(移动) / `48px`(平板) / `80px`(桌面)
- **章节垂直节奏**：`120px`(桌面) / `80px`(移动)，深浅交替区块自带 `padding-block`
- **圆角**：`--radius: 2px`。近乎直角是刻意选择——精品咨询的严谨感来自锐利边缘，`rounded-lg` 会让它变成 SaaS 落地页
- **描边优先于阴影**：卡片用 `1px solid steel`，不用 box-shadow。全站仅浮动导航栏允许一层极轻阴影
- **行宽**：正文 `max-width: 68ch`

### 2.4 动效

克制到极致。总共只有四处：

1. **Hero 准星定位**（仅首屏、仅一次）：页面载入后 `Chili Career` 标题下方一条 1px 红线从 0 → 100% 宽度展开（`600ms cubic-bezier(0.16,1,0.3,1)`），同时准星标记从 `scale(1.4)` 收到 `scale(1)`。这是"瞄准并锁定"的视觉隐喻，也是全站唯一一次编排动效。
2. **章节进入**：`opacity 0→1` + `translateY(12px→0)`，`500ms`，`IntersectionObserver` 触发一次即断开。位移必须小，大位移是 AI 感的来源。
3. **链接 hover**：下划线从左展开，`180ms`。
4. **按钮 hover**：底色 `chili` → `#A81A27`（暗 12%），`150ms`。

全部包在 `@media (prefers-reduced-motion: reduce)` 中降级为无动画。

---

## 3. 信息架构

### 3.1 导航（6 项，需求确定，不增不减）

| 中文 | English | Deutsch | 路由 |
|---|---|---|---|
| 首页 | Home | Startseite | `/` |
| 服务 | Services | Leistungen | `/services` |
| 用户反馈 | Client Testimonials | Kundenstimmen | `/testimonials` |
| 合作机构 | Partners | Partner | `/partners` |
| 近期活动 | Events | Veranstaltungen | `/events` |
| 联系我们 | Contact | Kontakt | `/contact` |

导航栏右侧：语言切换（`EN / DE / 中文` 文字形式，**不用国旗** —— 国旗代表国家不代表语言，德语区含奥地利瑞士）+ 主 CTA 按钮。

`Services` 下拉三项：Recruitment / Executive Search / HR Consulting，锚点到 `/services#recruitment` 等。

### 3.2 完整路由表

```
/                        首页
/services                服务总览（三个服务锚点区块）
/testimonials            客户反馈
/partners                合作机构
/events                  近期活动
/contact                 联系我们（含表单）
/impressum               公司注册信息（德国 §5 DDG 强制）
/datenschutz             数据保护声明（DSGVO 强制）
```

三语路由前缀策略沿用仓库现有 `localePrefix: 'as-needed'`：
`/services`（EN，默认）· `/de/leistungen`… 实现上保持路径不翻译（`/de/services`），降低首版复杂度与 SEO 风险。

### 3.3 页脚

三列 + 底栏，参考 mariafischerundteam 的克制程度：

```
Chili Career GmbH          Leistungen              Rechtliches
[logo]                     Recruitment             Impressum
Düsseldorf, Germany        Executive Search        Datenschutz
51.2277° N, 6.7735° E      HR Consulting
(mono 字体坐标)
LinkedIn
─────────────────────────────────────────────────────────────
© 2026 Chili Career GmbH        We don't search. We target.
```

> **Impressum 与 Datenschutz 是德国法律强制项**，不是可选装饰。缺失 Impressum 在德国可被竞争对手发律师函（Abmahnung）并索赔费用。两者必须在**每一页**页脚可达。

---

## 4. 首页详细设计（7 个区块，对应需求 01–07）

深浅区块交替，形成节奏：`深 → 浅 → 浅 → 深 → 浅 → 浅 → 深`

### 01 Hero —— 深色 `ink` 底

```
┌────────────────────────────────────────────────────────────┐
│ [logo] 首页 服务 反馈 合作 活动 联系      EN·DE·中文  [CTA]  │  ← 导航，1px 底边 dk-line
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ✛ DÜSSELDORF · 51.2277° N, 6.7735° E      ← mono 12px    │
│                                                            │
│  Chili Career                               ← 76px, 600    │
│  ────────────────────                       ← 1px 红线动效  │
│                                                            │
│  European Talent.                           ← 44px silver  │
│  Strategic Hiring.                                         │
│                                                            │
│  We don't search. We target.                ← 24px, chili  │
│                                              红仅此一处     │
│                                                            │
│  [ Start a Conversation → ]                 ← 实心 chili    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

- 高度：`min-height: 82vh`（不是 100vh —— 留出下一区块的视觉提示，暗示继续滚动）
- 背景：`ink` 纯色 + 极轻的对角线纹理（`repeating-linear-gradient` 4% 白，间距 3px，仅右上 40% 区域），**不用图片、不用渐变光斑**
- 无摄影图，无插画。这是最反"传统猎头模板"的一步：竞品全部在 Hero 放人物照
- 品牌语 "We don't search. We target." 中的 **target** 单词用 chili 红，其余白色

### 02 公司定位 —— 浅色 `paper` 底

需求要求体现 `China × Europe` + 欧洲本地人才市场能力。用**排版对照**表达，不用地图不用国旗：

```
✛ WHO WE ARE

Two markets. One standard of precision.        ← h2，precision 红

┌──────────────────────┬──────────────────────┐
│ 中国企业              │ 欧洲人才市场          │   ← 左右对照，中间 1px 竖线
│ Chinese Enterprises  │ European Talent      │
│                      │                      │
│ 理解决策链、汇报结构   │ 本地薪酬基准、劳动法   │
│ 与扩张节奏。          │ 与候选人期望。        │
└──────────────────────┴──────────────────────┘

Chili Career GmbH 总部位于杜塞尔多夫，为中国企业在德国及
欧洲的人才招聘、Executive Search 与 HR 咨询提供支持。
                                        ← 68ch 正文
```

中间那条 1px 竖线在移动端变为横线，两栏堆叠。这条线就是 "×" 的克制表达。

### 03 服务 —— 浅色 `paper` 底

三个服务。**不用图标**（需求明令避免图标过多），用 mono 编号 + 排版层级：

```
✛ WHAT WE DO

┌────────────────┬────────────────┬────────────────┐
│ 01             │ 02             │ 03             │  ← mono, silver
│                │                │                │
│ Recruitment    │ Executive      │ HR Consulting  │  ← 24px, 600
│                │ Search         │                │
│ 专业岗位与技术  │ C-Level 与关键  │ 组织架构、薪酬  │  ← 15px graphite
│ 人才的精准定位  │ 领导岗位的直接  │ 体系与进入市场  │
│ 与交付。        │ 搜寻与评估。    │ 的 HR 策略。    │
│                │                │                │
│ Learn more →   │ Learn more →   │ Learn more →   │  ← hover 红下划线
└────────────────┴────────────────┴────────────────┘
     ↑ 卡片仅用 1px steel 描边，无阴影无圆角（2px）
```

hover：整卡边框转 `chili`，编号数字转 `chili`，`180ms`。不做位移、不做放大。

### 04 用户反馈 —— 深色 `ink` 底

需求说明第一版可预留位置。设计成即使只有 1 条也成立的版式：

```
✛ CLIENT TESTIMONIALS

「 引文内容，28px，白色，最多三行。            ← 大号引文
   引号本身用 chili 红，48px mono。 」

   —— 姓名 · 职位                              ← 15px silver
      公司 · 行业                              ← 13px mono silver
```

多条时横向滑动（已装 `embla-carousel-react`），指示点为 3px 方形（非圆点），当前项 chili 红。
**空状态**：整块隐藏，不显示"暂无评价"——精品公司不展示空货架。

### 05 合作机构 —— 浅色 `paper` 底

Logo 墙。灰度处理是关键，避免多品牌彩色打架：

```
✛ PARTNERS & ASSOCIATIONS

[logo] [logo] [logo] [logo] [logo]      ← 5 列（桌面）/ 2 列（移动）
[logo] [logo] [logo]                     grayscale + opacity .55
                                         hover → 原色 opacity 1
```

- Logo 统一高度 `32px`，宽度自适应，容器等宽
- 无边框、无卡片，仅靠 `gap: 56px` 分隔
- Logo 不足 5 个时改为居中单行，不留空位

### 06 近期活动 —— 浅色 `paper` 底

需求要求：图片 + 名称 + 日期 + 地点，可持续更新。

```
✛ EVENTS

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │
│    图片       │  │    图片       │  │    图片       │  ← 3:2，grayscale
│   3:2 比例    │  │              │  │              │     hover 转彩色
├──────────────┤  ├──────────────┤  ├──────────────┤
│ 2026.03.18   │  │ 2026.02.05   │  │ 2025.11.22   │  ← mono, chili 红
│ Düsseldorf   │  │ Frankfurt    │  │ Shanghai     │  ← mono, graphite
│              │  │              │  │              │
│ 活动名称       │  │ 活动名称      │  │ 活动名称      │  ← 20px, 600
│ 路演/论坛类型  │  │              │  │              │  ← 13px silver
└──────────────┘  └──────────────┘  └──────────────┘

                              [ All events → ]
```

图片默认 grayscale 是刻意的：既统一了不同来源实拍照的色调差异，又避开了"stock photo 感"。
首页仅显示最新 3 条，全部列表在 `/events`。

### 07 Contact —— 深色 `ink` 底

```
✛ LET'S TALK

Start a Conversation                      ← 44px，Conversation 红

告诉我们您在欧洲的招聘需求，我们会在两个
工作日内回复。                              ← silver

[ Start a Conversation → ]     或   hello@chilicareer.de
  ↑ 实心 chili 按钮                  ↑ mono，hover 红下划线

Chili Career GmbH · Düsseldorf, Germany
51.2277° N, 6.7735° E                     ← mono silver 13px
```

---

## 5. 子页面设计

所有子页面共用一个页头组件（`PageHeader`）：深色 `ink` 底，高度 `280px`，含 eyebrow + h1 + 一句副标题。

### 5.1 `/services` 服务页

三个服务各一个全宽区块，深浅交替，锚点 `#recruitment` `#executive-search` `#hr-consulting`。

每个服务区块统一结构：
```
✛ 01 / RECRUITMENT

Recruitment                          ← h2
一句定位陈述（≤ 20 词）                ← 24px graphite

适用场景                    交付流程
· 场景一                    01 需求界定与市场画像
· 场景二                    02 定向搜寻与初筛
· 场景三                    03 结构化评估与 Shortlist
                           04 入职与试用期跟进
```
"交付流程" 用编号列表 —— 这里的 01/02/03 是**真实顺序**，编号承载信息，符合"结构即信息"原则。左侧"适用场景"是无序的，就用点列表，不编号。

### 5.2 `/testimonials`、`/partners`、`/events`

分别是首页对应区块的完整列表版：
- `/testimonials`：两列引文网格，浅底，卡片 1px 描边
- `/partners`：按类别分组（客户 / 行业协会 / 合作机构），每组一个 logo 网格
- `/events`：按年份倒序分组，`2026` / `2025` 用 mono 大号数字作为分组标题；每年内 3 列卡片

### 5.3 `/contact` 联系页

左右两栏（桌面 7:5）：

```
左栏：Contact Form                    右栏：Direct
┌─────────────────────────┐          Chili Career GmbH
│ Name *                  │          [街道地址]
│ Company *               │          40213 Düsseldorf
│ Email *                 │          Germany
│ Phone                   │
│ Enquiry type   ▾        │          hello@chilicareer.de
│  (Recruitment /         │          +49 [电话]
│   Executive Search /    │
│   HR Consulting /       │          51.2277° N, 6.7735° E
│   Other)                │
│ Message *               │          LinkedIn →
│                         │
│ ☐ 我同意按《数据保护声明》 │
│   处理我的数据 *          │  ← DSGVO 强制，必须勾选
│                         │
│ [ Send enquiry → ]      │
└─────────────────────────┘
```

**DSGVO 合规要点（不可省略）**：
- 同意勾选框**默认未勾选**，且为提交必填项
- 勾选文案内含指向 `/datenschutz` 的链接
- 表单字段最小化：只收集处理询盘必需的信息（数据最小化原则）
- 表单页需说明数据用途与保留期限

仓库已有 `src/components/contact/` 与 `next-safe-action` + `zod`，表单校验复用现有模式。

---

## 6. 法律页面（德国强制）

### 6.1 `/impressum` —— 公司注册信息

德国 §5 DDG（原 §5 TMG）强制要求。缺失或不完整可被 Abmahnung。必须包含：

```markdown
# Impressum

## Angaben gemäß § 5 DDG

Chili Career GmbH
[Straße und Hausnummer]
40213 Düsseldorf
Deutschland

## Vertreten durch
Geschäftsführer: [姓名]

## Kontakt
Telefon: +49 [...]
E-Mail: hello@chilicareer.de

## Registereintrag
Eintragung im Handelsregister
Registergericht: Amtsgericht Düsseldorf
Registernummer: HRB [...]

## Umsatzsteuer-ID
Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: DE [...]

## Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
[姓名, 地址]

## EU-Streitschlichtung / Verbraucherstreitbeilegung
[标准条款]
```

> 🔴 **需向客户索取的信息**：完整街道地址、Geschäftsführer 姓名、HRB 注册号、Registergericht、USt-IdNr.、电话。这些是法律必填项，无法由设计方填写。

### 6.2 `/datenschutz` —— 数据保护声明

按客户提供的参考站 `mariafischerundteam.de/datenschutz` 实测结构，采用标准 10 节 DSGVO 布局：

```
1.  Begriffsbestimmungen  (a–k：personenbezogene Daten, betroffene Person,
    Verarbeitung, Einschränkung der Verarbeitung, Profiling,
    Pseudonymisierung, Verantwortlicher, Auftragsverarbeiter,
    Empfänger, Dritter, Einwilligung)
2.  Name und Anschrift des für die Verarbeitung Verantwortlichen
3.  Erfassung von allgemeinen Daten und Informationen
4.  Routinemäßige Löschung und Sperrung von personenbezogenen Daten
5.  Rechte der betroffenen Person  (a–i：Bestätigung, Auskunft,
    Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
    Widerspruch, automatisierte Entscheidungen, Widerruf)
6.  Rechtsgrundlage der Verarbeitung
7.  Berechtigte Interessen an der Verarbeitung
8.  Dauer, für die die personenbezogenen Daten gespeichert werden
9.  Gesetzliche oder vertragliche Vorschriften zur Bereitstellung
10. Bestehen einer automatisierten Entscheidungsfindung
```

针对我们站点需**额外补充**的章节（参考站没有但我们需要，因为我们有表单和可能的分析）：
- Kontaktformular（表单数据的用途、法律依据 Art. 6(1)(a)/(b)、保留期）
- Cookies（若启用分析）+ Hosting / CDN（Vercel 属美国接收方，需说明 Art. 44 ff. 传输依据）
- Bewerberdaten（候选人数据处理——对招聘公司这是核心项）

**排版**：法律页用单栏，`max-width: 72ch`，左侧固定章节目录（桌面 `sticky`），正文 `graphite`，h3 用 mono 编号。密集条文靠行高 `1.75` 与章节间 `48px` 间距维持可读性。

**实现方式**：走仓库现有 MDX 管线。在 `content/pages/` 下新增：
```
impressum.mdx        impressum.de.mdx        impressum.zh.mdx
datenschutz.mdx      datenschutz.de.mdx      datenschutz.zh.mdx
```
德语版为法律权威版本；EN/ZH 版顶部需加注："本翻译仅供参考，法律效力以德语版本为准。"

> ⚠️ **免责**：本设计稿提供的是法律页面的**结构与字段清单**，不构成法律意见。Impressum 与 Datenschutz 上线前应由德国律师或数据保护顾问审阅，具体条文内容由客户提供。

---

## 7. 三语实现方案

### 7.1 新增德语 locale

仓库当前只有 `en` / `zh`，`de` 需新增。

`src/config/website.tsx`：
```ts
i18n: {
  defaultLocale: 'en',
  locales: {
    en: { flag: '🇺🇸', name: 'English' },
    de: { flag: '🇩🇪', name: 'Deutsch' },   // ← 新增
    zh: { flag: '🇨🇳', name: '中文' },
  },
},
```
新建 `messages/de.json`（以 `en.json` 为模板，33KB，需完整翻译业务相关 namespace）。

> 语言切换器 UI **不显示国旗**（`src/components/layout/locale-switcher.tsx` 需改）。德语不等于德国，中文不等于中国大陆——用文字 `EN / DE / 中文` 更准确也更克制。仓库 config 里的 flag 字段保留不用即可。

### 7.2 文案表（三语对照，首版）

| Key | EN | DE | ZH |
|---|---|---|---|
| hero.eyebrow | DÜSSELDORF · GERMANY | DÜSSELDORF · DEUTSCHLAND | 德国 · 杜塞尔多夫 |
| hero.title | Chili Career | Chili Career | Chili Career |
| hero.subtitle | European Talent. Strategic Hiring. | Europäische Talente. Strategische Besetzung. | 欧洲人才，精准招募 |
| hero.claim | We don't search. We target. | Wir suchen nicht. Wir treffen. | 我们不搜寻，我们瞄准 |
| hero.cta | Start a Conversation | Gespräch beginnen | 开始对话 |
| about.eyebrow | WHO WE ARE | ÜBER UNS | 关于我们 |
| about.title | Two markets. One standard of precision. | Zwei Märkte. Ein Maßstab an Präzision. | 两个市场，同一种精确 |
| services.eyebrow | WHAT WE DO | LEISTUNGEN | 我们的服务 |
| services.recruitment | Recruitment | Recruitment | 招聘 |
| services.executive | Executive Search | Executive Search | 高管猎聘 |
| services.consulting | HR Consulting | HR-Beratung | HR 咨询 |
| services.learnMore | Learn more | Mehr erfahren | 了解更多 |
| testimonials.eyebrow | CLIENT TESTIMONIALS | KUNDENSTIMMEN | 客户反馈 |
| partners.eyebrow | PARTNERS & ASSOCIATIONS | PARTNER & VERBÄNDE | 合作机构 |
| events.eyebrow | EVENTS | VERANSTALTUNGEN | 近期活动 |
| events.all | All events | Alle Veranstaltungen | 全部活动 |
| contact.eyebrow | LET'S TALK | KONTAKT | 联系我们 |
| contact.reply | We reply within two business days. | Wir antworten innerhalb von zwei Werktagen. | 我们将在两个工作日内回复 |
| footer.legal | Legal | Rechtliches | 法律信息 |
| footer.imprint | Imprint | Impressum | 公司信息 |
| footer.privacy | Privacy | Datenschutz | 数据保护 |

德语文案要点：`Executive Search` 在德国 HR 行业属通用英语借词，**保留英文不译**（Michael Page / Hays 实测均如此）。`Wir suchen nicht. Wir treffen.` 保留了原句的双动词对仗，`treffen` 兼有"命中"与"会面"双义，比 `zielen` 更好。

### 7.3 三语排版差异

| | EN | DE | ZH |
|---|---|---|---|
| 标题字距 | −0.03em | −0.02em（复合词更长，减少收紧） | 0 |
| 标题字重 | 600 | 600 | 500（中文同字重视觉更重） |
| 正文行高 | 1.65 | 1.65 | 1.75 |
| 换行 | 正常 | `hyphens: auto` **必须**（Personalberatung 类长复合词会溢出） | `line-break: strict` |

德语的长复合词是真实的布局风险：`Umsatzsteuer-Identifikationsnummer` 34 字符。所有标题容器需 `overflow-wrap: break-word`，德语正文需开启 `hyphens: auto` 并设 `lang="de"`（连字符断词依赖正确的 lang 属性）。

---

## 8. 实现计划

### 8.1 文件改动清单

**新建**
```
src/styles/globals.css                     ← 改：替换 :root / .dark 令牌
src/assets/fonts/index.ts                  ← 改：换 4 个字体
src/config/website.tsx                      ← 改：加 de locale
src/config/navbar-config.tsx                ← 改：6 项导航
src/config/footer-config.tsx                ← 改：三列 + 法律页
src/routes.ts                               ← 改：加 Services/Testimonials/Partners/Events/Impressum/Datenschutz
messages/de.json                            ← 新建
messages/en.json · zh.json                  ← 改：新增 ChiliCareer namespace

src/components/chili/section-heading.tsx     ← 新建：eyebrow + 准星 + h2
src/components/chili/reticle.tsx             ← 新建：8×8 准星 SVG
src/components/chili/hero.tsx                ← 新建：01
src/components/chili/positioning.tsx         ← 新建：02
src/components/chili/services-grid.tsx       ← 新建：03
src/components/chili/testimonials.tsx        ← 新建：04
src/components/chili/partners-wall.tsx       ← 新建：05
src/components/chili/events-grid.tsx         ← 新建：06
src/components/chili/contact-cta.tsx         ← 新建：07
src/components/chili/page-header.tsx         ← 新建：子页面页头
src/components/chili/legal-layout.tsx        ← 新建：法律页单栏 + 目录

src/app/[locale]/(marketing)/(home)/page.tsx           ← 改：换成 7 个区块
src/app/[locale]/(marketing)/(pages)/services/page.tsx  ← 新建
  同上 testimonials / partners / events
src/app/[locale]/(marketing)/(legal)/impressum/page.tsx  ← 新建
src/app/[locale]/(marketing)/(legal)/datenschutz/page.tsx ← 新建

content/pages/impressum{,.de,.zh}.mdx        ← 新建
content/pages/datenschutz{,.de,.zh}.mdx      ← 新建
```

**删除/停用**（boilerplate 残留，与定位冲突）：首页的 Pricing / FAQ / Integration / Stats 区块引用；导航中的 Blog / Docs / Pricing / AI 等 MkSaaS 演示项。

### 8.2 令牌落地（`src/styles/globals.css`）

```css
:root {
  --background: oklch(0.9734 0.0013 286.38);   /* paper  #F6F6F7 */
  --foreground: oklch(0.1588 0.0045 264.44);   /* ink    #0C0D0F */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1588 0.0045 264.44);
  --primary: oklch(0.5359 0.1990 23.58);       /* chili  #C7202F */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.9159 0.0042 271.37);    /* steel  #E2E3E6 */
  --secondary-foreground: oklch(0.4403 0.0132 256.75);
  --muted: oklch(0.9159 0.0042 271.37);
  --muted-foreground: oklch(0.4403 0.0132 256.75); /* graphite —— 注意不是 silver */
  --accent: oklch(0.9159 0.0042 271.37);
  --accent-foreground: oklch(0.1588 0.0045 264.44);
  --border: oklch(0.9159 0.0042 271.37);
  --input: oklch(0.9159 0.0042 271.37);
  --ring: oklch(0.5359 0.1990 23.58);
  --radius: 2px;                                /* 关键：近直角 */
}

.dark {
  --background: oklch(0.1588 0.0045 264.44);   /* ink */
  --foreground: oklch(0.9607 0.0017 247.84);   /* dk-text */
  --card: oklch(0.2038 0.0067 258.37);         /* dk-surface */
  --primary: oklch(0.6231 0.2035 20.75);       /* chili-on-dark #E8404F */
  --primary-foreground: oklch(0.1588 0.0045 264.44);
  --muted-foreground: oklch(0.6589 0.0113 261.78); /* silver，深底合格 */
  --border: oklch(0.2713 0.0086 255.58);       /* dk-line */
  --ring: oklch(0.6231 0.2035 20.75);
}
```

字体变量同步改 `@theme inline` 中的 `--font-sans: var(--font-body)`、`--font-display`、`--font-mono`、`--font-cjk`，并保留全部 `--animate-*` 与 keyframes（仓库注释已警告换主题时不要删动画变量）。

### 8.3 交付阶段

| 阶段 | 内容 | 产出验收 |
|---|---|---|
| P1 基础层 | 令牌、字体、`de` locale、导航/页脚、路由 | 三语可切换，全站配色生效 |
| P2 首页 | 7 个区块组件 + 三语文案 | 首页三语完整，Lighthouse ≥ 95 |
| P3 子页面 | services / testimonials / partners / events | 4 个子页面三语完整 |
| P4 合规层 | contact 表单 + DSGVO 同意 + Impressum + Datenschutz | 法律页三语齐备，表单可收信 |
| P5 内容填充 | 真实客户评价、合作 logo、活动图文 | 客户提供素材后替换占位 |

P1–P4 为设计与开发可独立完成的部分；P5 依赖客户素材，不阻塞上线（空状态已按 04/05 节设计为可隐藏）。

---

## 9. 待客户确认清单

设计可以先行，但以下项目无法由设计方决定：

**法律必需（阻塞 P4 上线）**
1. Impressum 全部字段：街道地址、Geschäftsführer 姓名、HRB 号、Registergericht、USt-IdNr.、电话
2. Datenschutz 中的数据保护联系人；是否已指定 DSB（数据保护官）
3. 是否启用 Cookie / 分析 —— 若启用则需 Cookie 同意横幅（TTDSG 强制）

**内容类（不阻塞上线）**
4. Logo 源文件：`docs/` 下现有 5 个位图（黑底/白底/极窄/长形），需矢量 SVG 用于导航栏与页脚；建议提供横版（约 3:1）与方版两种
5. 客户评价：姓名、职位、公司是否可公开署名（DSGVO 下需获得同意）
6. 合作机构 logo 及使用授权
7. 活动图文素材
8. 邮箱域名确认（`hello@chilicareer.de`?）与表单收件地址
9. 电话与办公地址

**待决策**
10. 品牌语 "We don't search. We target." 的德语版建议为 **"Wir suchen nicht. Wir treffen."** —— 需客户母语者确认语感
11. 是否需要 LinkedIn 之外的社交渠道
12. 域名与 Vercel 部署账户

---

## 10. 设计自检（对照需求逐条）

| 需求 | 落地情况 |
|---|---|
| 三语统一结构 | §7，`de` locale 新增 + 三语文案表 + 三语排版差异 |
| 专业/国际化/高端/精准/简洁 | 直角、描边优先、5% 红色纪律、120px 章节间距 |
| 不做成传统招聘网站 | 无职位搜索、无职位列表、无简历上传，导航 6 项 |
| 核心品牌语 | Hero 唯一红色焦点 + 页脚底栏复现 |
| 6 项导航 | §3.1 完全一致 |
| 首页 7 区块 | §4，01–07 与需求编号一一对应 |
| 黑/白/红/Silver 配色 | §2.1，精确到 OKLCH + 对比度实测，并修正 silver 的浅底不合格问题 |
| 有品牌感但不过度奢华 | 无金色、无渐变、无大阴影、无玻璃拟态 |
| 避免 stock photo / 握手图 | §1.3 硬约束，摄影 ≤ 4 张且限定题材 |
| 避免图标过多 | 全站 ≤ 8 个，服务模块零图标 |
| 避免信息拥挤 | 单屏 ≤ 3 信息块，行宽 ≤ 68ch |
| 避免过度中国元素 | China × Europe 仅用排版对照 + 经纬度坐标 |
| Impressum + Datenschutz | §6，按客户参考站 10 节 DSGVO 结构 |

