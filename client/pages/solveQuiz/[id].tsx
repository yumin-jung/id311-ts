import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container } from '@mui/system';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function SolveQuiz({ quizFilterFromDB }) {
    const router = useRouter();

    const [quizList, setQuizList] = useState(null);
    const [thisQuiz, setQuiz] = useState(null);
    const [selected, setSelection] = useState(-1);
    const [idx, setIdx] = useState(1);
    const [quizScore, setQuizScore] = useState(0);

    const [quizNickname, setQuizNickname] = useState(null);
    const [quizCode, setQuizCode] = useState(null);


    useEffect(() => {
        setQuizNickname(JSON.parse(localStorage.getItem('quizNickname')))
        setQuizCode(JSON.parse(localStorage.getItem('quizCode')))
        setQuizList(quizFilterFromDB);
        setQuiz(quizFilterFromDB[0]);
    }, [])


    console.log(quizFilterFromDB)

    if (quizList === null) {
        return null;
    }
    else if (thisQuiz === null) {
        return null;
    }

    // Go to next quiz
    const NextQuiz = () => {
        if (idx >= quizList.length) {

            const scoreInfo = {
                quizCode: quizCode,
                nickname: quizNickname,
                score: quizScore,
                quizLen: quizList.length
            };

            // Save score in localStorage
            localStorage.setItem("quizScore", JSON.stringify(quizScore));

            // Go to leave message page
            router.push({
                pathname: '/leaveMessage/[id]',
                query: { id: quizCode },
            })
        }
        else {
            // Set next quiz
            if (selected == thisQuiz.selected) setQuizScore(quizScore + 1);
            setIdx(idx + 1);
            setQuiz(quizList[idx]);
            setSelection(-1);
        }
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
            height="100vh"
            className={
                idx % 4 == 0 ? 'themeYellow' : (idx % 4 == 1 ? 'themeRed' : (idx % 4 == 2 ? 'themeBlue' : 'themeBlack'))
            }>
            <style jsx global>{`
                body {
                    background: #EEDFCC;
                    align-items: flex-start;
                }
                `}</style>
            <Box
                sx={{
                    minWidth: 350,
                    width: '90%',
                    height: '100%'
                }}
            >
                <Box
                    width="100%"
                    sx={{
                        margin: '8em auto',
                    }}
                >
                    <div className='stateBar'>
                        <div className='solvedBar' style={{
                            width: ((idx) / (quizList.length + 1) * 100) + '%'
                        }}></div>
                    </div>
                    <Typography variant="h6" className='question'>
                        {thisQuiz.question}
                    </Typography>
                </Box>
                <Box
                    component="main"
                    className='optionBoxFixed'
                    sx={{ position: 'absolute', pb: '0' }}
                >

                    {thisQuiz.options.map((value, idx) => (
                        <Stack key={idx} direction="row" spacing={0}>
                            <button className={(selected == idx ? "selectedOpt" : "") + " qOption"}
                                onClick={() => { setSelection(idx) }}>
                                {value}
                            </button>
                        </Stack>
                    ))}
                    <div>
                        <div className='qOption' style={{ height: '0' }}></div>
                        <button
                            onClick={NextQuiz}
                            className={(selected > -1 ? 'somethingSelected' : '') + ' rightArrow rightArrowQuiz'}
                        ></button>
                    </div>
                </Box>

            </Box>
        </Container>
    )
}

export async function getStaticPaths() {
    const res = await axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
    const paths = res.data.quizzes.map((quiz) => {
        return {
            params: {
                id: `${quiz.quizCode}`
            }
        }
    })
    return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {
    const res = await axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
    const quizListDB = res.data.quizzes
    const quizFilterFromDB = quizListDB
        .filter((quiz) => quiz.quizCode == params.id)
        .map((quiz) => { return quiz.quizBundle })
        .flat();
    return {
        props: {
            quizFilterFromDB
        }
    }
}