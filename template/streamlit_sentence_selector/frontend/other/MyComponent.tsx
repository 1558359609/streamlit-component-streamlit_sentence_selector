import {
    Streamlit,
    StreamlitComponentBase,
    withStreamlitConnection,
} from "streamlit-component-lib"
import React, {ReactNode} from "react"
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";
import '../src/style.css';

import {Grid} from "@mui/material";
// import DoneIcon from '@mui/icons-material/Done';
// import DeleteIcon from '@mui/icons-material/Delete';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const test_style = {
    background: ' lightyellow',
  "&:hover": {
            background: 'lightblue',
            padding: '3px',
        }
}
class SentencesClickLabel extends StreamlitComponentBase<any> {
    public state = {is_clicked: false}

    private handleClick = (e: string): void => {
        // console.info('You clicked the Chip.' + content);
        this.setState(
            // prevStatea=>({preState: !prevState.is_clicked}),
            () => Streamlit.setComponentValue(e),
        )
    };

    public render = (): ReactNode => {
        var items: string[];
        items = this.props.args["sentences"]
        return (
            <Stack direction="row" spacing={0} sx={{
                display: 'inline',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                bgcolor: 'background.paper',
                maxWidth: "wrap",
                height: "wrap",
            }}>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                }}>
                    {items.map((item, index) => {
                            return (
                                <Chip
                                    label={item}
                                    onClick={this.handleClick.bind(this, item)}
                                    variant="outlined"
                                    size="small"
                                    className={'test_style'}
                                    // style={test_style}
                                    sx={{
                                        maxWidth: "wrap",
                                        borderRadius: 1,
                                        mb: 0.5,
                                        mr: 0.2,
                                    }}
                                />
                            )
                        }
                    )}</Box>
            </Stack>
        );
    }
}

export default withStreamlitConnection(SentencesClickLabel)
