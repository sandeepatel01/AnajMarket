import React from 'react';

const Message = ({ variant, children }) => {
    let alertClasses = 'px-4 py-2 rounded-lg';
    if (variant === 'info') {
        alertClasses += ' bg-blue-100 text-blue-900';
    } else if (variant === 'success') {
        alertClasses += ' bg-green-100 text-green-900';
    } else if (variant === 'warning') {
        alertClasses += ' bg-yellow-100 text-yellow-900';
    } else if (variant === 'danger') {
        alertClasses += ' bg-red-100 text-red-900';
    }

    return (
        <div className={alertClasses}>
            {children}
        </div>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
