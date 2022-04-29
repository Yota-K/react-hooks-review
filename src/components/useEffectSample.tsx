import React, { useEffect, useState } from 'react';

const Counter2: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const countUp = () => setCounter(counter+ 1);
  const countDown = () => setCounter(counter - 1);

  const [counterSecond, setCounterSecond] = useState(0);

  // Sample1
  // レンダリングされたタイミングで処理を実行する
  // レンダリングされるたびにconsole.log('レンダーされました。');が実行される。
  // componentDidMount、componentDidUpdate、componentWillUnmountを全指定したようなイメージ。
  useEffect(() => {
    console.log('useEffectSampleがレンダーされました。');

    // 第2引数に何も渡さない状態でstateを変更すると無限ループを引き起こす。
    //
    // 1, コンポーネントがレンダリングされた時にstateが変更される
    // 2, stateが変更されたことによってCounter2というコンポーネントが再度レンダリングされる
    // 3, 再レンダリングされたコンポーネントの中でまたstateが変更される（1に戻る）
    //
    // というループに陥るから。
    // setCounter(counter + 1);

    return () => {
      // clean up処理を記述する。
      console.log('クリーンアップします。');
    };
  });

  // Sample2
  // componentDidMount時 + componentDidUpdate時に処理を実行する
  // 以下のコードだとstate counterの値が変化した時のみ再レンダリングが実行される
  // counterSecondが変化した時は再レンダリングは実行されない
  // useEffect(() => {
  //   console.log(`counter: ${counter}`);
  // }, [counter])

  // Sample3
  // useEffectで再レンダーされた場合に実行する処理を記述する。
  // useEffect(() => {
  //   console.log('レンダーされました。');
  // 
  //   const title = document.getElementById('title');
  //   if (title) {
  //     title.innerHTML = `タイトル：${counter}`;
  //   }
  // 
  //   return () => {
  //     // clean up処理を記述する。
  //     console.log('クリーンアップします。');
  //   };
  // }, [counter]);

  return (
    <>
      <h2 id="title">タイトル：初期</h2>
      <div>
        <p>counterは{counter}です。</p>
        <button onClick={countUp}>+1</button>
        <button onClick={countDown}>-1</button>
      </div>
      <div>
        <p>counterSecondは{counterSecond}です。</p>
        <button onClick={() => setCounterSecond(counterSecond + 1)}>+1</button>
        <button onClick={() => setCounterSecond(counterSecond - 1)}>-1</button>
      </div>
      <div className='line'></div>
    </>
  )
}

export default Counter2
