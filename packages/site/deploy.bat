@echo off
REM 声明采用UTF-8编码
chcp 65001

call pnpm run build

call cd .vitepress/dist
call git init
call git add -A
call git commit -m 'deploy'

:: 意思为将master构建后的代码合并到gh-pages分支上，然后在gh-pages分支上部署~
call git push -f https://github.com/0604hx/grid-form.git master:gh-pages

call cd ../../

echo 上传完成^.^
