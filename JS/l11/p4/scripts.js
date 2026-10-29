function countVowelsForEach(str) {
    const vowels = 'aeiouyаеёиоуыэюя';
    let count = 0;
    str.toLowerCase().split('').forEach(char => {
        if (vowels.includes(char)) count++;
    });
    return count;
}


function countVowelsFilter(str) {
    const vowels = 'aeiouyаеёиоуыэюя';
    return str.toLowerCase().split('').filter(char => vowels.includes(char)).length;
}


function countVowelsReduce(str) {
    const vowels = 'aeiouyаеёиоуыэюя';
    return str.toLowerCase().split('').reduce((acc, char) => {
        return vowels.includes(char) ? acc + 1 : acc;
    }, 0);
}

let userInput = prompt('Enter a string:');
alert(`ForEach: ${countVowelsForEach(userInput)}`);
alert(`Filter: ${countVowelsFilter(userInput)}`);
alert(`Reduce: ${countVowelsReduce(userInput)}`);

function treeSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (Array.isArray(element)) {
            sum += treeSum(element);
        } else {
            sum += element;
        }
    }
    return sum;
}

const data = [ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8 ];
alert(`Tree Sum: ${treeSum(data)}`);
