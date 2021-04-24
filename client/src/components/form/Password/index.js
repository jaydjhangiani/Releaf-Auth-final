import { IconButton,TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useField} from 'formik'
import React, { useState } from 'react'

const PasswordWrapper = ({
    name,
    label,
    ...otherProps
}) => {

    const [field, meta] = useField(name);

    const configPassword = {
        ...field,
        ...otherProps,
        label,
        fullWidth: true,
        required: true,
        variant: "outlined",
    };

    const handelCLickShowPassword = () => {
        setShowPasswordValue({
            showPassword: !showPasswordValue.showPassword
        })
    }

    const [showPasswordValue, setShowPasswordValue] = useState({
        showPassword: false
      });

    if (meta && meta.touched && meta.error){
        configPassword.error = true;
        configPassword.helperText = meta.error
    }

    return (
        <TextField {...configPassword} 
            type={(showPasswordValue.showPassword ? "text" : "password")}
            InputProps=
                {{endAdornment: <IconButton edge="end" onClick={handelCLickShowPassword}>
                {showPasswordValue.showPassword ? (<Visibility/>) : (<VisibilityOff/>)}
                </IconButton>
                }}
        />
    )
}

export default PasswordWrapper