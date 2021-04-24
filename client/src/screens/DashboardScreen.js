import React, { useContext } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import PrivateScreen from '../screens/PrivateScreen'
import AuthContext from '../context/AuthContext'

const DashboardScreen = () => {

    const {user} = useContext(AuthContext)
    
    return (
        <div>
            <Sidebar user={user}/>
            <PrivateScreen />
        </div>
    )
}

export default DashboardScreen
