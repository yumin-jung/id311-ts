import React, { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Container from '@mui/material/Container';
import Nav from '../../components/Nav';
import Logo from '../../components/Logo';
import BauIcon from '../../components/BauIcon';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function PersonalPage({ userList, quizList, solverList }) {
    const router = useRouter();

    const [color, setColor] = useState(0);

    const setColorBlack = () => {
        setColor(0);
    }
    const setColorBlue = () => {
        setColor(1);
    }
    const setColorYellow = () => {
        setColor(2);
    }
    const setColorRed = () => {
        setColor(3);
    }

    console.log(userList)
    console.log(quizList)
    console.log(solverList)

    const MakeQuiz = () => {
        router.push({
            pathname: '/makeQuiz/[id]',
            query: { id: router.query.id },
        })
    }
    return (
        <h1>personalPage</h1>
    )

    // if (quizList == null) return null;
    // else if (quizList.length == 0) {
    //     return (
    //         <>
    //             <style jsx global>{`
    //             body {
    //                 background: #EEDFCC;
    //             }
    //             `}</style>
    //             <Nav isUser={isUser} quizCode={quizCode} />
    //             <Container
    //                 component="main"
    //                 maxWidth="xs"
    //                 sx={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     alignItems: 'center'
    //                 }}>
    //                 <Logo size='0.9'></Logo>
    //                 <button onClick={MakeQuiz}
    //                     sx={{ mt: 5, mb: 2, backgroundColor: 'black', borderRadius: 0, fontSize: '1.3em', padding: '1em', width: '0.9' }}
    //                     className='blackBtn'>
    //                     MAKE QUIZ
    //                 </button>
    //             </Container>
    //         </>
    //     )
    // }
    // else {
    //     return (
    //         <>
    //             <Nav isUser={isUser} quizCode={quizCode} />
    //             <div className="msgUsername">{userList[0].firstName}</div>
    //             <Container sx={{
    //                 width: '100%',
    //                 alignItems: 'center',
    //             }} >
    //                 <div className='msgGrid'>
    //                     {patterns.map((pattern, idx) => (
    //                         <BauIcon key={idx} nickname={`Test${idx}`} score={1} totScore={3} patternNum={pattern} rotate={(idx * 7) % 4} colorNum={(idx * 13) % 5} idx={idx} />
    //                     ))}

    //                 </div>
    //             </Container>
    //             <div className='colorPalette'>
    //                 <div onClick={() => { setColorBlack() }} className='colorPick black'></div>
    //                 <div onClick={() => { setColorBlue() }} className='colorPick blue'></div>
    //                 <div onClick={() => { setColorYellow() }} className='colorPick yellow'></div>
    //                 <div onClick={() => { setColorRed() }} className='colorPick red'></div>
    //             </div>
    //         </>
    //     )
    // }
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

export async function getStaticProps() {
    const resUser = await axios.post(LOCAL_SERVER_URL + '/api/users/getUsers', null)
    const userList = resUser.data.users
    const resQuiz = await axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
    const quizList = resQuiz.data.quizzes
    const resSolver = await axios.post(LOCAL_SERVER_URL + '/api/solvers/getSolver', null)
    const solverList = resSolver.data.solvers

    return {
        props: {
            userList, quizList, solverList
        }
    }
}