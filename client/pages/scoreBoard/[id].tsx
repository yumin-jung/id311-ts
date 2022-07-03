import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Score from '../../components/Score';
import Message from '../../components/Message';
import Quiz from '../../components/Quiz';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Nav from '../../components/Nav';
import BauIcon from '../../components/BauIcon';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';
let patterns;
let scoreList = [];
let msgList = [];

export default function ScoreBoard() {

    // Check rendering
    const [isRenderScore, setIsRenderScore] = useState(false);
    const [isRenderMsg, setIsRenderMsg] = useState(false);

    // Get score and message data from DB when render
    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizListAll = response.data.quiz.map((quiz) => {
                        return { quizCode: quiz.quizCode, patterns: quiz.patterns };
                    })
                    patterns = quizListAll.filter((quiz) => quiz.quizCode == quizCode).patterns;
                }
            })
        axios.post(DEPLOY_SERVER_URL + '/api/scores/getScore', null)
            .then(response => {
                if (response.data.success) {
                    const scoreListAll = response.data.scores.map((score) => {
                        return { quizCode: score.quizCode, nickname: score.nickname, score: score.score, quizLen: score.quizLen };
                    })
                    const scoreListFilter = scoreListAll.filter((score) => score.quizCode == quizCode)
                    scoreListFilter.sort(function compare(a, b) {
                        return b.score - a.score;
                    });
                    scoreList = scoreListFilter.slice(0, 8);
                    setIsRenderScore(true)
                }
                else {
                    alert('Failed to get scores');
                }
            })
        axios.post(DEPLOY_SERVER_URL + '/api/messages/getMessage', null)
            .then(response => {
                if (response.data.success) {
                    const msgListAll = response.data.messages.map((msg) => {
                        return { quizCode: msg.quizCode, nickname: msg.solver.nickname, color: msg.solver.color, order: msg.solver.order, message: msg.message };
                    })
                    msgList = msgListAll.filter((msg) => msg.quizCode == quizCode)
                    setIsRenderMsg(true)
                }
                else {
                    alert('Failed to get msgs');
                }
            })
    }, []);


    return (
        <>
            <div className='msgGrid'>
                {patterns.map((pattern, idx) =>
                    <BauIcon key={idx} patternNum={pattern} />
                )}
            </div>
            <Box sx={{ width: '100%' }} >
                <Grid container
                    spacing={10}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginTop: 5, display: { xs: 'none', md: 'flex' } }}>
                    <Grid item xs={12}
                        container
                        justifyContent="center"
                        alignItems="center">
                        <Box
                            sx={{
                                width: '40%',
                                bgcolor: '#f8f8f8',
                                boxShadow: 8,
                                borderRadius: 4,
                                p: 2,
                                minWidth: 400,
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Quiz />
                        </Box>
                    </Grid>
                    <Grid item xs={5}
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Box
                            sx={{
                                width: '100%',
                                bgcolor: '#f8f8f8',
                                boxShadow: 8,
                                borderRadius: 4,
                                p: 2,
                                minWidth: 360,
                                marginTop: '5%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Score Board
                            </Typography>
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {scoreList.map((score, idx) =>
                                    <Score key={idx} value={idx + 1} userName={score.nickname} score={score.score} quizLen={score.quizLen} />
                                )}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={5}
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Box
                            sx={{
                                width: '100%',
                                bgcolor: '#f8f8f8',
                                boxShadow: 8,
                                borderRadius: 4,
                                p: 2,
                                minWidth: 360,
                                marginTop: '5%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Messages
                            </Typography>
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {msgList.map((msg, idx) =>
                                    <Message key={idx} userName={msg.nickname} comment={msg.message} quizCode={quizCode} />
                                )}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginTop: 4, display: { xs: 'flex', md: 'none' } }}>
                    <Grid item xs={12}
                        container
                        justifyContent="center"
                        alignItems="center">
                        <Box
                            sx={{
                                width: '40%',
                                bgcolor: '#f8f8f8',
                                boxShadow: 8,
                                borderRadius: 4,
                                p: 2,
                                minWidth: 300,
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Quiz />
                        </Box>
                    </Grid>
                    <Grid item xs={12}
                        container
                        justifyContent="center"
                        alignItems="center">
                        <Box sx={{
                            width: '80%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: { xs: 'flex', md: 'none' }
                        }}
                        >
                            <Typography component="h1" variant="h5">
                                Score Board
                            </Typography>
                            <List sx={{ width: '80%', maxWidth: 360 }}>
                                {scoreList.map((score, idx) =>
                                    <Score key={idx} value={idx + 1} userName={score.nickname} score={score.score} quizLen={score.quizLen} />
                                )}
                            </List>
                        </Box>
                        <Box
                            sx={{
                                width: '80%',
                                bgcolor: '#f8f8f8',
                                boxShadow: 8,
                                borderRadius: 4,
                                p: 2,
                                minWidth: 360,
                                marginTop: '8%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                display: { xs: 'flex', md: 'none' }
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Messages
                            </Typography>
                            <List sx={{ width: '80%', maxWidth: 360 }}>
                                {msgList.map((msg, idx) =>
                                    <Message key={idx} userName={msg.nickname} comment={msg.message} quizCode={quizCode} />
                                )}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}