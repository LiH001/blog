---
title: "概统期中复习"
description: "概率论与数理统计期中核心考点与公式推导，包含常见离散与连续分布、多维随机变量及其数字特征。"
pubDate: 2026-06-28
tags: ["数学", "概率统计", "期中复习"]
draft: false
---

# 概统期中复习：核心结论与证明

本篇笔记主要整理概率论与数理统计期中考试范围内的核心结论及其详细证明。内容涵盖常见离散型与连续型随机变量的分布与数字特征、多维随机变量及其函数分布、随机变量的数字特征（期望、方差、协方差、相关系数）与切比雪夫不等式。

---

## 常见离散型随机变量及其分布

### 1. 0-1 分布与二项分布

#### 0-1 分布（特殊的二项分布）
*   期望：$E(X) = p$
*   方差：$D(X) = p(1-p)$

#### 二项分布 $X \sim B(n,p)$
*   分布律：$P(X=k) = C_n^k p^k (1-p)^{n-k}, \quad k=0,1,2,\dots,n$
*   期望：$E(X) = np$
*   方差：$D(X) = np(1-p)$

**期望与方差的证明提示**
将 $X$ 看成 $n$ 个独立同分布的 0-1 分布变量 $X_i$ 的和，即 $X = \sum_{i=1}^n X_i$。由于期望和方差在独立前提下具有可加性，因此：
$$E(X) = \sum_{i=1}^n E(X_i) = np$$
$$D(X) = \sum_{i=1}^n D(X_i) = np(1-p)$$

---

### 2. 泊松分布

> **引理：指数函数的麦克劳林展开**
> 对于任意实数 $\lambda$，指数函数 $e^\lambda$ 可以展开为幂级数，这是推导泊松分布数字特征的基础：
> $$ e^\lambda = \sum_{k=0}^{\infty} \frac{\lambda^k}{k!} = 1 + \lambda + \frac{\lambda^2}{2!} + \dots $$

随机变量 $X \sim P(\lambda)$
*   分布律：$P(X=k) = \frac{\lambda^k}{k!} e^{-\lambda}, \quad k=0,1,2,\dots$
*   泊松定理（二项分布的极限）：当 $n \ge 20, p \le 0.05$ 时，有近似公式 $C_n^k p^k (1-p)^{n-k} \approx \frac{\lambda^k}{k!} e^{-\lambda}$，其中 $\lambda = np$。

#### 期望与方差的证明

首先求期望 $E(X)$：
$$ E(X) = \sum_{k=0}^{\infty} k \cdot \frac{\lambda^k}{k!} e^{-\lambda} = e^{-\lambda} \sum_{k=1}^{\infty} k \cdot \frac{\lambda^k}{k(k-1)!} = e^{-\lambda} \cdot \lambda \sum_{k=1}^{\infty} \frac{\lambda^{k-1}}{(k-1)!} = e^{-\lambda} \cdot \lambda \cdot e^{\lambda} = \lambda $$

接着求 $E(X^2)$，这里的核心技巧是利用 $k^2 = k(k-1) + k$ 进行拆项：
$$ 
\begin{aligned}
E(X^2) &= \sum_{k=0}^{\infty} k^2 \frac{\lambda^k}{k!} e^{-\lambda} = \sum_{k=1}^{\infty} (k(k-1) + k) \frac{\lambda^k}{k!} e^{-\lambda} \\
&= \sum_{k=2}^{\infty} k(k-1) \frac{\lambda^k}{k!} e^{-\lambda} + \sum_{k=1}^{\infty} k \frac{\lambda^k}{k!} e^{-\lambda} \\
&= \lambda^2 e^{-\lambda} \sum_{k=2}^{\infty} \frac{\lambda^{k-2}}{(k-2)!} + E(X) \\
&= \lambda^2 e^{-\lambda} \cdot e^{\lambda} + \lambda = \lambda^2 + \lambda
\end{aligned}
$$

最后计算方差：
$$ D(X) = E(X^2) - [E(X)]^2 = (\lambda^2 + \lambda) - \lambda^2 = \lambda $$

---

### 3. 几何分布与超几何分布

> **引理：幂级数逐项求导**
> 对于无穷等比级数 $\sum_{k=1}^{\infty} q^k = \frac{q}{1-q}$ （其中 $|q| < 1$），在收敛域内可以逐项求导：
> $$ \sum_{k=1}^{\infty} k q^{k-1} = \frac{1}{(1-q)^2} $$
> 同理，对上式再次求导可得：
> $$ \sum_{k=2}^{\infty} k(k-1) q^{k-2} = \frac{2}{(1-q)^3} $$

#### 几何分布
*   分布律：$P(X=k) = (1-p)^{k-1}p, \quad k=1,2,3,\dots$
*   期望与方差：$E(X) = \frac{1}{p}, \quad D(X) = \frac{1-p}{p^2}$

**期望与方差的证明**
令 $q = 1-p$。利用上述引理，直接代入可得期望：
$$ E(X) = \sum_{k=1}^{\infty} k \cdot q^{k-1}p = p \sum_{k=1}^{\infty} k q^{k-1} = p \cdot \frac{1}{(1-q)^2} = p \cdot \frac{1}{p^2} = \frac{1}{p} $$
求方差时，先求 $E[X(X-1)]$：
$$ E[X(X-1)] = \sum_{k=1}^{\infty} k(k-1) q^{k-1}p = pq \sum_{k=2}^{\infty} k(k-1)q^{k-2} = pq \cdot \frac{2}{(1-q)^3} = pq \cdot \frac{2}{p^3} = \frac{2q}{p^2} $$
$$ D(X) = E[X(X-1)] + E(X) - [E(X)]^2 = \frac{2(1-p)}{p^2} + \frac{1}{p} - \frac{1}{p^2} = \frac{1-p}{p^2} $$

> **引理：组合数恒等式**
> 在组合数学中，有以下两个常用于概率论推导的重要恒等式：
> *   吸收恒等式：$k C_M^k = M C_{M-1}^{k-1}$，同理 $k(k-1)C_M^k = M(M-1)C_{M-2}^{k-2}$。
> *   范德蒙德卷积公式：$\sum_{k} C_A^k C_B^{n-k} = C_{A+B}^n$。

#### 超几何分布
*   分布律：$P(X=k) = \frac{C_M^k \cdot C_{N-M}^{n-k}}{C_N^n}, \quad k=0,1,2,\dots,\min\{n, M\}$
*   期望：$E(X) = np$，其中 $p = \frac{M}{N}$ 为次品率。
*   方差：$D(X) = np(1-p)\frac{N-n}{N-1}$，其中 $p = \frac{M}{N}$ 为次品率。

**期望与方差的证明**
证明的核心在于利用引理中的吸收恒等式以及范德蒙德卷积公式：
$$ 
\begin{aligned}
E(X) &= \sum_{k=1}^{n} k \frac{C_M^k C_{N-M}^{n-k}}{C_N^n} = \sum_{k=1}^{n} \frac{M C_{M-1}^{k-1} C_{N-M}^{n-k}}{\frac{N}{n} C_{N-1}^{n-1}} \\
&= n \frac{M}{N} \sum_{k=1}^{n} \frac{C_{M-1}^{k-1} C_{(N-1)-(M-1)}^{(n-1)-(k-1)}}{C_{N-1}^{n-1}}
\end{aligned}
$$
由于后半部分的求和代表了在 $N-1$ 件物品中抽取 $n-1$ 件的所有概率之和，其值等于 $1$，因此：
$$ E(X) = n \frac{M}{N} = np $$

求方差同样先求 $E[X(X-1)]$：
$$ 
\begin{aligned}
E[X(X-1)] &= \sum_{k=2}^{n} k(k-1) \frac{C_M^k C_{N-M}^{n-k}}{C_N^n} = \sum_{k=2}^{n} \frac{M(M-1) C_{M-2}^{k-2} C_{N-M}^{n-k}}{\frac{N(N-1)}{n(n-1)} C_{N-2}^{n-2}} \\
&= \frac{n(n-1)M(M-1)}{N(N-1)} \sum_{k=2}^{n} \frac{C_{M-2}^{k-2} C_{(N-2)-(M-2)}^{(n-2)-(k-2)}}{C_{N-2}^{n-2}} \\
&= \frac{n(n-1)M(M-1)}{N(N-1)}
\end{aligned}
$$
最后代入方差公式化简（令 $p = \frac{M}{N}$）：
$$ 
\begin{aligned}
D(X) &= E[X(X-1)] + E(X) - [E(X)]^2 \\
&= \frac{n(n-1)M(M-1)}{N(N-1)} + np - n^2 p^2 \\
&= np \left[ \frac{(n-1)(M-1)}{N-1} + 1 - np \right] \\
&= np(1-p)\frac{N-n}{N-1}
\end{aligned}
$$

---

## 常见连续型随机变量及其分布

### 1. 指数分布

> **引理：分部积分法**
> 在计算连续型随机变量数字特征时，常利用分部积分法消去被积函数中的多项式因子：
> $$ \int u \, dv = uv - \int v \, du $$

随机变量 $X \sim E(\lambda)$，这里采用参数化形式 $\theta = \frac{1}{\lambda}$ 进行介绍：
*   概率密度函数：
    $$ f(x) = \begin{cases} \frac{1}{\theta} e^{-\frac{x}{\theta}}, & x > 0 \\ 0, & \text{其他} \end{cases} $$
*   分布函数：
    $$ F(x) = \begin{cases} 1 - e^{-\frac{x}{\theta}}, & x > 0 \\ 0, & \text{其他} \end{cases} $$

#### 无记忆性证明
即证明 $P\{X > s+t \mid X > s\} = P\{X > t\}$：
$$ 
\begin{aligned}
P\{X > s+t \mid X > s\} &= \frac{P\{X > s+t \text{ 且 } X > s\}}{P\{X > s\}} = \frac{P\{X > s+t\}}{P\{X > s\}} \\
&= \frac{1 - F(s+t)}{1 - F(s)} = \frac{e^{-\frac{s+t}{\theta}}}{e^{-\frac{s}{\theta}}} = e^{-\frac{t}{\theta}} \\
&= 1 - F(t) = P\{X > t\}
\end{aligned}
$$

#### 期望与方差 the Proof（利用分部积分法）
$$ 
\begin{aligned}
E(X) &= \int_{0}^{+\infty} x \cdot \frac{1}{\theta} e^{-\frac{x}{\theta}} dx = -\int_{0}^{+\infty} x \, d(e^{-\frac{x}{\theta}}) \\
&= -\left[ x e^{-\frac{x}{\theta}} \right]_{0}^{+\infty} + \int_{0}^{+\infty} e^{-\frac{x}{\theta}} dx \\
&= 0 + \left[ -\theta e^{-\frac{x}{\theta}} \right]_{0}^{+\infty} = \theta
\end{aligned}
$$
同理，两次运用分部积分法求 $E(X^2)$：
$$ E(X^2) = \int_{0}^{+\infty} x^2 \cdot \frac{1}{\theta} e^{-\frac{x}{\theta}} dx = 2\theta^2 $$
$$ D(X) = E(X^2) - [E(X)]^2 = 2\theta^2 - \theta^2 = \theta^2 $$

---

### 2. 均匀分布

随机变量 $X \sim U(a,b)$
*   概率密度函数：
    $$ f(x) = \begin{cases} \frac{1}{b-a}, & a < x < b \\ 0, & \text{其他} \end{cases} $$

#### 期望与方差的证明
$$ E(X) = \int_{a}^{b} x \cdot \frac{1}{b-a} dx = \frac{1}{b-a} \left[ \frac{1}{2}x^2 \right]_{a}^{b} = \frac{b^2 - a^2}{2(b-a)} = \frac{a+b}{2} $$
求方差先求 $E(X^2)$：
$$ E(X^2) = \int_{a}^{b} x^2 \cdot \frac{1}{b-a} dx = \frac{1}{b-a} \left[ \frac{1}{3}x^3 \right]_{a}^{b} = \frac{b^3 - a^3}{3(b-a)} = \frac{1}{3}(a^2 + ab + b^2) $$
$$ 
\begin{aligned}
D(X) &= E(X^2) - [E(X)]^2 = \frac{a^2 + ab + b^2}{3} - \frac{(a+b)^2}{4} \\
&= \frac{4a^2 + 4ab + 4b^2 - 3(a^2 + 2ab + b^2)}{12} \\
&= \frac{a^2 - 2ab + b^2}{12} = \frac{1}{12}(b-a)^2
\end{aligned}
$$

---

### 3. 正态分布

随机变量 $X \sim N(\mu, \sigma^2)$
*   概率密度函数：$$ f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}} $$
*   期望与方差：$E(X) = \mu, \quad D(X) = \sigma^2$

#### 重要性质
*   标准正态分布对称性：若 $X \sim N(0,1)$，则 $\Phi(x) + \Phi(-x) = 1$。
*   标准化变换：若 $X \sim N(\mu, \sigma^2)$，则 $\frac{X-\mu}{\sigma} \sim N(0,1)$。

---

## 随机变量的函数分布与多维随机变量

### 1. 一维随机变量的函数分布

> **引理：复合函数与变上限积分求导法则**
> 在推导随机变量函数的概率密度时，通常先求分布函数 $F_Y(y)$，再对其求导。对于形如 $F(y) = \int_{a(y)}^{b(y)} f(t) dt$ 的积分，其导数为：
> $$ F'(y) = f(b(y)) \cdot b'(y) - f(a(y)) \cdot a'(y) $$

---

### 2. 二维随机变量

> **引理：分布函数与概率密度的微积分关系**
> 对于二维连续型随机变量 $(X, Y)$，其联合分布函数 $F(x,y)$ 与联合概率密度 $f(x,y)$ 满足：
> $$ F(x, y) = \int_{-\infty}^{x} \int_{-\infty}^{y} f(u, v) dv du \quad \text{且} \quad \frac{\partial^2 F(x,y)}{\partial x \partial y} = f(x,y) $$

#### 边缘分布
通过对联合分布中另一个变量进行积分消去，即可得到边缘分布：
*   **分布函数：**
    $$ F_X(x) = \lim_{y \to +\infty} F(x, y) = \int_{-\infty}^{x} \left[ \int_{-\infty}^{+\infty} f(t, y) dy \right] dt $$
*   **概率密度函数及其推导：** 对 $F_X(x)$ 关于 $x$ 求导，可得：
    $$ f_X(x) = \int_{-\infty}^{+\infty} f(x, y) dy $$
    同理可证 $f_Y(y) = \int_{-\infty}^{+\infty} f(x, y) dx$。

#### 条件分布
*   **离散型：** $P\{X=x_i \mid Y=y_j\} = \frac{P\{X=x_i, Y=y_j\}}{P\{Y=y_j\}}$
*   **连续型概率密度及其推导：** 考虑在 $y < Y \le y + \Delta y$ 条件下 $X \le x$ 的概率。当 $\Delta y \to 0$ 时，利用极限和积分中值定理：
    $$ 
    \begin{aligned}
    F_{X|Y}(x|y) &= \lim_{\Delta y \to 0} P\{X \le x \mid y < Y \le y + \Delta y\} \\
    &= \lim_{\Delta y \to 0} \frac{\int_{-\infty}^{x} \int_{y}^{y+\Delta y} f(u, v) dv du}{\int_{y}^{y+\Delta y} f_Y(v) dv} \approx \frac{\int_{-\infty}^{x} f(u, y) \Delta y du}{f_Y(y) \Delta y} = \int_{-\infty}^{x} \frac{f(u, y)}{f_Y(y)} du
    \end{aligned}
    $$
    两边对 $x$ 求导，即得条件概率密度：
    $$ f_{X|Y}(x|y) = \frac{f(x, y)}{f_Y(y)} \quad (f_Y(y) > 0) $$

#### 独立性
若 $X$ 和 $Y$ 相互独立，则联合分布等于边缘分布的乘积：
*   离散型：$\forall x, y, \quad P\{X=x_i, Y=y_j\} = P\{X=x_i\} \cdot P\{Y=y_j\}$
*   任意型（分布函数）：$F(x, y) = F_X(x) \cdot F_Y(y)$
*   连续型（概率密度）：$f(x, y) = f_X(x) \cdot f_Y(y)$

---

### 3. 两个随机变量的函数分布

> **引理：二维随机变量变换的雅可比行列式法**
> 设 $(X, Y)$ 的联合概率密度为 $f(x, y)$。作变换 $U = X, Z = g(X, Y)$，若其存在唯一反函数 $x = u, y = h(u, z)$，且偏导数连续，则雅可比行列式（Jacobian）为：
> $$ J = \frac{\partial(x, y)}{\partial(u, z)} = \begin{vmatrix} 1 & 0 \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial z} \end{vmatrix} = \frac{\partial y}{\partial z} $$
> 变换后的联合概率密度为 $f_{U,Z}(u, z) = f(u, h(u, z)) \cdot |J|$。求 $Z$ 的边缘密度只需对 $u$（即 $x$）积分：
> $$ f_Z(z) = \int_{-\infty}^{+\infty} f(x, h(x, z)) \left| \frac{\partial y}{\partial z} \right| dx $$

#### (1) 和的分布 $Z = X + Y$
*   **一般情况与证明：** 由 $z = x + y$ 可得反函数 $y = z - x$。此时雅可比行列式 $J = \frac{\partial y}{\partial z} = 1$。代入引理公式得到：
    $$ f_Z(z) = \int_{-\infty}^{+\infty} f(x, z-x) dx $$
    若 $X, Y$ 相互独立，则有**卷积公式**：
    $$ f_Z(z) = \int_{-\infty}^{+\infty} f_X(x) \cdot f_Y(z-x) dx = \int_{-\infty}^{+\infty} f_X(z-y) \cdot f_Y(y) dy $$
*   **正态分布的可加性：** 若 $X \sim N(\mu_1, \sigma_1^2)$，$Y \sim N(\mu_2, \sigma_2^2)$ 且相互独立，代入卷积公式并通过配方化简可证：
    $$ Z = X + Y \sim N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2) $$

#### (2) 商与积的分布
*   **商 $Z = \frac{Y}{X}$：** 反函数为 $y = xz$。雅可比行列式 $J = x$。代入引理公式可证：
    $$ f_{Y/X}(z) = \int_{-\infty}^{+\infty} f(x, xz) \cdot |x| dx $$
*   **积 $Z = XY$：** 反函数为 $y = \frac{z}{x}$。雅可比行列式 $J = \frac{1}{x}$。代入引理公式可证：
    $$ f_{XY}(z) = \int_{-\infty}^{+\infty} f\left(x, \frac{z}{x}\right) \cdot \left| \frac{1}{x} \right| dx $$

#### (3) 最大值与最小值的分布
假设 $X$ 和 $Y$ 相互独立，其分布函数分别为 $F_X(x)$ 和 $F_Y(y)$。
*   **最大值分布 $M = \max\{X, Y\}$**
    推导：$M \le z$ 意味着 $X$ 和 $Y$ 同时必须小于等于 $z$。由独立性可得：
    $$ 
    F_{\max}(z) = P\{M \le z\} = P\{X \le z \text{ 且 } Y \le z\} = F_X(z) \cdot F_Y(z)
    $$
*   **最小值分布 $N = \min\{X, Y\}$**
    推导：直接求比较困难，我们转化为对立事件，即最小于大于 $z$ 意味着两者同时大于 $z$。
    $$ 
    \begin{aligned}
    F_{\min}(z) &= P\{N \le z\} = 1 - P\{N > z\} \\
    &= 1 - P\{X > z \text{ 且 } Y > z\} \\
    &= 1 - [P\{X > z\} \cdot P\{Y > z\}] \\
    &= 1 - [ (1 - F_X(z)) \cdot (1 - F_Y(z)) ]
    \end{aligned}
    $$

---

## 随机变量的数字特征

### 1. 切比雪夫不等式

> **引理：切比雪夫不等式的意义**
> 切比雪夫不等式给出了在随机变量分布未知的情况下，仅仅利用其期望和方差，就能估算出随机变量偏离其期望值的概率上限。

设随机变量 $X$ 的数学期望为 $E(X) = \mu$，方差为 $D(X) = \sigma^2$，则对于任意给定的正数 $\varepsilon > 0$，有：
$$ P\{|X - \mu| \ge \varepsilon\} \le \frac{\sigma^2}{\varepsilon^2} $$
等价形式（对立事件）：
$$ P\{|X - \mu| < \varepsilon\} \ge 1 - \frac{\sigma^2}{\varepsilon^2} $$

**证明（以连续型随机变量为例）**
设 $X$ 的概率密度函数为 $f(x)$，根据方差的定义：
$$ D(X) = \int_{-\infty}^{+\infty} (x - \mu)^2 f(x) dx $$
由于被积函数非负，我们可以缩小积分区间，去掉 $|x - \mu| < \varepsilon$ 的部分，不等号依然成立：
$$ D(X) \ge \int_{|x - \mu| \ge \varepsilon} (x - \mu)^2 f(x) dx $$
幕在积分区间 $|x - \mu| \ge \varepsilon$ 上，显然有 $(x - \mu)^2 \ge \varepsilon^2$，因此：
$$ 
\begin{aligned}
D(X) &\ge \int_{|x - \mu| \ge \varepsilon} \varepsilon^2 f(x) dx \\
&= \varepsilon^2 \int_{|x - \mu| \ge \varepsilon} f(x) dx \\
&= \varepsilon^2 P\{|X - \mu| \ge \varepsilon\}
\end{aligned}
$$
两边同除以 $\varepsilon^2$，即证得：
$$ P\{|X - \mu| \ge \varepsilon\} \le \frac{D(X)}{\varepsilon^2} = \frac{\sigma^2}{\varepsilon^2} $$

---

### 2. 协方差与相关系数

#### 协方差
协方差的定义与计算公式：
$$ \text{Cov}(X, Y) = E{[X - E(X)][Y - E(Y)]} $$
**计算公式推导：**
$$ 
\begin{aligned}
\text{Cov}(X, Y) &= E[XY - X \cdot E(Y) - Y \cdot E(X) + E(X)E(Y)] \\
&= E(XY) - E(X)E(Y) - E(Y)E(X) + E(X)E(Y) \\
&= E(XY) - E(X)E(Y)
\end{aligned}
$$

#### 相关系数
相关系数的定义：
$$ \rho_{XY} = \frac{\text{Cov}(X, Y)}{\sqrt{D(X)} \cdot \sqrt{D(Y)}} $$

#### 方差的展开公式
$$ D(X+Y) = D(X) + D(Y) + 2\text{Cov}(X, Y) $$
**证明：**
$$ 
\begin{aligned}
D(X+Y) &= E\{[(X+Y) - E(X+Y)]^2\} \\
&= E\{[(X - E(X)) + (Y - E(Y))]^2\} \\
&= E\{[X - E(X)]^2 + [Y - E(Y)]^2 + 2[X - E(X)][Y - E(Y)]\} \\
&= D(X) + D(Y) + 2\text{Cov}(X, Y)
\end{aligned}
$$

#### 协方差的性质及证明
*   提取常数：$\text{Cov}(aX, bY) = ab \cdot \text{Cov}(X, Y)$
    *证明：* $\text{Cov}(aX, bY) = E[(aX - E(aX))(bY - E(bY))] = E[ab(X - E(X))(Y - E(Y))] = ab\text{Cov}(X, Y)$
*   分配律：$\text{Cov}(X_1 + X_2, Y) = \text{Cov}(X_1, Y) + \text{Cov}(X_2, Y)$

#### 不相关与独立的等价关系
$$ \rho_{XY} = 0 \iff X, Y \text{ 不相关 } \iff \text{Cov}(X, Y) = 0 \iff E(XY) = E(X) \cdot E(Y) $$

> **引理：正态分布的特殊性**
> 对于一般的随机变量，独立必定不相关，但不相关不一定独立。然而，对于二维正态分布，这两个概念是完全等价的。

当 $(X, Y)$ 服从二维正态分布时：
$$ X, Y \text{ 相互独立 } \iff X, Y \text{ 不相关 } (\text{即 } \rho = 0) $$

**证明简述**
若 $X, Y$ 不相关，即 $\rho = 0$，代入二维正态分布的概率密度展开式中：
$$ 
\begin{aligned}
f(x_1, x_2) &= \frac{1}{2\pi \sigma_1 \sigma_2} \exp\left\{ -\frac{1}{2} \left[ \frac{(x_1-\mu_1)^2}{\sigma_1^2} + \frac{(x_2-\mu_2)^2}{\sigma_2^2} \right] \right\} \\
&= \left[ \frac{1}{\sqrt{2\pi}\sigma_1} \exp\left(-\frac{(x_1-\mu_1)^2}{2\sigma_1^2}\right) \right] \cdot \left[ \frac{1}{\sqrt{2\pi}\sigma_2} \exp\left(-\frac{(x_2-\mu_2)^2}{2\sigma_2^2}\right) \right] \\
&= f_{X_1}(x_1) \cdot f_{X_2}(x_2)
\end{aligned}
$$
联合概率密度等于边缘概率密度的乘积，故 $X, Y$ 相互独立。反之，若独立，协方差必为 0，即 $\rho = 0$。

---

### 3. 矩与协方差矩阵

#### 矩的定义
*   $k$ 阶原点矩：$E(X^k)$
*   $k$ 阶中心矩：$E\{[X - E(X)]^k\}$
*   $k+l$ 阶混合矩：$E(X^k Y^l)$
*   $k+l$ 阶混合中心矩：$E\{[X - E(X)]^k \cdot [Y - E(Y)]^l\}$

#### 二维正态分布与协方差矩阵
设 $(X, Y) \sim N(\mu_1, \mu_2, \sigma_1^2, \sigma_2^2, \rho)$，则其相关系数 $\rho_{XY} = \rho$，其协方差矩阵 $C$（或记为 $\Sigma$）定义为：
$$ C = \begin{pmatrix} \sigma_1^2 & \rho \sigma_1 \sigma_2 \\ \rho \sigma_1 \sigma_2 & \sigma_2^2 \end{pmatrix} $$

二维正态分布的概率密度函数有两种表示方法：
1.  **矩阵形式（更具一般性，易于向高维推广）：**
    记均值向量 $\boldsymbol{\mu} = (\mu_1, \mu_2)^T$，随机向量 $\boldsymbol{X} = (x_1, x_2)^T$，则：
    $$ f(x_1, x_2) = \frac{1}{(2\pi) \cdot |C|^{\frac{1}{2}}} \exp\left\{ -\frac{1}{2} (\boldsymbol{x} - \boldsymbol{\mu})^T C^{-1} (\boldsymbol{x} - \boldsymbol{\mu}) \right\} $$
2.  **展开形式（常用于代数计算）：**
    $$ 
    f(x_1, x_2) = \frac{1}{2\pi \sigma_1 \sigma_2 \sqrt{1-\rho^2}} \exp\left\{ -\frac{1}{2(1-\rho^2)} \left[ \frac{(x_1-\mu_1)^2}{\sigma_1^2} - 2\rho \frac{(x_1-\mu_1)(x_2-\mu_2)}{\sigma_1 \sigma_2} + \frac{(x_2-\mu_2)^2}{\sigma_2^2} \right] \right\}
    $$
