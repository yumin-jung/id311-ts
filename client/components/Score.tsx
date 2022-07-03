import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const ScoreBoard = ({ value, userName, score, quizLen }) => {
    return (
        <ListItem
            secondaryAction={
                <ListItemText primary={`${score}/${quizLen}`} />
            }
            disablePadding
        >
            <ListItemButton role={undefined}>
                <ListItemText primary={`${value}`} />
                <ListItemText primary={`${userName}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default ScoreBoard