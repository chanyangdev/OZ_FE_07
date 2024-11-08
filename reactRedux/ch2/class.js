class person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

const p = new person('홍길동', 25)
console.log(p)

class student extends person {
  constructor(name, age, major) {
    super(name, age)
    this.major = major
  }
}

const s = new student('홍길동', 25, '컴퓨터공학')
console.log(s)

