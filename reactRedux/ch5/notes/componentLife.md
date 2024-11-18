# 컴포넌트의 생명 주기

![component life](./images/Screenshot%202024-11-15%20at%2010.14.55 AM.png)

## Rerendering

- Class component
  `state:{num: 1}` -> `state: { num: 2}`
  화면에서 없어지면 인스턴스 사용 ❌

화면에 **다시** 표시할 땐?
**새로운** 인스턴스 생성

- Function component
  `num = 1` -> 호출된 함수 `num = 1`
  앞서 호출했던 함수는 더이상 사용하지 않음
  **새로운 상태 값**으로 **함수 호출**
  기존 함수는 사라지고 **새로운 함수 호출**로 완전히 대체됨 (리렌더링 완료)
- 화면에서 없어지면 더 이상 사용 ❌
- 화면에 **다시** 표시할 땐? **함수 호출**

## Class Component

![class component picture](./images/Screenshot%202024-11-15%20at%2010.24.21 AM.png)

## Component 직접 사용

```js
function App() {
  const [showCounter, setShowCounter] = useState(false);

  return (
    <>
      {showCounter && <Counter />}
      <br />
      <button onClick={() => setShowCounter((prev) => !prev)}>show?</button>
    </>
  );
}

class Counter extends Component {
  constructor() {
    super();
    this.state = { counter: 1 };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("DidMount");
  }

  componentDidUpdate() {
    console.log("DidUpdate");
  }

  componentWillUnmount() {
    console.log("WillUnmount");
  }
  render() {
    console.log("render");
    return (
      <>
        <div>counter : {this.state.counter}</div>
        <button
          onClick={() =>
            this.setState({
              counter: 1,
            })
          }
        >
          +1
        </button>
      </>
    );
  }
}
```

## 함수 컴포넌트 생명 주기 - `useEffect`

![function component picture](./images/Screenshot%202024-11-15%20at%2010.39.04 AM.png)

### ⭕ 이럴 때 작동해요!

![function component](./images/Screenshot%202024-11-15%20at%2010.51.28 AM.png)

```js
useEffect(() => {
  first 인자 : 함수
}, [두번쨰 인자 : 배열]);
```

> 어떻게 작성하느냐에 따라서 호출되는 방식이 다름!

#### 배열을 인자로 주지 않으면?

-> 컴포넌트가 **처음 렌더링** 되었을 떄
-> **리렌더링** 되었을 떄

- componentDidMount
- componentDidUpdate

#### 빈 배열을 인자로 주면?

-> 컴포넌트가 **처음 렌더링** 되었을 때

- componentDidMount

#### 배열에 값을 담아서 인자로 주면?

-> 컴포넌트가 **처음 렌더링** 되었을 떄
-> _배열에 담긴 값이 변경_ 되어서 **리렌더링** 되었을 떄

- componentDidMount

- componentDidUpdate

```js
useEffect (() => {
  first 인자: 함수
  return () => {returning function}
})
```

#### 함수를 리턴하면?

-> component가 **처음 렌더링** 되었을 떄
-> **리렌더링** 되었을 떄
-> 컴포넌트가 **화면에서 사라질 때**

- componentDidMount
- componentDidUpdate
- componentWillUnmount

```js
class Counter () {
  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(100);

  // 1. 컴포넌트가 최초로 렌더링 될 떄에만 조작을 하고싶다!
  useEffect(() => {
    console.log('맨 처음 렌더링 될 떄')
  }, [])

  // 2. 컴포넌트가 리렌더링 될 떄 조작하고 싶다!
  useEffect(() => {
    console.log('리렌더링...')
  })

  // 3. 특정 상태값이 변할 때에만 조작하고 싶다!
  useEffect(() => {
    console.log('counter의 값이 변할 때')
  }, [counter]);

  // 4. 컴포넌트가 최종적으로 언마운트 될 떄 조작하고 싶다!
  useEffect(() => {
    return () => {
      console.log("returned function");
    };
  }, []);
}
```

## 생명 주기 함수의 중요성

> 생명 주기 함수는 언제 어떻게 쓰는건가?

1. 서버에서 **데이터**를 받아올 떄
2. **이벤트 핸들러**를 사용할 떄
3. **타이머 함수**를 사용할 떄

### 서버에서 데이터 받아올 떄

```js
function Component() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("...").then((res) => setData(res));
  }, []);

  return (
    <>
      <div>data list</div>
      {data.map((el) => (
        <div>{el.content}</div>
      ))}>
    </>
  );
}
```

### Mouse Handler

```js
function Component() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseHandler = () => {
      "마우스 위치 구해서 상태 업데이트하는 코드";
    };
    window.addEventListener("mousemove", mouseHandler);

    return () => {
      window.removeEventListener("mousemove", mouseHandler);
    };
  });

  return (
    <Component>마우스 위치가 필요한 컴포넌트</Component>;
  )
}
```

### 타이머 함수

- `setTimeOut` ↔️ `clearTimeOut`
- `setInterval` ↔️ `clearInterval`
  타이머를 설정한 후에 제거하지 않으면... 🤯 타이머가 쌓일 수 있다...!

Clean-up Function

```js
useEffect (() => {
  first 인자: 함수
  return () => {returning function}
}, [state1, state2])
```

```js
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
}
```
