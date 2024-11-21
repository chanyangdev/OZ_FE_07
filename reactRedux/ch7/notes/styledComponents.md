# Styled Components

React에서 사용되는 대표적인 _CSS-in-JS_ 라이브러리

## CSS-in-JS

말 그대로 **JavaScript안에서** **CSS를 작성** 하는 방식

**컴포넌트 기반 개발**
(**CDD**, **C**omponent **D**riven **D**evelopment)
화면을 *독립적이고 재사용 가능한 컴포넌트*로 구성하여 개발하는 방법론

설치
`npm install styled-components`

불러오기!
`import styled from "styled-components"`

## Styled Components 사용법

1. 컴포넌트 만들기

`const componentName = styled.tag종류`

```jsx
const BlueButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  width: 200px;
`;
```

2. 컴포넌트 재사용하기
   `const 컴포넌트이름 = styled(재사용할 컴포넌트)`

`const BigBlueButton = styled(BlueButton)`

Example:

```jsx
const BlueButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  width: 200px;
`;

const BigBlueButton = styled(BlueButton)`
  width: 300px;
  padding: 20px;
`;

const BigTextBigBlueButton = styled(BigBlueButton)`
  font-size: 30px;
  font-weight: 900;
`;

function App() {
  return (
    <Container>
      <div>hello</div>
      <BlueButton></BlueButton>
      <BigBlueButton></BigBlueButton>
      <BigTextBigBlueButton></BigTextBigBlueButton>
    </Container>
  );
}
```

3. Props 사용하기

```jsx
const StyledButton = styled.Button`
  background: ${(props) => props.color};
`;
```

```jsx
const PropsButton = styled.button`
  background-color: ${(props) => props.backgroundColor || "white"};
  color: ${(props) => props.textColor || "black"};
  padding: ${(props) => props.padding || 0};
  border-radius: ${(props) => props.radius || 0};
  margin: ${(props) => props.margin || 0};
  width: ${(props) => props.width || "auto"};
  font-size: ${(props) => props.fontSize || "auto"};
  font-weight: ${(props) => props.fontWeight || 400};
`;
```

4. 전역 스타일 설정하기
   `import {createGlobalStyle} from "styled-components"`

```jsx
const GlobalStyle = createGlobalStyle`
* {
margin: 0;
padding: 0;
}
`;
```

## Styled Components 장단점

👍

- CSS도 **컴포넌트화** 할 수 있음
- CSS와 JS의 **상호작용**이 쉬움
- Class 이름을 자동으로 지어줌

👎

- 역시 CSS 대비 추가 학습이 필요하다
- Class 이름이 안이쁘다
- JavaScript의 크기가 커진다
