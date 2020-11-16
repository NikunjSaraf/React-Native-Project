import React from 'react'
import { View } from 'react-native'
import {
    Body,
    Icon,
    Text,
    Right,
    Title,
    Button,
    Header
 } from 'native-base'

import { connect } from 'react-redux'
import { signOut } from '../redux/action/auth'
import propTypes from 'prop-types';
 
const CustomHeader = ({authState,signOut,navigation}) => {
    return (
        <Header
            androidStatusBarColor="#0f4c75"
            style={{backgroundColor:'#0f4c75'}}
        >
            <Body>
                <Title>Social App LCO</Title>
            </Body>
            <Right>
                {authState.isAuthenticated && (
                    <>
                        <Button
                            transparent
                            iconLeft
                            onPress={()=>navigation.navigate('AddPost')}
                        >
                            <Text style={{color:'#fdcb9e'}} >Add Post</Text>
                        </Button>
                        <Button
                            transparent
                            onPress={()=>signOut()}
                        >
                            <Icon name="log-out-outline"/>
                        </Button>
                    </>
                )}
            </Right>
        </Header>
    )
}

const mapStateToProps = (state) => ({
    authState:state.auth
})

const mapDispatchToProps = {
    signOut
}

CustomHeader.propTypes = {
    authState: propTypes.object.isRequired,
    signOut:propTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader)

