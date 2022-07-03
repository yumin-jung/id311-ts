import React from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Nav = ({ isUser }) => {
    const router = useRouter();
    console.log(isUser)
    const pages = isUser ? ["MAIN", 'MY PAGE', 'SIGN OUT'] : ["MAIN", 'SIGN IN', 'SIGN UP'];

    const handleOpenNavMenu = (event) => {
        document.getElementById('menu-appbar').classList = 'menuList';
        document.getElementById('menu-appbar').addEventListener('mouseleave', handleCloseNavMenu);
    };

    const handleCloseNavMenu = (event) => {
        const data = event.currentTarget.innerText;
        document.getElementById('menu-appbar').classList = 'menuList invisible';

        if (data == 'MY PAGE') {
            router.push({
                pathname: '/personalPage/[id]',
                query: { id: JSON.parse(localStorage.getItem("userCode")) },
            })
        }
        else if (data == 'SIGN OUT') router.push('/signOut');
        else if (data == 'SIGN IN') router.push('/signIn');
        else if (data == 'SIGN UP') router.push('/signUp');
        else if (data == 'MAIN') {
            router.push({ pathname: '/' });
        }
    };

    return (
        <div position="fixed" className='navBar'>
            <Box sx={{}}>
                <button
                    onClick={handleOpenNavMenu}
                    className="menuBtn"
                ></button>
                <div
                    id="menu-appbar"
                    className='menuList invisible'
                    onClick={handleCloseNavMenu}
                    sx={{
                        xs: 'block',
                        borderRadius: '0',
                    }}
                >
                    {pages.map((page) => (
                        <div key={page} onClick={handleCloseNavMenu} className='menuItem'>
                            <Typography>{page}</Typography>
                        </div>
                    ))}
                    <div className="menuClose" onClick={handleCloseNavMenu}></div>
                </div>
            </Box>
        </div>
    );
}

export default Nav