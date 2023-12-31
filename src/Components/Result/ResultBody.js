import * as React from 'react';
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";

import { Body } from '../Body';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// TODO:
// I should check if the spreadsheet was created and then and only then 
// go for /navigateToNext

function ResultBodyContent({ data }) {

    const navigate = useNavigate();

    function navigateToNext() {
        if (data.scrapedData) {
            delete data.scrapedData;
        }

        delete data.success;

        navigate(data.next, {
            state: {
                data: data,
            }
        });
    }

    let nationality, eqNames, moreThanOneEquivalent;

    if (data.next == "/spreadsheet") {
        data.scrapedData.equivalent = data.scrapedData.equivalent;
        nationality = data.scrapedData.equivalent.substring(0, data.scrapedData.equivalent.indexOf(" "));;
        eqNames = data.scrapedData.equivalent.substring(data.scrapedData.equivalent.lastIndexOf(" "), data.scrapedData.equivalent.length);
        if (eqNames.indexOf(",") > -1) {
            moreThanOneEquivalent = true;
        }
    }
    return (
        <Fragment>
            <Box width={"80%"}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            According to <a href={`https://www.behindthename.com/name/${data.name}`}>behindthename.com</a>:                                        </Typography>
                        <Typography variant="h5" component="div">
                            {data.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {data.scrapedData && data.scrapedData.nameData ? data.scrapedData.nameData : "Tried to scrape data about your name could not find any!"}
                        </Typography>
                        <Typography variant="body2">
                            {eqNames && `The ${nationality} equivalent ${moreThanOneEquivalent ? "s" : ""} of your name ${moreThanOneEquivalent ? "are:" : "is:"}`}
                            {eqNames && <span className='leBleu'> {`${eqNames}`}</span>}
                        </Typography>
                    </CardContent>
                </Card>
                <br />
            </Box>
   
                <Button onClick={navigateToNext} variant="contained">Continue to {data.next}!</Button>
            
        </Fragment>
    )

}
export function ResultBody({ data }) {
    return (
        <Body>
            <ResultBodyContent data={data} />
        </Body>
    )
}