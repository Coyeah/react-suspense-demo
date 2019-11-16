# demo-react-suspense

学习 `React.Suspense` 的 Demo。

实现了 **让请求实现 `Lazy` 效果** & **模拟 Suspense**。

在 `Placeholder` 的实现中，会跑出异常：

```error
Warning: Placeholder: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.
```

然后触发 React.Suspense。待寻求原因。
