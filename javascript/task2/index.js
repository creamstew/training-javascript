const regexp = new RegExp(/^[+,-]?([1-9]\d*|0)$/);

document.getElementById('implementation').onclick = function FizzBuzz() {
  const result = document.getElementById('result');
  const fizzNum = document.getElementById('fizz').value;
  const buzzNum = document.getElementById('buzz').value;
  const resultArray = [];
  const resultText = [];

  if (!regexp.exec(fizzNum) || !regexp.exec(buzzNum)) {
    result.textContent = '整数値を入力してください';
  } else {
    for (let i = 1; i < 100; i += 1) {
      if (i % fizzNum === 0 && i % buzzNum === 0) {
        resultArray.push(`FizzBuzz ${i}`);
      } else if (i % fizzNum === 0) {
        resultArray.push(`Fizz ${i}`);
      } else if (i % buzzNum === 0) {
        resultArray.push(`Buzz ${i}`);
      }
    }
    resultArray.forEach((v) => {
      resultText.push(`${v}<br>`);
    });
    result.innerHTML = resultText.join('');
  }
};
