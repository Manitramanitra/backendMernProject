import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavIcon from '../../components/@shared/NavIcon'
import UploadProfil from './UploadProfil'

function UpdateProfil() {
    const userData = useSelector(state=>state.user);
    const [imageUrl,setImageUrl]= useState(userData.data.picture)
    
  return (
    <div className="profil-container">
        <NavIcon/>
        <h1>Profil de {userData.data.pseudo}</h1>
        <div className="update-container">
            <div className="left-part">
                <h3>Photo de profil</h3>
                <img src={imageUrl} alt="profil picture" />
                <UploadProfil/>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfil
