import axios from 'axios';

const API = axios.create({baseURL: 'http://ec2-34-208-108-203.us-west-2.compute.amazonaws.com:8091'});

 export const END_POINTS =  {
    SERVER: 'https://api.sumra.net/',
    SEND_CODE: 'auth/v1/send-code',
    VALIDATE: 'auth/v1/validate',
    REGISTRATION: 'auth/v1/registration',
    AUTHENTIFICATION: 'auth/v1/meet/authenticate',
}

export const sendPhone = async (data) => {
    const response =  await axios.post(END_POINTS.SERVER + END_POINTS.SEND_CODE, 
       data, {
       headers: {
           'Content-Type': 'application/json'
       }}).catch(error => {
        console.log(error.response)
     })
        return response;
   }; 

export const getReferralCodes = async (userId) => {
    const response = await API.get('/v1/referrals/referral-codes',  {
    headers: {
    "Content-Type": "application/json",
      'user-id': `${userId}`
    }}).catch(error => {
    console.log(error.response)
 })
    return response;
}; // required user-id

export const createInviteCode = async (userId, ref_code) => {
    const response = await API.post('/v1/referrals/inviting', 
    {
    "application_id": "app.sumra.meet",
    }, {
    headers: {
        "user-id": `${userId}`,
        "referral_code": `${ref_code && ref_code}`,
    }}).catch(error => {
       console.log(error.response)
    })
    return response;
}; 

/**
 * login with by code and username 
 */

export const loginByCodeAndUsername = async (data) => {
    const response = await axios.post(END_POINTS.SERVER + END_POINTS.REGISTRATION, 
        data, {
        headers: {
            'Content-Type': 'application/json'
        }})
    return response;
}; 
