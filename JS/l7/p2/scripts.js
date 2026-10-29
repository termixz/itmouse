function containsSubstring(str, substring){
    if(str.indexOf(substring) != -1){
        return true;
    }else{
        return false;
    }
}
alert(containsSubstring("Hello World!", "Hello"));
function reverseString(str){
    let row = '';
    for(i = str.length - 1;i >= 0;i--){
        row += str[i];
    }
    return row;
}
alert(reverseString("Hello"));
function removeSpaces(str){
    return str.trim();
}
alert(removeSpaces("   Hello   "));
function countVowels(str){
    let counter = 0;
    let nstr = str.toLowerCase();
    for(let i = str.length - 1;i >= 0;i--){
        if(nstr[i] == 'а' || nstr[i] == 'е' || nstr[i] == 'ё' || nstr[i] == 'и' || nstr[i] == 'о' || nstr[i] == 'у' || nstr[i] == 'ы' || nstr[i] == 'э' || nstr[i] == 'ю' || nstr[i] == 'я' || nstr[i] == 'o' || nstr[i] == 'i' || nstr[i] == 'u' || nstr[i] == 'y' || nstr[i] == 'e' || nstr[i] == 'a'){
            counter++
        }
    }
    return counter;
}
alert(countVowels("Привет"));
function replaceCharacter(str,char,nchar){
    return str.replace(char, nchar);
}
alert(replaceCharacter("Привет", "П", "Д"));
function textDetective(text){
    console.log("АНАЛИЗ ТЕКСТА:");
    console.log(`Текст: ${text}`);
    console.log("Отчет:");
    console.log(`Всего символов: ${text.trim().length}`);
    let str = text.split(" ");
    let max = '';
    for(let i = 0;i < str.length;i++){
        if(str[i].length>max.length){
            max = str[i]
        }
    }
    console.log(`Самое длинное слово: ${max}`);
    console.log(`Количество гласных букв: ${countVowels(text)}`)
    console.log(`Цифры в тексте: ${/\d/.test(text) ? "Да" : "Нет"}`);
    console.log(`Зашифрованное сообщение: ${reverseString(text)}`);
}
textDetective("Hello world 1234");
