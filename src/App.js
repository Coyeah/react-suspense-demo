import React, { useState, Suspense } from 'react';
import { Spin, Button } from 'antd';
import { createFetcher, Placeholder } from './utils';
import { fetchSomethingApi } from './api';
import './App.css';

const getData = createFetcher(fetchSomethingApi);

const Data = () => (<h1>{getData()}</h1>);

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="app">
      <h1>Demo about React.Suspense</h1>
      <Button onClick={() => setShow(true)}>加载</Button>
      <Button onClick={() => setShow(false)}>回退</Button>
      <Button onClick={() => window.location.reload()}>清除缓存</Button>
      <div>
        {show && (
          <Suspense fallback={<Spin />}>
            <Data />
          </Suspense>
        )}
        {/* {show && (
          <Placeholder >
            <Data />
          </Placeholder>
        )} */}
      </div>
    </div>
  );
}

export default App;
