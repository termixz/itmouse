const ship = "Галактика-1";
const crewCount = 4;
const fuel = 87.5;
const isEngineWorking = true;
const alienContact = null;
const unknownSignal = undefined;

console.log("=== 🚀 КОСМИЧЕСКОЕ ПРИКЛЮЧЕНИЕ ===");
console.log("👨‍🚀 Космонавт докладывает:");
console.log(`Название корабля: ${ship} - тип: ${typeof ship}`);
console.log(`Членов экипажа: ${crewCount} - тип: ${typeof crewCount}`);
console.log(`Уровень топлива: ${fuel} - тип: ${typeof fuel}`);
console.log(`Двигатель работает: ${isEngineWorking} - тип: ${typeof isEngineWorking}`);
console.log(`Контакт с инопланетянами: ${alienContact} - тип: ${typeof alienContact}`);
console.log(`Неизвестный сигнал: ${unknownSignal} - тип: ${typeof unknownSignal}`);
