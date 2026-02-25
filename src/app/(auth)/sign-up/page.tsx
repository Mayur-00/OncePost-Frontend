
"use client"
import GoogleSignupButton from "@/components/GoogleSignupButton";
import { loginSchema, registerSchema, registerUserData } from "@/schema/auth.schema";
import {zodResolver} from '@hookform/resolvers/zod'
import { useAuthStore } from "@/stores/auth.store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Loader2 } from "lucide-react";

const page = () => {
  const {registerUser, loading} = useAuthStore()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues:{
     name:'',
      email:'',
      password:''
    },
   
  });

  const submit = async (data:registerUserData)=>{

    const res = await registerUser(data);

    if(!res.success){
      toast.error(res.message);
      return
    };
    toast.success('registration successfull, redirecting pls wait');
    form.reset();
    window.location.href = '/dashboard'
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center  bg-black text-black ">
      <h1 className="text-4xl font-bold text-zinc-100 mt-5">ONCEPOST</h1>
      <section className="min-h-[50%] w-[90%] md:h-[80%] md:w-[30%] lg:h-[85%] lg:w-[30%] flex flex-col items-center py-10 my-auto bg-white rounded-md shadow-2xl">
        <h1 className=" text-2xl md:text-2xl">Register With Us</h1>
        <form className="mx-auto min-h-[60%] max-h-[80%] w-[80%] flex flex-col gap-2  overflow-y-auto" onSubmit={form.handleSubmit(submit)}>
          <label htmlFor="name">Name</label>
          <input
          {...form.register('name')}
            id="name"
            name="name"
            className={`py-1 px-4 bg-white border rounded-md ${form.formState.errors.name?"border-red-400" : "border-zinc-400"}`}
            placeholder="Name"
            type="text"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
          <label htmlFor="email">Email</label>
          <input
          {...form.register('email')}
            id="email"
            name="email"
            className={`py-1 px-4 bg-white border rounded-md ${form.formState.errors.email?"border-red-400" : "border-zinc-400"}`}
            placeholder="Email"
            type="text"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
          <label htmlFor="password">Password</label>
          <input
          {...form.register('password')}
            id="password"
            name="password"
            className={`py-1 px-4 bg-white border rounded-md ${form.formState.errors.password?"border-red-400" : "border-zinc-400"}`}
            type="password"
            placeholder="Password"
          />

          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.password.message}
            </p>
          )}
          <p className="text-xs text-zinc-400">By clicking on the submit button you are agreeing our terms & condition</p>

          <button type="submit" className="py-1 px-4 bg-violet-500 rounded-md text-white hover:bg-violet-600 cursor-pointer flex items-center justify-center " disabled={loading} >
            {
              loading ? (
                <Loader2 className="animate-spin"/>
              ) : (
                <p>  Submit</p>
              )
            }
          </button>
        </form>
        <p className="text-sm">Already have a account, please <a href="/sign-in" className="text-blue-600 font-bold hover:text-un">Login</a></p>
        <div className="flex w-full items-center gap-3 px-10">
            <p className="w-[50%] h-px bg-black/30"></p>
            <p className="text-black/30">OR</p>
            <p className="w-[50%] h-px bg-black/30"></p>
        </div>

      {
        !loading && (
           <GoogleSignupButton />
        )
      }
      </section>
    </main>
  );
};

export default page;
