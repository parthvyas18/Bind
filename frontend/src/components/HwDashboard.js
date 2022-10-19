import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory,NavLink } from 'react-router-dom';
import {motion} from 'framer-motion';
const HwDashboard = () => {

  const [familyCount,setFamilyCount] = useState(0);
  const [doctorCount,setDoctorCount] = useState(0);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [patientArr, setpatientArr] = useState(['None Found']);
  const history = useHistory();
  useEffect(() => {
    async function fetch(){
      const config = {
          headers: {
            "Content-type":"application/json"
          },
      }
      var {data} = await axios.get('/api/family/countFamily',config);
      setFamilyCount(data.count);
      var {data} = await  axios.get('/api/doctor/countDoctor',config);
      setDoctorCount(data.count);
    }
    fetch();
    const isAuth = localStorage.getItem('isAuth');
    if(isAuth=='false'){
      history.push('/')
    }
  }, [])

  const submitHandler = async()=>{
    if(!from || !to){
      return;
    }
    try{
      
      const config={
        headers: {
          "Content-type":"application/json"
        }, 
      }
      const {data} = await axios.post('/api/patient/appointed',{from,to},config);
      setpatientArr(data)
      console.log(data);

    }catch(error){
      console.log(error);
    }
  }

    return (
      <motion.div animate={{opacity:1}} initial={{opacity:0}}>
        <Box sx={{
          width: '98vw',
          height:'22vh',
        }} display='flex' justifyContent='center'>
            <Box display='flex' justifyContent='space-between' alignItems='center' sx={{backgroundColor:'#3A94AF',width:'40%',marginLeft:'30px',height:'10vh',borderRadius:'5px',marginTop:'10vh'}}>
              <Box display='flex' justifyContent='center' sx={{flexFlow:'column',paddingLeft:'20px'}}>
                <Typography variant='h5' component='div' sx={{fontFamily:'Roboto Slab',color:'#19414D'}}>
                  Total Patient
                </Typography>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',color:'#'}}>
                  SSF Total Patient
                </Typography>
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center' paddingRight='20px'>
                <Typography variant='h3' component='div' sx={{fontFamily:'Roboto Slab',color:'#FEFFFF'}}>
                  {familyCount}
                </Typography>
              </Box>
            </Box >
            <Box display='flex' justifyContent='space-between' alignItems='center' sx={{backgroundColor:'#E5B436',width:'40%',marginLeft:'30px',height:'10vh',borderRadius:'5px',marginTop:'10vh'}}>
              <Box display='flex' justifyContent='center' sx={{flexFlow:'column',paddingLeft:'20px'}}>
                <Typography variant='h5' component='div' sx={{fontFamily:'Roboto Slab',color:'#985E1A'}}>
                  Total Doctors
                </Typography>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',color:'#'}}>
                  SSF Doctors
                </Typography>
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center' paddingRight='20px'>
                <Typography variant='h3' component='div' sx={{fontFamily:'Roboto Slab',color:'#FEFFFF'}}>
                  {doctorCount}
                </Typography>
              </Box>
            </Box >
        </Box>
        <Box display='flex' alignItems='center' sx={{height:'8vh',width:'80vw',marginLeft:'5vw',backgroundColor:'#3AAFA9',borderRadius:'15px',marginLeft:'10vw'}}>
          <Typography variant='h6' component='div' sx={{marginLeft:'4vw',display:'flex',alignItems:'center',justifyContent:'center',height:'12vh',fontFamily:'Roboto Slab',color:'#19414D'}}>
            From
          </Typography>
          <Box sx={{alignSelf:'start',marginLeft:'1vw',marginTop:'1vh' }} display='flex' justifyContent='center'>
            <FormControl sx={{width:'10vw'}}>
              <OutlinedInput
                id="ID"
                placeholder='DD/MM/YYYY'
                sx={{borderRadius:'5px',height:'5vh',marginTop:'5px'}}
                onChange={(e)=>{setFrom(e.target.value)}}
              />
            </FormControl>
          </Box>
          <Typography variant='h6' component='div' sx={{marginLeft:'4vw',display:'flex',alignItems:'center',justifyContent:'center',height:'12vh',fontFamily:'Roboto Slab',color:'#19414D'}}>
            To
          </Typography>
          <Box sx={{alignSelf:'start',marginLeft:'1vw',marginTop:'1vh' }} display='flex' justifyContent='center'>
            <FormControl sx={{width:'10vw'}}>
              <OutlinedInput
                id="ID"
                placeholder='DD/MM/YYYY'
                sx={{borderRadius:'5px',height:'5vh',marginTop:'5px'}}
                onChange={(e)=>{setTo(e.target.value)}}
              />
            </FormControl>
          </Box>
          <Button onClick={submitHandler} sx={{backgroundColor:'#19414D',color:'#FEFFFF',marginLeft:'5vw',width:'5vw',height:'4vh',borderRadius:'15px','&:hover':{backgroundColor:'#19414D'}}}>
            Fetch
          </Button>
        </Box>
        <Box display='flex' alignItems='center' sx={{width:'80vw',marginLeft:'5vw',borderRadius:'15px',marginLeft:'10vw',paddingTop:'40px',flexFlow:'column'}}>
          <Box display='flex' justifyContent='space-between' alignItems='center' sx={{backgroundColor:'#D1D1D1',width:'80vw',height:'5vh',borderRadius:'8px',marginBottom :'15px'}}>
            <Typography variant='h7' component='div' sx={{fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
              Sl No
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
              Name
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
              Doctor Appointed
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'52px'}}>
              Visited
            </Typography>
          </Box>
          {
            patientArr.map((item,idx)=>{
              if(item==='None Found'){
                return (
                  <Box>
                    <Typography sx={{textAlign:'center',width:'80vw',marginTop:'40px'}}>
                      {item}
                    </Typography>
                  </Box>
                )
              }  
                return(
                  <Paper elevation={3} sx={{backgroundColor:'#FEFFFF',width:'80vw',height:'9vh',borderRadius:'8px',marginBottom :'15px'}}>
                    <Box display='center' justifyContent='space-between' alignItems='center' sx={{width:'80vw'}}>
                      <Typography variant='h5' component='div' sx={{fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {idx+1}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh'}}>
                        {item.patientData.name}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {item.doctor}
                      </Typography>
                      <Box display='center' justifyContent='center' alignItems='center' sx={{width:'20vw'}}>
                        <Button sx={{backgroundColor:'#19414D',color:'#FEFFFF',marginLeft:'5vw',width:'5vw',height:'4vh',borderRadius:'15px','&:hover':{backgroundColor:'#19414D'}}}>
                         <NavLink to='/room'><span style={{color:'white'}}>Start</span></NavLink> 
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
              )
            })
          }
        </Box>
      </motion.div>
  )
}

export default HwDashboard