import React, { useState, Suspense, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { createFetcher, Placeholder } from './utils';
import { fetchSomethingApi } from './api';
import './App.css';

const getData = createFetcher(fetchSomethingApi);

const Data = () => (<h1>{getData()}</h1>);

function App () {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  return (
    <div className="app">
      <h1>Demo about React.Suspense</h1>
      <Button onClick={() => window.location.reload()}>清除缓存</Button>
      <div style={{ margin: 20, padding: 20, border: '1px solid #eee' }}>
        <h2># Suspense</h2>
        <Button onClick={() => setShowA(true)}>加载</Button>
        <Button onClick={() => setShowA(false)}>回退</Button>
        {showA && (
          <Suspense fallback={<Spin />}>
            <Data />
          </Suspense>
        )}
      </div>
      <div style={{ margin: 20, padding: 20, border: '1px solid #eee' }}>
        <h2># Placeholder</h2>
        <Button onClick={() => setShowB(true)}>加载</Button>
        <Button onClick={() => setShowB(false)}>回退</Button>
        {showB && (
          <Placeholder fallback={<Spin />}>
            <Data />
          </Placeholder>
        )}
      </div>
    </div>
  );
};


const cached = {};
const ErrComponent = () => {
  let ref = cached;
  const task = fetchSomethingApi();
  task.then(res => {
    ref = res;
  });
  console.log(ref, '1');
  if (ref === cached) {
    throw task;
  }
  console.log(ref, '2');
  return (
    <div>{ref}</div>
  )
}

function Test () {

  return (
    <Suspense fallback={<Spin />}>
      <ErrComponent />
    </Suspense>
  )
}

export default App;
