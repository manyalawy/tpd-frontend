/**
 * The purpose of guard is to dispaly content base on an arbitrary condition
 *
 */

const Guard = (props) => {
    return props.condition ? props.children : null;
};

export default Guard;
