import React, { Fragment } from "react";
import ErrorAlert from "./ErrorAlert";

function ErrorList({errors}) {
    if (errors.length > 0) {
        return (
            <Fragment>
                {errors.map((error) => (
                <ErrorAlert key={error} error={error}/>))}
            </Fragment>
        )
    }
    return null;
}

export default ErrorList;