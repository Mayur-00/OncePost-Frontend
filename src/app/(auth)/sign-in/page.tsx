
"use client"
import GoogleSignupButton from "@/components/GoogleSignupButton";
import { loginSchema, loginUserData } from "@/schema/auth.schema";
import {zodResolver} from '@hookform/resolvers/zod'
import { useAuthStore } from "@/stores/auth.store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email:'',
      password:''
    },
   
  });

  const {loginUser, loading} = useAuthStore()

const submit = async (data:loginUserData)=>{
  if(!data){
    toast.error('please fill the form');
    return;
  };

  const res = await loginUser(data);
  if(!res.success){
    toast.error(res.message);
    return;
  };


 router.replace('/dashboard')
}

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center  bg-zinc-100 text-black overflow-y-auto">
      <h1 className="text-4xl font-bold text-black mt-5">ONCEPOST</h1>
      <section className="min-h-[50%] w-[90%] md:h-[80%] md:w-[30%] lg:h-[80%] lg:w-[30%] flex flex-col items-center py-10 my-auto bg-white rounded-md shadow-2xl ">
        <h1 className=" text-2xl md:text-3xl">Login</h1>
        <form className="mx-auto min-h-[60%] max-h-[80%] w-[80%] flex flex-col gap-2  " onSubmit={form.handleSubmit(submit)}>
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
          <p className="text-xs text-zinc-400">By clicking on the submit button you are agreeing our <Link href={"/terms"} className="underline text-blue-700">terms & condition</Link></p>

          <button type="submit" className="py-1 px-4 bg-violet-500 rounded-md text-white hover:bg-violet-600 cursor-pointer " disabled={loading} >
            {
              loading ? (
                <Loader2 className="animate-spin"/>
              ) : (
                <p>  Submit</p>

              )
            }
          </button>
        </form>
        <p className="text-xs">Don't have a account, please <Link href="/sign-in" className="underline text-blue-700">Login</Link></p>
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
