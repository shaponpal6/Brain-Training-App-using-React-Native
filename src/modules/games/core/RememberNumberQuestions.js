import { randomIntegerArray } from './Common';

//Algoritham 1:  Array.from({length: 5}, (v, i) => i*12);
//const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

export const makeRandomNumberQuestions = (del = 1, length = 1) =>
  Array.from({ length }, () => randomIntegerArray(del)).map(
    (question, index) => ({
      id: index + 1,
      question,
      answer: question,
      desc: '',
      type: 'reminder',
      subType: 'algorithm0',
      box: del,
      ref: '',
      options: '',
    }),
  );
export const makeAlgorithamQuestions = (del = 1, length = 1) =>
  Array.from({ length }, () => randomIntegerArray(del)).map(
    (question, index) => ({
      id: index + 1,
      question,
      answer: question
        .slice(0, -1)
        .map((item, index) => item + question[index + 1]),
      desc: '',
      type: 'reminder',
      subType: 'algorithm1',
      box: del - 1,
      ref: '',
      options: '',
    }),
  );
