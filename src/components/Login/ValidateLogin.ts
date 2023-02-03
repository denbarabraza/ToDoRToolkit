
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const validate = (values: FormikErrorType) => {
    const errors: FormikErrorType = {}

    //email
    if (!values.email) {
        errors.email = 'Field required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    //password
    if (!values.password) {
        errors.password = 'Field required'
    } else if (values.password.length<2) {
        errors.password = 'Password should be more 2 symbols'
    }

    return errors
}