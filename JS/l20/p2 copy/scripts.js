const n = document.getElementById('next');
const p = document.getElementById('prev');
let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('ru', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  console.clear();
  console.log(`${monthName}`);
  console.log("===========================");
  
  let daysRow = "";
  for (let i = 1; i <= daysInMonth; i++) {
    daysRow += i + "\t";
    if (i % 7 === 0) daysRow += "\n";
  }
  
  console.log(daysRow);
  console.log("===========================");
  console.log(`Всего дней: ${daysInMonth}`);
}

p.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

n.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

function getMinutesUntil(dayOfMonth) {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
  const diffMs = targetDate - now;
  return Math.floor(diffMs / (1000 * 60));
}

function isHolydays(dayOfWeek) {
  return dayOfWeek == 0 || dayOfWeek == 6 || dayOfWeek == 'воскресение' || dayOfWeek == 'суббота';
}
