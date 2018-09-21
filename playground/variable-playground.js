// var person = {
// 	name: 'David',
// 	age: 21
// };

// function updatePerson(obj) {
// 	// obj = {
// 	// 	name: 'David',
// 	// 	age: 24
// 	// };
// 	obj.age = 24;
// }

// updatePerson(person);
// console.log(person);

// Array example, array of grades 2 values, make fn called 'addGrades', takes array and pushes new value
// do 1 where new array uses push, other where array doesn't get updated

var grades = [69, 96];

function addGrades(gradesArr) {
	gradesArr.push(100,99); //this updates the grades variable/array and adds the value/s to the array using push.
	debugger;
	
	//gradesArr = [65, 76, 54]; this code doesn't do anything, because it's not referenced/updating to it
}

addGrades(grades);
console.log(grades);