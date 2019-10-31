// Gobal variables
var vowels = ["a", "e", "i", "o", "u", "y"];

var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];

console.log(vowels.length + " = 6 vowels.");
console.log(consonants.length + " = 21 consonants.");



// Reuseable reset value function
function resetValue() {
    $("#user-input").val("");
};

// Main translation function, can translate any sentence or word
var translation = function (userInput = "") {
    var input = userInput.toLowerCase().trim().split(" ");
    console.log("INSIDE TRANSLATION Input: ", input, {input});
    console.log("INSIDE TRANSLATION Input type: ", typeof input);
    resetValue();
    var output = input.map(function (word) {
        return translateWord(word);
    });
    return output.join(" ");
};

// Translates logic for individual words
var translateWord = function (userInput = "") {
    var input = userInput.split("");
    console.log("Input: ", input, {input});
    console.log("Input type: ", typeof input);

    if (userInput.indexOf("qu") === 0) {
        input.push("quay");
        input.splice(0, 2);
        // YOU CAN ALSO USE THIS.(This works when you are targeting the string userInput instead of an array. Keeping code clean).
        // var quResult = userInput.slice(2, userInput.length);
        // return quResult + "quay";
    } else if (consonants.indexOf(input[0]) !== -1) {
        while (consonants.indexOf(input[0]) !== -1) {
            input.push(input[0]);
            input.shift();
        }
        input.push('ay');
    } else if (vowels.indexOf(input[0]) !== -1) {
        input.push(input[0] + "way");
        input.shift();
    }
    return input.join("");
}

// Gathers input from form
$("#pig-latin").submit(function (event) {
    event.preventDefault();
    console.log("I've been submitted!");
    // Reads input
    var userInput = $("#user-input").val();
    console.log("User Input: ", userInput);
    // Validate Inputs (if not vaild alerts and resets input)
    if (userInput === "") {
        alert("Please enter a vaild input.");
        resetValue();
        return;
    };

    // Display result to UI and UI state changes
    var result = translation(userInput);
    $("#result").show();
    $("#pig-latin, #instructions").hide();
    $("#user-sentence").text(userInput);
    $("#translation").text(result)
});

// reset button and UI state changes
$(".reset").click(function () {
    $("#result").hide();
    $("#pig-latin, #instructions").show();
    $("#user-sentence", "#translation").empty();
    userInput = "";
});

// tests
var test = function (input, expectedOutput) {
    var output = translation(input);
    if (output === expectedOutput) {
        console.log(`✅ success: ${input} => ${output}`);
    } else {
        console.log(`❌ fail: ${input} => ${output}, expected => ${expectedOutput}`);
    }
}

// test cases
test(undefined, '');
test("3", "3");
test("i", "iway");
test("ice", "ceiway");
test("pig", "igpay");
test("you", "ouyay");
test("smile", "ilesmay");
test("queen", "eenquay");
test("pig pig pig", "igpay igpay igpay");
test("ice queen pig", "ceiway eenquay igpay");