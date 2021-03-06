import React from 'react'
import {Form, Formik} from 'formik'
import { Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps{}

const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useRegisterMutation();
    return (
    <Wrapper variant="small">
    <Formik initialValues={{username: "", password: ""}} onSubmit={async (values,{setErrors}) => {
        const response = await register(values);
        if(response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        }
    }}>
        {({isSubmitting}) => (
            <Form>
                <InputField
                name="username"
                label="Username"
                placeholder="username" />
                <Box mt={5}>
                 <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password" />
                </Box>
                <Button mt={4} isLoading={isSubmitting} type="submit" colorScheme="teal">
                    Register
                </Button>
            </Form>
        )}
    </Formik>
    </Wrapper>
    );
}

export default Register;