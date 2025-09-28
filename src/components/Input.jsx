import React, { useId } from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()
    return  (   
    <div className='w-full'>
        {
            label&&(
                <label htmlFor={id} className='inline-block mb-1 pl-1'>
                    {label} 
                </label>
            )
        }
        <input
            id={id}
            type={type}
            ref={ref}
            
            className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            {...props}
        />

    </div>
    )
})

export default Input
