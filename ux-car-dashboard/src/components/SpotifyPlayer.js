import {useEffect, useState} from 'react';
import { Box, Typography, Link } from '@mui/material';

const CLIENT_ID = "12579dc6ad3c47d3806657fa397db46b";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

function SpotifyPlayer({ size }) {
    const [token, setToken] = useState("")
    
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)
    
    }, [])
    
    return (
        <Box
            sx={{
                position: 'relative',
                width: `${size}px`,     // IMG SIZE
                height: `${size}px`,    // IMG SIZE
                backgroundColor: 'none',
                left: `${-size / 2}px`,   // CENTERING 
                top: `${-size / 2}px`,    // CENTERING 
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    color: 'white',
                    width: '100%',
                    lineHeight: `${size}px`,
                    height: '100%',
                    textAlign: 'center',
                    top: `${size * 0.68}px`,
                }}
            >
                <Link href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}  color="inherit">
                    <Typography variant='p'>
                        Login to Spotify
                    </Typography>
                </Link>
                <Typography variant='h3'>
                    000000
                </Typography>
            </Box>
        </Box>
    );
}

export default SpotifyPlayer;