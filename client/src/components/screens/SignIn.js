import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
//import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import M from 'materialize-css'
// const SignIn  = ()=>{

//     }
//    return (
//       <div className="mycard">
//           <div className="card auth-card input-field">
//             <h1>S</h1>
//             <input

//             />
//             <input

//             />
//             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
//             onClick={()=>PostData()}
//             >
//                 Login
//             </button>
//             <h5>
//                 <Link to="/signup">Dont have an account ?</Link>
//             </h5>
//             <h6>
//                 <Link to="/reset">Forgot password ?</Link>
//             </h6>

//         </div>
//       </div>
//    )
// }

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                SOCIALzzz
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signin() {
    const classes = useStyles();
    //   const [note, setNote] = useState({
    //     username: "",
    //     password: ""
    //   });
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "signedin success", classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
        //   function changeHandler(event) {
        //     //event.preventdefault()
        //     const { name, value } = event.target;
        //     setNote(prevNote => {
        //       return {
        //         ...prevNote,
        //         [name]: value
        //       };
        //     });
        //     // event.preventdefault()
        //     console.log(event.target.value)
        //   }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        //margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                    <Button
                        onClick={() => PostData()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>

                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}<br />
                            </Link>
                            <br />
                            <Link to="/reset" variant="body2">
                                {"Forgot Password"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

//export default SignIn