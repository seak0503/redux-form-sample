import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function submit(values) {
  return sleep(1000).then(() => {
    throw new SubmissionError({
      name: "お名前はすでに存在します",
      tel: "電話番号はすでに存在します",
    })
  });
}