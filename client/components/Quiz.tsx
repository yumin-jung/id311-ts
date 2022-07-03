import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const Quiz = () => {
    const deleteComment = (event) => {
        console.log(event)
    }
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteComment}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton dense sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography alignItems='center' component="h1" variant="h5">
                    Quiz
                </Typography>
            </ListItemButton>
        </ListItem>
    );
}

export default Quiz