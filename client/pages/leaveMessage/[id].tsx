import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Nav from '../../components/Nav';
import BauIcon from '../../components/BauIcon';
import Box from '@mui/material/Box'

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function LeaveMessage({ userList, quizList, solverList }) {
    const router = useRouter();

    const [quizNickname, setQuizNickname] = useState(null);
    const [quizCode, setQuizCode] = useState(null);
    const [quizScore, setQuizScore] = useState(null);
    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        setQuizNickname(JSON.parse(localStorage.getItem('quizNickname')))
        setQuizCode(JSON.parse(localStorage.getItem('quizCode')))
        setQuizScore(JSON.parse(localStorage.getItem('quizScore')))
        setIsUser(JSON.parse(localStorage.getItem('isUser')))
    }, [])

    console.log(userList, quizList, solverList)

    let patterns = new Array(12).fill()
        .map((e) => Math.floor(Math.random() * 5));

    const [firstInput, setFirstInput] = useState(false);

    // nickname : string, score : string ('4/13'), message : string
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const solverResult = {
            info: [{
                nickname: quizNickname,
                color: Math.floor(Math.random() * 4),
                order: Math.floor(Math.random() * 12)
            }],
            quizCode: quizCode,
            message: data.get('message'),
            score: quizScore,
            quizLen: quizList[0].quizLen
        }

        axios.post(LOCAL_SERVER_URL + '/api/solvers/saveSolver', solverResult)
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

    return (
        <>
            <Nav isUser={isUser} />
            <h1>LeaveMessage</h1>
        </>
        // <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
        //     <Nav isUser={isUser} />
        //     <div style={{
        //         fontSize: '1.25em',
        //         fontWeight: '600',
        //         position: 'absolute',
        //         top: '3.5em'
        //     }}>COLOR YOURS</div>
        //     <div style={{
        //         fontSize: '1em',
        //         fontWeight: '600',
        //         letterSpacing: '0.25em',
        //         position: 'absolute',
        //         top: '7em'
        //     }}>{`${quizScore}/${quizList[0].quizLen}`}</div>
        //     <div className="msgUsername">{userList[0].firstName}</div>
        //     <div>
        //         <div className={'msgBlock bigInput ' + (firstInput ? '' : 'hidden')}>
        //             <div>
        //                 <div className='msgNick'>{quizNickname}</div>
        //                 <div className='msgScore'>{quizScore + '/' + quizList[0].quizLen}</div>
        //             </div>
        //             <div>
        //                 <Box
        //                     component="form"
        //                     noValidate
        //                     onSubmit={handleSubmit}
        //                     sx={{
        //                         width: '100%',
        //                         flexDirection: 'column',
        //                         alignItems: 'center',
        //                         display: 'flex'
        //                     }}>
        //                     <textarea
        //                         margin="normal"
        //                         id="message"
        //                         name="message"
        //                         label="Message"
        //                         className="msgInput"
        //                     />
        //                     <button
        //                         type="submit"
        //                         className="msgSave"
        //                     >
        //                         SAVE
        //                     </button>
        //                 </Box>
        //             </div>
        //         </div>
        //         <div className='msgGrid'>
        //             {patterns.map((pattern, idx) => (
        //                 <BauIcon
        //                     key={idx}
        //                     idx={idx}
        //                     patternNum={pattern}
        //                     rotate={(idx * 7) % 4}
        //                     colorNum={(idx * 17) % 4}
        //                     nickname={idx % 2 ? quizNickname : ''}
        //                     score={quizScore}
        //                     totScore={quizList[0].quizLen}
        //                 />
        //             ))}
        //         </div>
        //     </div>
        // </Box >
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
    const resUser = await axios.post(LOCAL_SERVER_URL + '/api/users/getUsers', null)
    const userList = resUser.data.users.filter((user) => user.quizCode === params.id);

    const resQuiz = await axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
    const quizList = resQuiz.data.quizzes.filter((quiz) => quiz.quizCode === params.id);

    const resSolver = await axios.post(LOCAL_SERVER_URL + '/api/solvers/getSolver', null)

    const solverList = resSolver.data.solvers.filter((solver) => solver.quizCode === params.id)

    return {
        props: {
            userList,
            quizList,
            solverList
        }
    }
}