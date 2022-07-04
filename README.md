# 前端项目

## 页面结构：

### 1. 主页

两个选择按钮，选择老师学生身份。

### 2. 登录页

学生和老师分开，输入账号密码进行登录。

！！！尚未在前端完成输入检查。

### 3. 注册页

学生和老师分开，输入各种信息进行登录。

！！！尚未在前端完成输入检查。

### 4. 课程列表

#### 4.1 学生部分：

获取课程列表并显示，已完成。

#### 4.2 教师部分：

获取课程列表并显示，同学生。

！！！两部分添加课程功能都还没有。教师为开设课程，学生为加入课程。

教师开设课程应提供：课程号，课程名，周次。

学生加入课程应提供：课程号。

### 5. 公告列表

#### 5.1 学生部分：

获取课程公告列表并显示，已完成。

！！！尚未完成确认收到功能。应该在已收到后按钮变为"您已确认收到"，而且也还没有跟后端通信。

#### 5.2 教师部分

获取课程公告列表并显示，同学生。

！！！尚未完成添加公告功能。

### 6.讨论区

尚未开始设计。

## 缓存区变量名称：

### 1. isLogin 

bool型，标志是否登录。

### 2. login_id

string，登陆者编号（学生学号，教师工号）。

### 3. login_type

bool型，1为老师，0为学生。

### 4. cno

string，课程号。



