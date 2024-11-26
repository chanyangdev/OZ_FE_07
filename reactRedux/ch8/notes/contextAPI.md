# 1. React 내부 상태 관리: Context API

## 1.1 기본개념

![context api picture](./images/image.png)

- data를 사용한 tree 안의 component에 **props를** **'순간이동'** 시키는 방법이다.
  context는 **부모가 tree내부 전체에**, 심지어 멀리 떨어진 component에도 data를 제공할 수 있게 한다.
- 값으로 평가되는 **모든 data type**은 Context API를 통해 전역 상태로 만들 수 있다.

data types:

- 기본 자료형: 숫자, 문자열, boolean
- 참조 자료형: 배열, 객체
- 함수: event handler, state 변경 함수 등
- 특수 값: `null`, `undefined`

- 지역 정보, UI theme, caching된 data등의 data를 다룰 떄 주로 사용한다.

## 1.2 상황별 사용 방법

### **값만 전역 상태**로 만드는 경우 (읽기 전용)

- `Provider`를 통해 값만 전역 상태로 제공할 떄 사용한다.
- 상태 변경이 필요 없는 값 (ex: theme, language setting)을 context로 공유할떄 사용한다.

#### 사용 방법

1. `createContext`를 사용하여 context(전역 상태) 생성하기

```js
import { createContext } from "react";

export const LevelContext = createContext(1); // 기본값
```

- `LevelContext`는 data를 전역적으로 관리하는 'container'이다.
- 이 context object는 특정한 **데이터를 저장** (=component tree에 전달)하고, 하위 component에서 `useContext`를 사용해 data에 접근할 수 있다.

> 상위 레벨에 매칭되는 Provider가 없을 경우
> Context를 제공하지 않으면, 즉 상위 level에 matching되는 `Provider`이 없다면 **기본값을 사용**한다.
> 단, 기본 값으로 `undefined`를 넣으면 기본값이 사용되지 않는다.

2. `Provider`로 context제공하기

```js
import { LevelContext } from "./LevelContext.js";

export default function Section({ level, children }) {
  return (
    <section className="section">
      {/* 전역값을 읽을 컴포넌트를 Provider 컴포넌트로 감싸야 한다.*/}
      <LevelContext.Provider value={level}>
        <Heading />
      </LevelContext.Provider>
    </section>
  );
}
```

- `useContext`를 통해 전역 값을 불러오는 하위 component는 반드시 해당 context object를 제공하는 `<Provider>`로 감싸야한다. **하위 컴포넌트는 UI tree에서 가장 가까운** `Provider`로부터 값을 받는다.
  (예제 코드에서, `Heading`component는 자신을 감싸고 있는 가장 가까운 `<LevelContext.Provider>`의 값을 불러오게 된다.)

> Provider란?

- **context값을 실제로 공급**하는 역할
- `value`라는 prop을 통해 하위 component들이 해당 값에 접근할 수 있도록 한다.
- `value` prop이 변경될 때마다 하위 component들은 rerendering된다.

3. `useContext`를 사용하여 context에 등록된 값 불러오기
   하위 component에서 `useContext` hook을 사용하여 context에 등록된 전역값에 접근할 수 있다.

```js
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";

// 컨텍스트로 접근 가능한 값은 prop으로 전달 받지 않는다.
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error("Unknown level: " + level);
  }
}
```

### **값과 상태 변경 함수를 함께 전역 상태**로 만드는 경우

- `set`함수도 함께 제공해 하위 component에서 state를 변경할 수 있다.
- `set`함수를 통해 context값이 변경될 때마다 관련 component가 rerendering된다.

#### 사용 방법

1. `createContext`를 사용하여 context(전역 상태) 생성하기

```js
import { createContext, useState } from "react";

export const CounterContext = createContext();
```

2. `Provider`로 전역 상태 연결하기

```js
export function CounterProvider({ children }) {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={[counter, setCounter]}>
      {children}
    </CounterContext.Provider>
  );
}
```

```js
ReactDOM.createRoot(document.getElementById("root")).render(
  <CounterProvider>
    <App />
  </CounterProvider>
);
```

3. `useContext`를 사용하여 context에 등록된 값 불러오기

```js
// Content.jsx
import React, { useContext } from "react";
import CounterContext from "./counterContext";

function Content() {
  const [counter, setCounter] = useContext(CounterContext);

  return (
    <div>
      <p>카운터: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>증가</button>
    </div>
  );
}
```

> custom hook을 이용하여 component 내에서 해당 값에 접근할 수 있다.

```js
export function useCounterContext() {
  return useContext(counterContext);
}

// const [counter, setCounter] = useCounterContext();
```

### context를 **중첩**해서 사용하는 경우

- 한 component내에서 여러 개의 Context값을 사용할 수 있다.
- 각 Context의 `Provider`로 감싸고 `useContext`로 필요한 값을 개별적으로 접근한다.

#### 예제 코드

```js
import React, { useContext } from "react";

// 컨텍스트 생성
const ThemeContext = createContext("light");
const UserContext = createContext({ name: "Guest" });
const ContentContext = createContext([]);

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: "John Doe" }}>
        <User />
      </UserContext.Provider>
      <ContentContext.Provider value={[1, 2, 3]}>
        <Content />
      </ContentContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
```

```js
// User.jsx
import React, { useContext } from "react";

function User() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <p>사용자: {user.name}</p>
    </div>
  );
}
```

```js
// Content.jsx
import React, { useContext } from "react";

function Content() {
  const theme = useContext(ThemeContext);
  const content = u; //counterContext.js
  import { createContext, useState } from "react";

  const CounterContext = createContext();
  export function CounterProvider({ children }) {
    const [counter, setCounter] = useState(0);

    return (
      <CounterContext.Provider value={{ counter, setCounter }}>
        {children}
      </CounterContext.Provider>
    );
  }
  se; // themeContext.js
  import { createContext } from "react";

  const ThemeContext = createContext("light"); // 기본값만 설정

  export function ThemeProvider({ children }) {
    return (
      <ThemeContext.Provider value="light">{children}</ThemeContext.Provider>
    );
  }

  export default ThemeContext;
  Context(ContentContext);

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <p>{`내용: ${content}`}</p>
    </div>
  );
}
```
