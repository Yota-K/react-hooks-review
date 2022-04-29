import React, { useState, useCallback } from 'react';

// タイトルコンポーネント（子）を定義する。
const Title: React.FC = () => {
  console.log('★Title component');
  return (
    <p>useCallBackの再レンダーを検証</p>
  )
};

// コンポーネントのメモ化を実施するとpropsが変化した時の再レンダリングを行うようにすることができる
const TitleMemo = React.memo(() => {
  console.log('★Title component');
  return (
    <p>useCallBackの再レンダーを検証</p>
  )
});

type Props = {
  name?: string;
  text?: string;
  doClick?: () => void;
  state?: number;
};

// ボタンコンポーネント（子）を定義する。
const Button: React.FC<Props> = (props) => {
  console.log('★Button component', props.name);
  return (
    <button onClick={ props.doClick }>{ props.name }</button>
  )
};

const ButtonMemo = React.memo<Props>((props) => {
  console.log('★Button component', props.name);
  return (
    <button onClick={ props.doClick }>{ props.name }</button>
  )
});

// カウンターコンポーネント（子）を定義する。
const CounterText: React.FC<Props> = (props) => {
  console.log('★Count child component', props.text);
  return (
    <p>{props.text}:{props.state}</p>
  )
};

const CounterTextMemo = React.memo<Props>((props) => {
  console.log('★Count child component', props.text);
  return (
    <p>{props.text}:{props.state}</p>
  )
});

const Counter4 = () => {
  const [firstCounter, setFirstCounter] = useState(0);
  const [secondCounter, setSecondCounter] = useState(100);

  // +1する関数を定義する。
  const coutUpFirstCounter = () => {
    setFirstCounter(firstCounter + 1);
  };

  // useCallbackを使って関数をメモ化すると代2引数に渡した依存する値が変化した時のみ再レンダリングされるようになる
  // 注意点: 再レンダリングを防止する際はuseCallbackだけでは不十分でコンポーネントのメモ化も一緒に行う必要がある
  const coutUpFirstCounterMemo = useCallback(() => {
    setFirstCounter(firstCounter + 1);
  }, [firstCounter])

  // +100する関数を定義する。
  const coutUpSecoundCounter = () => {
    setSecondCounter(secondCounter + 100);
  };

  const coutUpSecoundCounterMemo = useCallback(() => {
    setSecondCounter(secondCounter + 100);
  }, [secondCounter])

  return (
    <>
      <TitleMemo />
      <CounterTextMemo text="+1 ボタンによるカウント" state={ firstCounter }/>
      <CounterTextMemo text="+100 ボタンによるカウント" state={ secondCounter } />
      <ButtonMemo name="+1" doClick={ coutUpFirstCounterMemo }/>
      <ButtonMemo name="+100" doClick={ coutUpSecoundCounterMemo }/>
      <div className='line'></div>
    </>
  )
}

export default Counter4
