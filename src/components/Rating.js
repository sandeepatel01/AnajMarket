import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
    return (
        <div className='flex items-center'>
            {[...Array(5)].map((_, index) => (
                <span key={index}>
                    <i
                        style={{ color }}
                        className={`${value >= index + 1
                            ? 'fas'
                            : value >= index + 0.5
                                ? 'fas'
                                : 'far'
                            } fa-star`}
                    ></i>
                </span>
            ))}
            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825',
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Rating;
