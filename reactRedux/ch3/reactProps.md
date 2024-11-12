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

