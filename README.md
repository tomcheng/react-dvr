# react-dvr

A higher order component that saves and loads props for easier development.

## Usage
```javascript
import React from "react";
import reactDvr from "react-dvr";

class MyComponent extends React.Component {
  ...
}

export reactDvr()(MyComponent)
```
