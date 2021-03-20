const regexp = new RegExp(/^[+,-]?([1-9]\d*|0)$/);
const fizzBuzzForm = document.getElementById(
  "implementation"
) as HTMLInputElement;

fizzBuzzForm.onclick = function FizzBuzz() {
  const result = document.getElementById("result") as HTMLInputElement;
  const fizz = document.getElementById("fizz") as HTMLInputElement;
  const fizzNum: number | string = fizz.value;
  const buzz = document.getElementById("buzz") as HTMLInputElement;
  const buzzNum: number | string = buzz.value;
  const resultArray: string[] = [];
  const resultText: string[] = [];

  if (!regexp.exec(fizzNum) || !regexp.exec(buzzNum)) {
    result.textContent = "整数値を入力してください";
  } else {
    for (let i = 1; i < 100; i += 1) {
      if (i % Number(fizzNum) === 0 && i % Number(buzzNum) === 0) {
        resultArray.push(`FizzBuzz ${i}`);
      } else if (i % Number(fizzNum) === 0) {
        resultArray.push(`Fizz ${i}`);
      } else if (i % Number(buzzNum) === 0) {
        resultArray.push(`Buzz ${i}`);
      }
    }
    resultArray.forEach((v) => {
      resultText.push(`${v}<br>`);
    });
    result.innerHTML = resultText.join("");
  }
};
