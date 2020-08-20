import React from "react";

export function Error(props) {  
    const validatorError = props.error;

    if ((typeof validatorError) == "string") {
        return (<p>{validatorError}</p>); 
    }

    return (
        <div>
            {Object.keys(validatorError).map((item, key) => {  
                return (<p key={key}>{validatorError[item].message}</p>);  
            })}
        </div>
    );
}  
