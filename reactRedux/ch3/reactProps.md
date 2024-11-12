# Props
## State review
상태
- 특정 컴포넌트 안에서 상태 관리
- 변경 가능~!
## Props
부모 parent component에게 전달받은 데이터 (변경 불가능)
`child component props이름={ props } />`

### class component
`super(props)`
`props.propsName`

or 

`this.props.propsName`

### function component
```js
function childComponent ({ propsName }) {
  ...
}
```

Example from video
```js
class Count extends Component {

  render () {
    console.log("props", this.props);
    return <div>counter: {this.props.counter}</div>;
  }
}
```
# State 끌어올리기
![React Video Screenshot](./images/screenshot.png)
```js
class ClassApp extends Component {
  state = { counter: 1 };

  incrementCounter = () => {
    this.setState{{counter: this.state.counter + 1 }}

}
  decrementCounter = () => {
    this.setState{{counter: this.state.counter - 1 }}
  }

  render() {
    return (
      <>
        <Count counter={this.state.counter} />
        <PlusButton incrementCounter={this.incrementCounter}/>
        <MinusButton decrementCounter={this.decrementCounter}/>
        </>
    );
  }
}

class PlusButton extends Component {
  render() {
    return <button onClick={this.props.incrementCounter}>+
    </button>;
  }
}

class MinusButton extends Component {
  render() {
    return <button onClick={this.props.decrementCounter}>-
    </button>;
  }
}

class Count extends Component {
  render() {
    return <div>counter: {this.props.counter}</div>;
  }
}
```
## 상태 끌어올리기 lifting state up 

