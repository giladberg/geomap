import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import { withStyles } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";

import Context from '../../context';

const ME_QUERY = `
{
  me {
    _id
    email
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);
    console.log({ data });
    dispatch({ type: 'LOGIN_USER', payload: data.me });
  };
  const responseGoogle = response => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId='795670572766-u3350l76s8f1ofojhuuavjik93coco37.apps.googleusercontent.com'
      onSuccess={onSuccess}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default withStyles(styles)(Login);
