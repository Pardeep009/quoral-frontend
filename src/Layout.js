import React from 'react';

const layout = (props) => {
    return (
        <div className="row mainPage">
            <div className="col-sm-4">

            </div>
            <div className="col-sm-4">
                {props.children}
            </div>
            <div className="col-sm-4">

            </div>
        </div>
    )
}

export default layout;