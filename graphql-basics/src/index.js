// Named export
import myModule, { message, getGreeting } from "./myModule";
import add, { subtract } from "./add";

console.log(getGreeting("Andrew"));
console.log(myModule);
console.log(add(1,2), subtract(2,1));
