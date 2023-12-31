import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Header } from '../Header';
import { useEffect } from 'react';

function ResultHeaderBody({ data }) {

    useEffect(() => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = "Hello " + data.name;
        window.speechSynthesis.speak(msg);
    }, []);

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                Hello {data.name}!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Here's (hopefully) some information about your name...
            </Typography>
        </Box>
    )
}
export function ResultHeader({ data }) {
    return (
        <Header>
            <ResultHeaderBody data={data}/>
        </Header>
    )
}