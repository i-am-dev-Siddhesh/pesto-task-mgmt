"use client"
import AuthForm from '@/components/Auth';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthService from '../services/Auth';
import { setUser } from '../store/reducers/user.reducer';
import { errorFormatter } from '../utils';
import { setBearerToken } from '../utils/tokenUtils';


export default function Signup() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = async (values: any) => {
        try {
            setIsSubmitting(true);
            const resp = await AuthService.SignupUser({
                email: values?.email as string,
                password: values?.password as string,
                name: values.name as string
            });
            setBearerToken(resp.data?.token, resp.data?.expirationTime);
            dispatch(setUser({ data: resp?.data?.data }));
            router.push("/");
        } catch (error: any) {
            const message = errorFormatter(error);
            return;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <AuthForm title="Signup" isSubmitting={isSubmitting} onSubmit={onSubmit} />

        </>
    )
}
