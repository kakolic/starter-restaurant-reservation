import React from "react"
import {useState} from "react"
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableError from "./TableError";
import { today } from "../utils/date-time";

function TableForm(){
    const history = useHistory();
    const initialState = {
        "table_name": "",
        "capacity": ""
    }

    const [table, setTable] = useState(initialState);
    function changeHandler({ target: { name, value } }) {
      setTable((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    function changeHandlerNum({ target: { name, value } }) {
      setTable((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }

    const [error, setError] = useState(null);

    function submitHandler(event){
        event.preventDefault();
        event.stopPropagation();
        setError(null);

        createTable(table)
           .then(() => {
             history.push(`/dashboard?date=${today()}`);
           })
           .catch(setError);
    }

    return (
        <form onSubmit={submitHandler}>
            <TableError errors={error} />
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Table name:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="table_name" minLength={2} required={true} value={table.table_name} onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Capacity:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="capacity" type="number" min={1} required={true} value={table.capacity} onChange={changeHandlerNum} />
                </div>
            </div>
            <button className="btn btn-success mr-2 mb-2" type="submit">Submit</button>
            <button className="btn btn-secondary mb-2" type="button" onClick={() => history.goBack()}>Cancel</button>
        </form>
    )
}

export default TableForm;