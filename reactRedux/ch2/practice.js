const fruits = [
  {
    name: "딸기",
    color: "red",
    size: "big",
  },
  {
    name: "바나나",
    color: "yellow",
    size: "small",
  },
  {
    name: "수박",
    color: "green",
    size: "medium",
  },
  {
    name: "오렌지",
    color: "orange",
    size: "medium",
  }, 
  {
    name: "포도",
    color: "purple",
    size: "medium",
  }
];

fruits.map((fruit) => {
  return fruit.name
})

console.log(fruits.map((fruit) => fruit.name + "주스"));

console.log(
  fruits.filter((fruit) => fruit.color === "red" && fruit.size === "big").map((fruit) => fruit.name)
);
