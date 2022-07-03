import * as React from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { Box } from '@mui/system';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';

const InputBox = ({ idx, message, isLeavingMsg, resultNick, score, totScore, msgColor, quizCode }) => {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const solverResult = {
            info: [{ nickname: resultNick, color: msgColor, order: idx }],
            quizCode: quizCode,
            message: data.get('message'),
            score: score,
            quizLen: totScore
        }
        console.log(solverResult);

        axios.post(DEPLOY_SERVER_URL + '/api/solvers/saveSolver', solverResult)
            .then(response => {
                if (response.data.success) {
                    // Go to leave message page
                    router.push({
                        pathname: '/personalPage/[id]',
                        query: { id: quizCode },
                    })
                } else {
                    alert('Failed to save message')
                }
            });
    };

    if (isLeavingMsg) { // input창띄우기
        return (
            <>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                    <textarea
                        margin="normal"
                        id="message"
                        name="message"
                        label="Message"
                        className="msgInput"
                    />
                    <button
                        type="submit"
                        className="msgSave"
                    >
                        SAVE
                    </button>
                </Box>
            </>
        );
    } else { // 내용물창 띄우기
        return (
            <div className='msgMsg'>{message}</div>
        );
    }
}

export default InputBox