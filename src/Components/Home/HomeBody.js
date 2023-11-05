import * as React from 'react';
import { Body } from '../Body';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import { MyAlert } from '../MyAlert';
import { useNavigate } from "react-router-dom";

function HomeBodyBody() {

    const [emptyUsernameAlert, setAlert] = React.useState(false);
    const navigate = useNavigate();

    function handleTextInputChange() {
        if (emptyUsernameAlert) {
            setAlert(false);
        }
    }
    function processInput() {
        const name = document.getElementById('userName').value;
        if (!name || name.length == 0) {
            setAlert(true)
        }
        else {
            console.log(process.env.REACT_APP_BACKEND_SERVER);
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
                    console.log(data);
                    navigate(`/Result`, {
                        state: {
                            data: data,
                        }
                    });
                    return (data ? JSON.parse(data) : {})
                })
                .catch((err) => {
                    console.log("error!->", err.message);
                });
        }
    }
    var height = 80;

    return (

        <div className="App-Body">
            <FormControl>
                <Box width={350}>
                    <TextField style={{ height }} onChange={handleTextInputChange} fullWidth rows={30} id="userName" size="big" label="Enter name" variant="outlined" />
                </Box>
                <Button variant="contained" onClick={processInput}>submit</Button>
                <br />
                {emptyUsernameAlert ? <MyAlert severity="error" message="You must input something!" /> : ""}

            </FormControl>

        </div>
    )

}
export function HomeBody() {
    return (
        <Body bodyBody={<HomeBodyBody />} />
    )
}