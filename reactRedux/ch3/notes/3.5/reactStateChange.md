# React의 상태 변경
1. 상태 변경 함수를 사용해야 함
2. 새로운 상태 값이 기존 상태 값과 달라야 함 === React의 불변성을 지켜야 함
## 원시 자료형 (Primitive Data Type)
-**불변**하는 단순한 데이터
-변수에 **값 자체**를 저장
`문자열 = "안녕하세요"` 
`숫자 = 3.141592`
### 자료형 종류별 특징
## 참조 자료형 (Reference Data Type)
-**가변**하는 복잡한 데이터
-변수에 **메모리 주소**를 저장
`배열 = [1,2,3]`
`객체 = {사과: 🍎, 바나나: 🍌}`
![react screenshot](../../images/Screenshot%202024-11-13%20at%2010.31.42 AM.png)
![react class screenshot](../../images/Screenshot%202024-11-13%20at%2010.36.05 AM.png)
기존 상태를 **재사용**하면서 **주소 값을 바꾸려면?**
1. 기존 상태를 **복사**해서 가공한다 => `Spread Syntax` `Array.slice()` `Object.assign()`
2. **새로운 배열**을 리턴하는 **고차 함수 메서드**를 사용한다 => `Array.map()` `Array.filter()`
## 실습
### 원시 자요형
```js
function App() {
  let [number, setNumber] = useState(1);

  const handler = () => {
    setNumber(number + 1);
  };

  return (
    <>
    number : {number}
    <br />
    <button onClick={handler}>상태 업데이트!</button>
    </>
  );
}
```
### 참조 자료형
```js
function App() {
  let [array, setArray] = useState([1, 2, 3]);

  const handler = () => {
    const newArray = [...array];
    newArray.push(5);
    setArray(newArray);
  };

  return (
    <>
      array : [{array.join(",")}]
      <br />
      <button onClick={handler}>상태 업데이트!</button>
    </>
  );
}
```



