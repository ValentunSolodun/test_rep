import React from 'react';
import { NumberField } from 'react-admin';

const colored = WrappedComponent => {
  const Colored = props =>
    props.record[props.source] < 0 ? (
      <span style={{ color: 'red' }}>
                <WrappedComponent {...props} />
            </span>
    ) : (
      <span style={{ color: 'green' }}>
        <WrappedComponent {...props} />
      </span>
    );

  Colored.displayName = `Colored(${WrappedComponent.displayName})`;

  return Colored;
};

const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
