import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

export const signUp = (data) => async (dispatch) => {
    console.log(data);
    const { name, email, password, country, image, bio, instaUserName } = data;
    
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data);
            console.log('User account created & signed in!');

            database().
                ref('/users/' + data.user.uid).
                set({
                    name,
                    email,
                    country,
                    image,
                    bio,
                    instaUserName,
                    uid: data.user.uid
                })
                .then(() => console.log());
            Snackbar.show({
                text: 'Account Created Successfully',
                backgroundColor: "#FFF",
                textColor:'green'
            })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                Snackbar.show({
                    text: "Email Already in Use",
                    backgroundColor:'#FFF'
                })
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                Snackbar.show({
                    text:"Invalid Email"
                })
            }

            console.error(error);
        });


}

export const signIn = (data) => async (dispatch) => {
    console.log(data);

    const { email, password } = data;
    
    auth().
        signInWithEmailAndPassword(email, password).
        then(() => {
            console.log("Signin Successfull");
            Snackbar.show({
                text: 'Sign in SuccessFull',
                textColor: '#FFF',
                backgroundColor:'#000'
            })
        }).
        catch((error) => {
            console.log("Sign in Failed");
            Snackbar.show({
                text: 'Signin Failed Please verify your credentials',
                textColor: '#FFF',
                backgroundColor:'#000'
            })
            console.error(error);
        })
}

export const signOut = () => async (dispatch) => {
    auth().
        signOut().
        then(() => {
            Snackbar.show({
                text:'Signout Successfull'
            })
        })
        .catch((error) => {
            console.error(error)
        })
}