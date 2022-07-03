import React, { useEffect, useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip'
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';

const DEPLOY_CLIENT_URL = 'https://id311.vercel.app'
const LOCAL_CLIENT_URL = 'http://localhost:3000'

export default function ShareLink() {
    const { isUser, quizCode } = useContext(AppContext);
    const [copiedLink, setcopiedLink] = useState(``);

    const CopyLink = () => {
        setcopiedLink(`my code : ${quizCode}\ngo to here : ${DEPLOY_CLIENT_URL}`);
    }

    return (
        <>
            <Nav isUser={isUser} quizCode={quizCode} />
            <Container maxWidth="xs" style={{ marginTop: '20em' }}>
                <div style={{ width: '90%', margin: 'auto' }}>
                    <div align='center' variant='h2' className='codeShare'>
                        {quizCode}
                    </div>
                    <CopyToClipboard
                        text={copiedLink}
                        onCopy={CopyLink}>
                        <Tooltip
                            title={copiedLink == `my code : ${quizCode}\ngo to here : ${DEPLOY_CLIENT_URL}`
                                ? "Paste your quiz"
                                : "Copy your quiz"
                            }
                            placement='bottom'
                        >
                            <div className='optionBox' style={{ bottom: 0 }}>
                                <div>
                                    <button className='qOption' style={{ height: '4.2em' }}>
                                        SHARE QUIZ
                                    </button>
                                </div>
                                <div className='verticalSpace'></div>
                            </div>

                        </Tooltip>
                    </CopyToClipboard>
                </div>
            </Container>
        </>
    )
}