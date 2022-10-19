import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import Logo from '../images/Logo.png';
import {motion} from 'framer-motion';

const SearchFamilyCards = () => {
    const [searchType, setSearchType] = useState('1');
    const [input, setInput] = useState();
    const history = useHistory();

const submitHandler = async()=>{
    if(!input){
        return;
    }
    try{
        const config = {
            headers: {
                "Content-type":"application/json"
            },          
        }
        const {data} = await axios.post('/api/family/fetch',{input,searchType},config);
        localStorage.setItem('familyData',JSON.stringify(data));
        console.log(data);
        history.push('/info')
    }
    catch(error){
        console.log(error);
    }
}

  return (
    <Box sx={{
        width: '98vw',
        height:'34vh',
        position:'absolute',
        right:'0px',
        top:'12vh'
    }} display='flex' justifyContent='center'>
        <motion.div layoutId='main'>
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',marginTop:'15vh',borderRadius:'25px',width:'30vw',height:'55vh',minWidth:'500px'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay: 0.4}}>
                    <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                        <img src={Logo} alt='not found' style={{borderRadius:'50%',position:'absolute',top:'5vh'}}></img>
                        <Typography variant='h4' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'12vh'}}>
                            Search Family Cards
                        </Typography>
                        <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'3vw' }} display='flex' justifyContent='center'>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
                            </Box>
                            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                            <InputLabel htmlFor="ID">{(searchType==='1')? 'Registration ID': 'Mobile Number'}</InputLabel>
                            <OutlinedInput
                                id="ID"
                                label={(searchType==='1')? "Registration ID" : "Mobile Number"}
                                sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                                onChange={(e)=>{setInput(e.target.value)}  }
                            />
                            </FormControl>
                        </Box>
                        <FormControl sx={{marginTop:'3vh'}}>
                            <RadioGroup
                                defaultValue='1'
                                row
                                name='searchType'
                                onChange={(e)=>setSearchType(e.target.value)}
                            >
                                <FormControlLabel control={<Radio />} label='Registration ID' value='1' />
                                <FormControlLabel control={<Radio />} label='Mobile Number' value='2' />
                            </RadioGroup>
                        </FormControl>
                        <Button onClick={submitHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',marginTop:'5vh','&:hover':{backgroundColor:'#CF9D6E'}}}>
                            Search
                        </Button>
                    </Box>
                </motion.div>
            </Paper>
        </motion.div>
    </Box>
  )
}

export default SearchFamilyCards