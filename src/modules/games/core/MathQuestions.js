export function generateMathQuestion(config) {
  // Length of number
  const size = config.hasOwnProperty('size') ? config.size : 1;

  // Generate Needle
  let needle = size => '1000000'.substring(0, size + 1);
  // Generate Random Number
  let random = () => Math.floor(Math.random() * needle(size)) || 1;

  // Tytpe of question
  const mathTypes = [
    { sign: '+', symbol: '+', type: 'sum' },
    { sign: '-', symbol: '-', type: 'subtraction' },
    { sign: '*', symbol: '×', type: 'multiplication' },
    { sign: '/', symbol: '÷', type: 'division' },
    // {sign: "Σ",symbol: "Σ", type:"summation"}
  ];

  // Select question Type
  const mathType = mathTypes[Math.floor(Math.random() * mathTypes.length)];

  let number1 = random(),
    number2 = random(),
    number3 = random(),
    number4 = random();

  // DESC Number
  if (mathType['type'] === 'subtraction') {
    number1 = number1 > number2 ? number1 : number2;
    number2 = number1 > number2 ? number2 : number1;
  } else if (mathType['type'] === 'division') {
    number1 = number1 * number2;
  }

  // Make Question
  let questionText = `What"s the ${mathType['type']} `;
  let question = `${number1} ${mathType['symbol']} ${number2} = ?`;

  let answer,
    opt1,
    opt2,
    opt3,
    opt4,
    opt5,
    opt6 = 0;

  // Make Answer and Question
  if (mathType['type'] === 'sum') {
    answer = number1 + number2;
    opt1 = number1 + number3;
    opt2 = number2 + number3;
    opt3 = number1 + number4;
    opt4 = number2 + number4;
    opt5 = number3 + number4;
    opt6 = number4 + number4;
  } else if (mathType['type'] === 'multiplication') {
    answer = number1 * number2;
    opt1 = number1 * number3;
    opt2 = number2 * number3;
    opt3 = number1 * number4;
    opt4 = number2 * number4;
    opt5 = number3 * number4;
    opt6 = number4 * number4;
  } else if (mathType['type'] === 'subtraction') {
    answer = number1 - number2;
    opt1 = random();
    opt2 = random();
    opt3 = random();
    opt4 = random();
    opt5 = random();
    opt6 = random();
  } else if (mathType['type'] === 'division') {
    answer = number1 / number2;
    opt1 = random();
    opt2 = random();
    opt3 = random();
    opt4 = random();
    opt5 = random();
    opt6 = random();
  }

  //Generate random string/characters for key
  let key = s =>
    Math.random()
      .toString(36)
      .substring(7) + s;
  let correct = { key: key(0), text: answer };

  // Make Unique option
  const options = [...new Set([opt1, opt2, opt3, opt4, opt5, opt6])]
    .filter(item => item !== answer)
    .map((opt, i) => {
      return { key: key(i + 1), text: opt };
    })
    .slice(0, 3)
    .concat([correct])
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);

  return {
    questionText,
    question,
    subType: mathType['type'],
    answer: correct, // insert answer in option with key
    options,
  };
}

export function makeMathQuestions(size = 1, length = 1) {
  const makeQuestions = (del, len) =>
    new Array(len)
      .fill({})
      .map((row, index) => {
        const q = generateMathQuestion({ size: del });
        return {
          id: index + 1,
          question: q.hasOwnProperty('question') ? q.question : '',
          desc: q.hasOwnProperty('questionText') ? q.questionText : '',
          type: 'math',
          subType: q.hasOwnProperty('subType') ? q.subType : '',
          box: del,
          ref: '',
          options: q.hasOwnProperty('options') ? q.options : [],
          answer: q.hasOwnProperty('answer') ? q.answer : {},
        };
      })
      .filter(item => {
        if (item.id < 1) return false;
        if (item.question.length < 4) return false;
        if (item.options instanceof Array && item.length < 2) return false;
        if (
          item.answer.constructor !== Object ||
          Object.keys(item.answer).length === 0
        )
          return false;
        return true;
      });

  // console.log(makeQuestions(2, 2));
  // console.log(questions);
  // const question = {
  //   id: 1,
  //   question: 'This is question 1',
  //   desc: 'This is question Desc',
  //   ref: 'This is question Ref',
  //   options: [
  //     { key: 'opt1', text: 'Option 1' },
  //     { key: 'opt2', text: 'Option 2' },
  //     { key: 'opt3', text: 'Option 3' },
  //     { key: 'opt4', text: 'Option 4' },
  //   ],
  //   answer: { key: 'opt1', text: 'Option 1' },
  // };

  return makeQuestions(size, length);
}
