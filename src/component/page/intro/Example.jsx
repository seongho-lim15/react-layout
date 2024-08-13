// ParentComponent.js
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [parentState, setParentState] = useState('Hello from Parent');

  return (
    <div>
      <ChildComponent childState={parentState} />
    </div>
  );
}

// ChildComponent.js
import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <p>{props.childState}</p>
    </div>
  );
}
//SquareButton State? :