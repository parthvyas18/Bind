import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import Logo from '../images/Logo.png';
import {motion} from 'framer-motion';
const SearchPrescription = () => {
  return (
    <Box sx={{
        width: '98vw',
        height:'34vh',
        position:'absolute',
        right:'0px',
        top:'12vh'
    }} display='flex' justifyContent='center'>
        <motion.div layout animate={{scale:1}} initial={{scale:0}} layoutId='main'>
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',marginTop:'15vh',borderRadius:'25px',width:'30vw',height:'45vh'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay: 0.4}}>
                    <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                        <img src={Logo} alt='not found' style={{borderRadius:'50%',position:'absolute',top:'5vh'}}></img>
                        <Typography variant='h4' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'12vh'}}>
                            Patient Info
                        </Typography>
                        <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'3vw' }} display='flex' justifyContent='center'>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
                            </Box>
                            <FormControl sx={{width:'20vw'}}>
                            <InputLabel htmlFor="ID">Patient Name</InputLabel>
                            <OutlinedInput
                                id="ID"
                                label="Registration ID"
                                sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                            />
                            </FormControl>
                        </Box>
                        <Button sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',marginTop:'5vh','&:hover':{backgroundColor:'#CF9D6E'}}}>
                            Search
                        </Button>
                    </Box>
                </motion.div>
            </Paper>
        </motion.div>
    </Box>
  )
}

export default SearchPrescription