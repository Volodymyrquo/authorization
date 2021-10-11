import axios from 'axios'

export const END_POINTS = {
  SERVER: 'https://onestepid.com/api/',
  SEND_CODE: 'v1/send-code',
  SEND_USERNAME: 'v1/send-username',
  SEND_PHONE: 'v1/sms/send-phone',
  SEND_SMS: 'v1/sms/send-sms',
}

export const sendCode = async (data) => {
  try {
    return await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `${END_POINTS.SERVER + END_POINTS.SEND_CODE}`,
      data: data,
    })
  } catch (err) {
    // Handle Error Here
    return err.response
  }
}

export const sendUsername = async (data) => {
  try {
    return await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `${END_POINTS.SERVER + END_POINTS.SEND_USERNAME}`,
      data: data,
    })
  } catch (err) {
    // Handle Error Here
    return err.response
  }
}

export const sendPhone = async (data) => {
  try {
    return await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `${END_POINTS.SERVER + END_POINTS.SEND_PHONE}`,
      data: data,
    })
  } catch (err) {
    // Handle Error Here
    return err.response
  }
}

export const sendSMS = async (data) => {
  try {
    return await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `${END_POINTS.SERVER + END_POINTS.SEND_SMS}`,
      data: data,
    })
  } catch (err) {
    // Handle Error Here
    return err.response
  }
}

export const getReferralCodes = async (userId) => {
  const response = await API.get('/v1/referrals/referral-codes', {
    headers: {
      'Content-Type': 'application/json',
      'user-id': `${userId}`,
    },
  }).catch((error) => {
    console.log(error.response)
  })
  return response
}

export const loginByCodeAndUsername = async (data) => {
  const response = await axios.post(
    END_POINTS.SERVER + END_POINTS.REGISTRATION,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response
}

export const loginById = async (data) => {
  const response = await axios.post(
    END_POINTS.SERVER + END_POINTS.AUTHENTIFICATION,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response
}

export const createInviteCode = async (userId, ref_code) => {
  const response = await axios
    .post(
      'http://ec2-34-208-108-203.us-west-2.compute.amazonaws.com:8091/v1/referrals/inviting',
      {
        application_id: 'app.sumra.meet',
      },
      {
        headers: {
          'user-id': `${userId}`,
          referral_code: `${ref_code && ref_code}`,
        },
      }
    )
    .catch((error) => {
      console.log(error.response)
    })
  return response
}

export const getAuthorizationData = async (sumraToken) => {
  const response = await axios.post(
    'https://syn.sumrachat.com/_matrix/client/r0/login',
    { type: 'org.matrix.login.jwt', token: sumraToken }
  )
  return response.data
}

export const setReferralLink = async (userId, referral_code) => {
  const response = await axios.post(
    'http://ec2-34-208-108-203.us-west-2.compute.amazonaws.com:8091/v1/referrals/inviting',
    {
      application_id: 'app.sumra.chat',
      referral_code,
    },
    {
      headers: {
        'user-id': userId,
      },
    }
  )
  return response
}
