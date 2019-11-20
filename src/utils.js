import React from 'react';

const cached = {};
export const createFetcher = (promiseTask) => {
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then(res => {
      ref = res;
    });
    console.log(ref, '1');
    if (ref === cached) {
      throw task;
    }
    console.log(ref, '2');
    return ref;
  }
}

export class Placeholder extends React.Component {
  state = {
    promise: null
  };

  componentDidCatch(e) {
    if (e instanceof Promise) {
      this.setState({
        promise: e
      }, () => {
        e.then(() => {
          this.setState({ promise: null });
        });
      });
    }
  }
  render() {
    const { fallback, children } = this.props
    const { promise } = this.state
    return <>
      { promise ? fallback : children }
    </>
  }
}


// export class Base extends React.Component {

//   state = { error: false };

//   componentDidMount() {
//     this._mounted = true;
//   }
//   componentDidCatch(error) {
//     if (this._mounted) {
//       if (typeof error.then === 'function') {
//         this.setState({ error: true });
//         error.then(() => {
//           if (this._mounted) {
//             this.setState({ error: false });
//           }
//         })
//       }
//     }
//   }
//   componentWillUnmount() {
//     console.log('unm');
//     this._mounted = false;
//   }
// }

// export class Placeholder extends Base {
//   render () {
//     const { children } = this.props;
//     const { error } = this.state;
//     return error ? '加载数据中，请稍后...' : children;
//   }
// }

