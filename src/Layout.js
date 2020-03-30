import React from 'react';

const layout = (props) => {
    return (
        <div className="row mainPage">
            <div className="col-sm-2">

            </div>
            <div className="col-sm-8">
                {props.children}
            </div>
            <div className="col-sm-2">

            </div>
        </div>
    )
}

export default layout;