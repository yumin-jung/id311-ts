import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from '../components/Nav';

const theme = createTheme();
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function SignIn({ userList }) {
    const router = useRouter()
    console.log(userList)

    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        setIsUser(JSON.parse(localStorage.getItem('isUser')))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // Input text by user
        const userInput = {
            username: data.get('username'),
            password: data.get('password')
        }

        // Find user data in DB
        const findUserInfo = userList.filter((user) => user.username == userInput.username)[0];

        // Check input is valid
        if (findUserInfo === undefined) {
            alert('Not registered user');
        }
        else {
            if (userInput.password == findUserInfo.password) {
                localStorage.setItem("isUser", JSON.stringify(true))
                localStorage.setItem("userCode", JSON.stringify(findUserInfo.quizCode))

                //Go to personal page
                router.push({
                    pathname: '/'
                })
            }
            else {
                alert('Incorrect password!');
            }
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
                        alignItems: 'flex-start',
                        width: '90%',
                        margin: 'auto'
                    }}
                >
                    <Typography component="h1" variant="h5" className='bauh' style={{ fontFamily: 'BAUHS93', fontSize: '2em', marginBottom: '0.8em' }}>
                        SIGN IN
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={1.4}>
                            <Grid item xs={12}>
                                <input
                                    required
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    placeholder='Username'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder='Password'
                                />
                            </Grid>
                        </Grid>
                        <button
                            type="submit"
                            className="unBtn unBtn2"
                        >
                            SIGN IN
                        </button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export async function getStaticProps() {
    const res = await axios.post(LOCAL_SERVER_URL + '/api/users/getUsers', null)
    const userList = res.data.users.map((user) => {
        return { username: user.username, password: user.password, quizCode: user.quizCode };
    })

    return {
        props: {
            userList,
        },
    }
}