import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from '../components/Nav';
import CodeLogo from '../components/CodeLogo';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

const theme = createTheme();

export default function Home({ quizList }) {
  const router = useRouter();
  console.log(quizList)

  const [codeInput, setcodeInput] = useState('');
  const [alertOn, setAlert] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userCode, setUserCode] = useState(null);

  useEffect(() => {
    setIsUser(JSON.parse(localStorage.getItem('isUser')))
    setUserCode(JSON.parse(localStorage.getItem('userCode')))
  }, [])

  console.log(isUser);
  console.log(userCode);

  // Make quiz code upper case
  const makeUpperCase = (event) => {
    if (event.target.value.length <= 6) setcodeInput(event.target.value.toUpperCase());
  }

  // If user submit quiz code
  const handleSubmit = (event) => {
    event.preventDefault();

    const quizFilter = quizList.filter((quiz) => quiz.quizCode == codeInput.toLowerCase());

    if (quizFilter.length == 0) {
      setAlert(true);
      setTimeout(() => setAlert(false), 1000);
    }
    else {
      localStorage.setItem("quizCode", JSON.stringify(codeInput.toLowerCase()))
      router.push({
        pathname: '/startQuiz/[id]',
        query: { id: codeInput.toLowerCase() },
      })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Nav isUser={isUser} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CodeLogo></CodeLogo>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8, display: 'flex', alignItems: 'center' }} style={{ position: "relative" }}>
            {alertOn ? <input
              id="code"
              name="code"
              value='Invalid code'
              autoFocus
              className='alertCodeBox'
            /> : <input
              id="code"
              name="code"
              value={codeInput}
              onChange={makeUpperCase}
              autoComplete="code"
              autoFocus
              placeholder='Input the code'
              className='inputCodeBox'
            />}

            {codeInput.length == 6 &&
              <Box sx={{ mt: 0, display: 'flex', alignItems: 'center' }} >
                <div className="line"></div>
                <button
                  type="submit"
                  className='rightArrow'
                >
                </button>
              </Box>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const res = await axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
  const quizList = await res.data.quizzes

  return {
    props: {
      quizList,
    },
  }
}