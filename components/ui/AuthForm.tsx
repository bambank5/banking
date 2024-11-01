"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.action';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      if (type === 'sign-up') {
        const newUser  = await signUp(data);
        setUser (newUser );
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {user ? 'Link your account to get started' : 'Masukkan Data Diri'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/*PlaidLink*/}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="Nama Pertama" placeholder='Masukkan Nama Pertama' />
                    <CustomInput control={form.control} name='lastName' label="Nama Terakhir" placeholder='Masukkan Nama Kedua' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Alamat" placeholder='Masukkan Alamat Lengkap' />
                  <CustomInput control={form.control} name='city' label="Kota" placeholder='Masukkan Kota Anda' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="Provinsi" placeholder='Contoh: Jawa Barat' />
                    <CustomInput control={form.control} name='postalCode' label="Kode Pos" placeholder='Contoh: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Tanggal Lahir" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="NIK" placeholder='Contoh: 9001150001123' />
                  </div>
                </>
              )}
              <CustomInput control={form.control} name='email' label="Email" placeholder='Masukkan Email anda' />
              <CustomInput control={form.control} name='password' label="Password" placeholder='Masukkan Password anda' />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in' ? "Belum Punya Akun?" : "Sudah Punya Akun?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;