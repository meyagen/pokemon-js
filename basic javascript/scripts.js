//common ways to output

console.log("hello world");

//creating a variable with the var keyword

var x = 35;

console.log(typeof x);

x = x + 5;
console.log(x);

x = 0.1 + 0.2;
console.log(x);

x = "string";
console.log(x);


x = x + 51;
console.log(x);

x = 1 + 1 + " equals 2";
console.log(x);

x = "2 is " + 1 + 1;
console.log(x);

var y;
console.log(y);

console.log(typeof undefined);

var z = [5, 2];

y = [2, 11, 4, "wat", z];

console.log(y);

console.log(y[0]);
console.log(y[4]);

y.push(x);
console.log(y);

console.log("Remove " + y.pop());
console.log(y);

function adder (x,y) {
 return x + y;
}

console.log(adder(5,15));

var fx = function () {
 console.log("fx was called");
};

console.log(typeof fx);

console.log(typeof y);

var bread = {
 nationality: "French",
 name: "baguette",
 edible: false,
 bake: function() {
  this.edible = true;
 }
};

//To select any of these members, use the . operator

console.log(bread.nationality);
console.log(bread.edible);
bread.bake();
console.log(bread.edible);

var bread2 = Object.create(bread);

//this copies bread to bread2

console.log(bread2.nationality);
console.log(bread2.name);
console.log(bread2.edible); //remember: we bake()-d the bread

//let's change some members to show it's different

bread2.nationality = "Filipino";
bread2.name = "pandesal";
console.log("After changing:");
console.log(bread2.nationality);
console.log(bread2.name);

function Node (id, value, next) {
 this.id = id; ///0
 var value = value; //5
 this.next = next; //-1

 this.returnValue = function() {
  return value;
 }
}

var node = new Node(0, 5, -1);


console.log(node.id);
console.log(node.returnValue());
console.log(node.next);




























