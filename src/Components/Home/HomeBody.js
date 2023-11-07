import * as React from 'react';
import { Body } from '../Body';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import { MyAlert } from '../MyAlert';
import { useNavigate } from "react-router-dom";

function HomeBodyContent() {

    const [errorAlert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const navigate = useNavigate();

    function handleTextInputChange() {
        if (errorAlert) {
            setAlert(false);
        }
    }
    function processInput() {
        const name = document.getElementById('userName').value;
        if (!name || name.length === 0) {
            setAlertMessage("You must input something!");
            setAlert(true)
        }
        else {
            let validNameRegex = /^[a-zA-Zéíóú\s]+$/;
            if (!validNameRegex.test(name)) {
                setAlertMessage("Names cannot contain numbers or weird characters.");
                setAlert(true)
                return;
            }

            var jsonData = {
                "name": name
            }

            fetch(process.env.REACT_APP_BACKEND_SERVER, {  // Enter your IP address here
                method: 'post',
                mode: 'cors',
                body: JSON.stringify(jsonData), // body data type must match "Content-Type" header
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log("received->", data);
                    navigate(`/result`, {
                        state: {
                            data: data,
                        }
                    });
                    return (data ? JSON.parse(data) : {})
                })
                .catch((err) => {
                    setAlertMessage(err.message);
                    setAlert(true)
                });
        }
    }
    var height = 80;

    return (

        <div className="App-Body">
            <FormControl>
                <Box width={350}>
                    <TextField style={{ height }} onChange={handleTextInputChange} fullWidth rows={30} id="userName" size="big" label="Enter your first name" variant="outlined" />
                </Box>
                <Button variant="contained" onClick={processInput}>submit</Button>
                <br />
                {errorAlert ? <MyAlert severity="error" message={alertMessage} /> : ""}

            </FormControl>

        </div>
    )

}
export function HomeBody() {
    return (
        <Body bodyContent={<HomeBodyContent />} />
    )
}