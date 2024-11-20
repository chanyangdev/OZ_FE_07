# React의 스타일링

- Sass
- tailwindcss
- styled components

## CSS의 장단점

👍

- 웹 페이지 스타일링의 _근본_
- 초보자도 _배우기 쉽다_
- 별도의 _설치 과정/ 설정이 필요 없다_
- 브라우저가 _직접 해석_ 하므로
- 처리 과정 없이 _빠르게 로드_ 된다

👎

- 코드를 깔끔하게 _정리하기 어렵다_
- 중복된느 코드를 _재사용하기 어렵다_
- _유지보수가 힘들다_

## SCSS (SASS) 란?

Syntactically Awesome Style Sheets

- 기존 CSS의 **단점을 보완**하고
- **효율성**을 높이기 위해서 만들어진 문법

SCSS는
Sassy CSS의 줄임말

SASS 3버전에서 등장!

CSS 코드 **중첩**, CSS코드 **변수화**, CSS 속성 **재사용**등 여러가지 기능을 제공!

### SCSS vs SASS

![SCSS vs SASS](./images/Screenshot%202024-11-20%20at%2010.26.45 AM.png)

## 설치

`npm install sass`

scss확장자 파일 쓰기!
`App.scss`
`index.scss`

## SCSS 사용법

1. 변수

```css
$light-gray: rgb(240,240,240)
$dark-gray: rgb(100,100,100)

element1 {
  background-color: $light-gray;
  color: $dark-gray;
}
```

2. 중첩

![Nesting](./images/Screenshot%202024-11-20%20at%2010.49.20 AM.png)

3. Mixin (믹스인)
   *반복되는 코드*를 **재사용**할 수 있게 해주는 **틀**

- 틀 만들기

```css
@mixin 믹스인이름 {
  재사용할 코드
}
```

- 틀 사용하기

```css
@include 믹스인이름;
```

- Example 1️⃣
  ![mixin](./images/Screenshot%202024-11-20%20at%2011.02.54 AM.png)

- Example 2️⃣
  ![mixin2](./images/Screenshot%202024-11-20%20at%2011.03.54 AM.png)

## SCSS 장단점

👍

- 코드의 **재사용성**이 더 좋다
- 코드의 **가독성**이 더 좋다
- **유지보수**가 더 쉬워진다

👎

- CSS 대비 **추가 학습**이 필요하다
- SCSS 코드를 _CSS로 변환_ 하는 과정이 필요해 _조금 더 느리다_
