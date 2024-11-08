class person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  } 

  introduce() {
    console.log(`Hi, I'm ${this.name}, a ${this.age} year old ${this.gender}`)
  }
}



