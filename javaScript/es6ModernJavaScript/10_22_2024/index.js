function sayHello(name, callback) {
  const words = "Hello I am " + name;
  callback(words);
}
  sayHello("Daniel", function printing(name) {
    console.log(name)
  });

