import React from 'react';
import {NumberField} from 'react-admin';
import _ from 'lodash';

const colored = WrappedComponent => {
  const Colored = props => {
    const amount = _.get(props.record, props.source);
    return amount < 0 ? (
      <span style={{color: 'red'}}>
                <WrappedComponent {...props} />
            </span>
    ) : (
      <span style={{color: 'green'}}>
        <WrappedComponent {...props} />
      </span>
    );
  }

  Colored.displayName = `Colored(${WrappedComponent.displayName})`;

  return Colored;
};

const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
