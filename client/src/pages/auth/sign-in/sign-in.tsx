import IconImports from "@/assets/imports";
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { formFields } from "./fields";
import RenderFormElement from "@/components/custom/form/components/RenderFormElement";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultvalues, LoginBodyType, schema } from "./schema";
import { useLoginMutation } from "@/redux/api/auth.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
/**@Types */
import { ILoginResponse } from "./types";

const SignIn = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultvalues
    });

    /**@CustomHooks */
    const navigate = useNavigate();

    /**@Mutation */
    const [login] = useLoginMutation();

    const loginHandler = (values: LoginBodyType) => {
        console.log(values);
        login({...values, entityType: "employee"}).then(({ data, error }: { data?: ILoginResponse, error?: any }) => {
            if(data && data?.respCode) {
                toast.success(data?.respMessage)
                navigate("/")
                return;
            }
            toast.error(data?.errorMessage);
        })
    }

  return (
    <main className="flex items-center justify-center w-screen h-screen bg-main_background p-4 lg:p-10">
      <div className="flex w-full max-w-9xl h-full">
        {/* Left side: Image */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <img src={IconImports.SignInSvg} className="object-contain max-w-[60%] max-h-full" />
        </div>
        <Separator orientation='vertical' className="hidden lg:flex" />
        {/* Right side: Form */}
        <div className="flex flex-1 justify-center items-center">
          <Card className='w-full lg:w-[60%] p-1 lg:p-6 bg-content_background'>
            <CardHeader className='font-bold text-xl'>Welcome back</CardHeader>
            <CardDescription className='px-6 py-4'>welcome back! please enter your details</CardDescription>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(loginHandler)}>
                    {
                        formFields.map((field) => (
                            <RenderFormElement
                                key={field.name}
                                element={field}
                            />
                        ))
                    }
                    <Button className="w-full h-12">Login</Button>
                    <p className="text-sm mt-10 text-neutral-400 text-center">Don't have an account? 
                        <Link to="/auth/signup">
                            <span className="font-semibold text-md text-indigo-600 cursor-pointer mx-2">Sign Up</span>
                        </Link>
                    </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
