# React State
### Counter example
```javascript
import "./App.css";

function App() {
  let counter = 0;
  return (
    <.>
    <div>counter : {counter}</div>
    <button
    onClick={() => {
      counter += 1;
    }}
    >
    +
    </button>
    <button
    onClick={() => {
      counter -= 1;
    }}>-</button>
    </>
  );
}
export default App;
```
- The counter should increase by one each time the button is clicked.
- Counter was not updating, so we checked using `console.log` 
### Reason
#### 선언적 프로그래밍 
"무엇(What)"을 화면에 표시할지 JSX 문법으로 표현하면, JSX에 들어가는 *데이터*가 변화하면 데이터에 맞는 화면이 *"결과"*로 표시됨!
### What kind of data does react use? 
State, 상태
특정 리엑트 컴포넌트 안에서 사용하는 데이터 (변경 가능)
- When a state is created, React is always looking at it. 
- when the state is changed, react "reacts" to it. haha 🤣
## Class Component 컴포넌트
```javascript
class MyComponent extends Component {
  state = {stateName: stateValue}
  componentMethod = () => {
    this.setState({stateName: newStateValue})
  }

  render(){
    return( 표시할 요소, component)
  }
}
```
## 함수형 function component
```javascript
function MyComponent(){
  const[state,stateChangeFunction] = useState(stateValue)

  const componentMethod = () => {
    stateChangeFunction(newStateValue)
  }

  return (표시할 요소, component)
}
```
**주의**
상태 변경 함수를 하용하지 않으면, React는 상태변경을 감지하지 못합니다!
#### Let's try React States!
```javascript
import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0) // 초기 상태값. 상태가 잘만들어짐
  return (
    <>
    <div>counter : {counter}</div> 
    <button onClick={() => {
      setCounter((prev) => prev + 1); // setting counter and changing state on button click
    }}
    >
    +
    </button> 
    <button onClick={() => {
      setCounter((prev) => prev - 1); // subtrack 1 from counter and set that to counter state on button click
    }}
    >
    -
    </button>
    </>
  );
}
export default App;
```
상태를 만들고 상태를 변경하는법 확인
#### Class component state practice
```javascript
class App extends Component {
  state = { counter: 1 }
  render() {
    return <>
    <div>counter {this.state counter}</div>
    <button onClick={() => this.setState{{ counter: this.state.counter + 1}}}
    >
      +
    </button>
    <button onClick={() => this.setState{{ counter: this.state.counter - 1 }}}
    >
      -
    </button>
    </>
  };
}

export default App;
```
## 요즘에는 함수형 컴포넌트를 더 선호한다

# Conclusion
Rendering states on react require knowledge and usage of set state and controlling the values of them properly.