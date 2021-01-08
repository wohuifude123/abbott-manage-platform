# Git 指令

## stash

### 获取到最近一次stash进去的内容

```
git stash pop stash@{6}
```

### 删除某个stash

```
git stash drop stash@{2}
```

### 从stash里面取记录

```
git stash list //查看暂存区的所有暂存修改

git stash apply stash@{X} //取出相应的暂存

git stash drop stash@{X} //将记录列表中取出的对应暂存记录删除
```

## pull

覆盖本地文件，回退master

```
git fetch --all
git reset --hard origin/master
git pull
```

回退到dev

```
git fetch --all
git reset --hard origin/dev
git pull
```

## 回退

```
git log
git reset --hard 76ccca9b9b0e2a1dbe443c4380d0936f7793d474
git push -f
```


```
git branch -D dev-third
git push origin --delete dev-third
```