//common ways to output

alert("");

console.log("");

//creating a variable with the var keyword

var x = 35;

/*
Notice that we did not define a type for the variable,
like int var x = 35. That is because we did not have to.
*/

/*variables in javascript have dynamic types

the type is associated with values, not variables

dynamic types allow you to perform operations
with variables of different types
*/

/*
we can check the type of a given value with the
typeof operator
*/

typeof x //returns "number"

/*
Take note that 35 is an integer, but typeof simply returns
"number". Javascript makes no distinction between the two.

All number arithmetic is handled as floating point arithmetic.
*/

//we expect 40 as the output

x = x + 5;
console.log(x);

//we expect 0.3 as the output

x = 0.1 + 0.2;
console.log(x);

//but we get the "wrong" output


//this will not return an error

x = "a string";
console.log(x);

//this will also not return an error

x = x + 51;
console.log(x);


/*
Once something is added to a string, the sum is treated
as the concatenation of the string equivalents of the two
addends.

Basically, when a string is in the mix, the + becomes 'concatenate', not 'add'
*/

x = 1 + 1 + " equals 2";
console.log(x);

x = "2 is " + 1 + 1;
console.log(x);


//in the second case, the first addition results in the string
//"2 is 1"


/*
What happens when we try to get the value of a variable with
no value?
*/

var y;
console.log(y);

//undefined means there is no such value
//since type is associated with value...

console.log(typeof y);

//we will make y an array

var z = [5,2];

y = [2, 11, 4, "wat", z];

console.log(y);

/*
Javascript arrays can contain different data types
They can also contain other arrays
*/

//just like other languages, arrayName[i] will return the element at the index.

console.log(y[0]);
console.log(y[4]);

//arrays in JS are dynamic
//push(object) and pop() add and remove elements at the end
//of an array, respectively.


y.push(x);
console.log(y);
console.log("Remove " + y.pop());
console.log(y);

//push() and pop() are functions

/*
In Javascript, functions behave the same as they do
in other languages.
*/

function adder (x,y) {
 return x + y;
}

alert(adder(5,6));

//but you can assign them to variables if you want.

var fx = function () {
 alert("fx was called");
}

//the purpose of this will be touched on later

console.log(typeof y);

/*
Objects are a special kind of type.
Objects typically have variables and functions inside them.
*/

//There are many ways to create an object

//1. object initializer

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

//2.Object.create(arg)
//creates and returns an object based on arg

var bread2 = Object.create(bread);

//this copies bread to bread2

console.log(bread2.nationality);
console.log(bread2.name);
console.log(bread2.edible); //remember: we bake()-d the bread

//let's change some members to show it's different

bread2.nationality = "Filipino";
bread2.name = "pandesal";

console.log(bread2.nationality);
console.log(bread2.name);

//3.Object constructors
//functions that can make an object with the 'new' keyword

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

/*Small note:
 'new' makes any function become a constructor.
 There is nothing special about Node() from other functions
*/

/*
Let us make MORE nodes and connect them with each other!
In our Node object, 'next' refers to the 'id' of the node that comes right after this one
For convenience, -1 means nothing comes after this
*/

/*
[Node]
*/

var current = node.id;

node[8] = new Node(8, 9, currrent);

/*
[Node8]->[Node]
*/

current = node[8].id;

node[17]= new Node(17, 2, current);

/*
[Node17]->[Node8]->[Node]
*/

current = node[17].id;

//As an exercise for the reader, print the nodes from node 3 to node 1 

var traverser = 