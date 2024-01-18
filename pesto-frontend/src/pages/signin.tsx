"use client"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthService from '../services/Auth';
import { setUser } from '../store/reducers/user.reducer';
import { errorFormatter } from '../utils';
import SignInForm from '@/components/Auth';
import AuthForm from '@/components/Auth';


export default function Signin() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = async (values: any) => {
        try {
            setIsSubmitting(true);
            const resp = await AuthService.SigninUser({
                email: values?.email as string,
                password: values?.password as string,
            });
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
            <AuthForm isSubmitting={isSubmitting} onSubmit={onSubmit} isSignin={true} />
        </>
    )
}
