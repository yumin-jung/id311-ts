import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

const Message = ({ userName, comment, quizCode }) => {
    const router = useRouter();

    // Delete message
    const deleteMessage = (event) => {
        event.preventDefault();

        const msgInfo = {
            nickname: userName,
            message: comment
        }

        // Delete message from DB
        axios.post(DEPLOY_SERVER_URL + '/api/messages/deleteMessage', msgInfo)
            .then(response => {
                if (response.data.success) {
                    router.push('/');
                } else {
                    alert('Failed to delete message')
                }
            })
    }

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteMessage}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton role={undefined} dense>
                <ListItemText primary={`${userName}`} />
                <ListItemText primary={`${comment}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default Message