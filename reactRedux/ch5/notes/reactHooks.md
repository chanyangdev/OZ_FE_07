# React Hooks - useRef

React *상태*와 *입력 요소의 value*가 **직접 연동**되어 있는 컴포넌트

- Controlled Component
  ⭕ 이럴때 써요!

-> 입력 값을 **실시간**으로 **검사** 하고 싶을떄
-> 입력 값이 **다른 컴포넌트**에 바로 영향을 줄 떄

❌ 이럴 땐 안써도 돼요!

- **최종 입력 값**만 필요할 때
- **성능을 향상**시키고 싶을 떄

-> `useRef`로 DOM 주소를 직접 가져올 수 있어요!

⭕ 이럴 때 써요!
**DOM 주소를** 직접 가져올 떄
**리렌더링** 되어도 **초기화되지 않는 변수**가 필요할 떄

❌ 너무 남발하면 안 돼요!
React는 기본적으로 **가상 DOM을 통해** **실제 DOM을 조작** 합니다.
반면, `useRef`는 **실제 DOM을 바로 조작**합니다.
React 기본 작동 방식과 다르므로, **꼭 필요할 때만 쓰기!!**

## `useRef` 사용법

1. `const domRef = useRef(null)` ➡️ DOM 주소를 담아줄 공간 만들기, 처음에는 `null`을 넣어 *빈 공간*으로!
2. `<element ref={ domRef } />` ➡️ DOM 주소를 담고 싶은 요소에 `ref`속성으로 연결해 주기!
3. `domRef.current === <element ref={domRef} />` ➡️ 이제 `current`속성으로 요소에 접근 가능!

### Example

```js
function App () {
  return <>
  <ControlledInput />
  </>;
}

export default App;

const useRefInput =() => {
const inputRef = useRef(null);
const getInputValue = () => {
  inputRef.current.value;
}
const focusInput = () => {
  inputRef.current.focus();
};
return (
  <>
  <input ref={inputRef} />
  <button onClick={getInputValue}>input 값 가져오기</button>
  <button onClick={focusInput}>focus!</button>
  </>
);
}

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <input value={inputValue} onChange={{event} => {
      setInputValue(event.target.value)/>
    }}>
  )
}
```

## useRef사용법

컴포넌트가 _리렌더링_ 된 이후에도 **초기화되지 않는 변수**로 사용할 수도 있어요!

함수 컴포넌트

```js
let num1 = 1 -> num1 = 1234

const num2 = useRef(1) -> num2.current = 1234
```

➡️ rerendering 리렌더링

리렌더링 된 컴포넌트

```js
let num1 = 1 -> num1 = 1

const num2 = useRef(1) -> num2.current = 1234
```

## React Custom Hooks

### Hook

React 함수형 컴포넌트에서 쓸 수 있는 함수
`use`로 시작하는 이름을 가짐

### Custom Hook

사용자가 직접 정의해서 사용하는 `Hook`
`use`로 시작하는 이름을 지어주면 됨

⭕ 이래서 좋아요!

중복 코드 ⬇️ 재사용성 ⬆️

코드 가독성 ⬆️ (readability)

유지 보수성 ⬆️

```js
const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCounter] = useState(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCounter((prev) => prev - step);

  return { count, increment, decrement };
};
```

```js
const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { loading, data, error };
};
```
