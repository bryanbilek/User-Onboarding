import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers( users => [...users, status])
    }, [status])

    return(
        <div className="user-form">
            <Form>
                <label htmlFor="name">
                    Name
                    <Field id="name" type="text" name="name" placeholder="name" />
                    {touched.name && errors.name && (<p>{errors.name}</p>)}
                </label>
                <label htmlFor="email">
                    Email
                    <Field id="email" type="text" name="email" placeholder="email" />
                    {touched.email && errors.email && (<p>{errors.email}</p>)}
                </label>   
                <label htmlFor="password">
                    Password
                    <Field id="password" type="text" name="password" placeholder="password" />
                    {touched.password && errors.password && (<p>{errors.password}</p>)}
                </label>   
                <label className="checkbox">
                    Terms of Service
                    <Field id="termsOfService" type="checkbox" name="termsOfService" check={values.termsOfService} />
                    </label>  
                 <Field as="select" className="role-select" name="role">
                    <option disabled>Choose your role</option>
                    <option value="Front End">Front End</option>
                    <option value="Back End">Back End</option>
                    <option value="Full Stack">Full Stack</option>
                  </Field> 
                <button type="submit">Submit!</button>       
            </Form>
            <h1>Users Onboarded:</h1>
            {users.map(user => {
                return (
                    <ul>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                        <li>Role: {user.role}</li>
                    </ul>
                )
            })}
        </div>
    );
}

const FormikUserForm = withFormik({
    
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("you CAN'T skip this"),
        email: Yup.string().required("give me your email"),
        password: Yup.string().required("we promise not to steal your password")
      }),

      handleSubmit(values, { setStatus, resetForm }) {
          axios
          .post("https://reqres.in/api/users/", values)
          .then(response => {
              setStatus(response.data);
              resetForm();
          })
          .catch(error => error.response)
      }

})(UserForm)

export default FormikUserForm;