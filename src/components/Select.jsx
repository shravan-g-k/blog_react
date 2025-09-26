import React from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = React.useId()
    return (
        <div className='w-full'>
            {
                label && (
                    <label htmlFor={id} className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )
            }
            <select
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
             {...props} id={id} ref={ref}>{
                options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }</select>
        </div>
    )
}

export default React.forwardRef(Select)
