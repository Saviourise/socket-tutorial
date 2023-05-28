function func(x) {
  return x * func(x - 1);
}

console.log(func(5));
