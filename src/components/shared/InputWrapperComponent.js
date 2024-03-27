"use client";
import { forwardRef } from 'react';
const InputWrapperComponent = forwardRef(({ errors, ...props }, ref) => (
	<div className="registerField">
	  <input ref={ref} {...props} />
	  <span className="registerError">{errors}</span>
	</div>
  ));
  export default InputWrapperComponent;

  
 
