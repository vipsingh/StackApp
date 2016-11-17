import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

/**
 * Use any component as read-only Input, labeled just like other Inputs.
 *
 * Useful to use a Field in the Edit or Create components.
 * The child component will receive the current record.
 *
 * @example
 * <Labeled label="Comments">
 *     <FooComponent source="title" />
 * </Labeled>
 */
const Labeled = ({ children, ...props }) => (
    <TextField
        floatingLabelText={props.floatingLabelText}        
        style={{ paddingTop: '2em', height: 'auto' }}
    >
        {children && React.cloneElement(children, { ...props })}
    </TextField>
);

Labeled.propTypes = {
    children: PropTypes.element,
};

export default Labeled;
