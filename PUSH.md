# 推送到 GitHub — 备忘

仓库状态：commit 9a05514 已就绪，工作区干净，remote 已配好
https://github.com/beikungg/chill.git
唯一缺的就是网络出口。

## 1. 删掉全局镜像改写规则（镜像已失效，建议删）

    git config --global --unset url."https://mirror.ghproxy.com/https://github.com/".insteadOf

验证已生效（应输出干净的 github.com 地址，不带 mirror）：

    git ls-remote --get-url origin

删掉之后，下面所有命令都不用再带 -c 参数。

## 2. 带代理推送

HTTP 代理（Clash 默认 7890；v2ray 常见 10808）：

    export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890
    git push -u origin main

SOCKS5 代理：

    export all_proxy=socks5://127.0.0.1:1080
    git push -u origin main

只给 git 设代理（不影响其他程序，持久生效）：

    git config --global http.https://github.com.proxy http://127.0.0.1:7890
    git push -u origin main

## 3. 改用 SSH（如果 443 被封而 SSH 可通）

    git remote set-url origin git@github.com:beikungg/chill.git
    git push -u origin main

若 22 端口不通，走 SSH over 443 —— 写入 ~/.ssh/config：

    Host github.com
      Hostname ssh.github.com
      Port 443
      User git

先测通再推：

    ssh -T git@github.com

## 4. 没删全局规则时的写法

    git -c url."https://github.com/beikungg/".insteadOf="https://github.com/beikungg/" push -u origin main

## 5. 完全没网络出口 —— 用 bundle 转移

在这台机器打包（不需要网络）：

    git bundle create chill.bundle --all

把 chill.bundle 拷到能上 GitHub 的机器，然后：

    git clone chill.bundle chill && cd chill
    git remote set-url origin https://github.com/beikungg/chill.git
    git push -u origin main

## 认证提示

HTTPS 推送时 GitHub 要的是 Personal Access Token，不是账号密码。
生成：github.com/settings/tokens → Generate new token (classic) → 勾 repo。
用户名填 beikungg，密码位置粘贴 token。
