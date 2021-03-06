import React from 'react'
const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) =>  {
    return (
    <svg
        className={`${className} icon`}
        {...restProps}
    >
        <use xlinkHref={`#${type.id || type.default.id}`} /> {/* svg-sprite-loader@0.3.x */}
        {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@latest */}
    </svg>
);}
export default CustomIcon
