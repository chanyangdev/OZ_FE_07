import './App.css'

const fruits = [
  {
    name: "딸기",
    color: "red",
    size: 1,
  },
  {
    name: "바나나",
    color: "yellow",
    size: 2,
  },
  {
    name: "수박",
    color: "green",
    size: 3,
  },
  {
    name: "오렌지",
    color: "orange",
    size: 4,
  }, 
  {
    name: "포도",
    color: "purple",
    size: 5,
  }
];

function App() {
  return (
    <>
  {fruits.map((fruit) => {
    <div key={fruit.name}>
      Name: {fruit.name}, Color: {fruit.color}, Size: {fruit.size}
    </div>
  })}
    </>
  )
}

export default App
