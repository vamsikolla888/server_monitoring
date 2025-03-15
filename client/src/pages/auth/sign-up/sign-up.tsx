import IconImports from "@/assets/imports";
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { formFields } from "./fields";
import RenderFormElement from "@/components/custom/form/components/RenderFormElement";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/api/auth.api";
import { defaultvalues, SignupBodyType,  schema } from "./schema";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
/**@Types */
import { ILoginResponse } from "../sign-in/types";

const SignUp = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultvalues
    });

    /**@CustomHooks */
    const navigate = useNavigate();

    /**@Mutation */
    const [login] = useLoginMutation();

    const loginHandler = (values: SignupBodyType) => {
        console.log(values);
        login({...values, entityType: "employee"}).then(({ data }: { data?: ILoginResponse, error?: any }) => {
            if(data && data?.respCode) {
                toast.success(data?.respMessage)
                navigate("/")
                return;
            }
            toast.error(data?.errorMessage);
        })
    }

  return (
    <main className="flex items-center justify-center w-screen h-screen bg-main_background p-10">
      <div className="flex w-full max-w-9xl h-full">
        {/* Left side: Image */}
        <div className="hidden lg:flex justify-center items-center order-3">
          <img src={IconImports.SignUpSvg} className="object-contain max-w-[60%] max-h-full" />
        </div>
        <Separator orientation='vertical' className="order-2" />
        {/* Right side: Form */}
        <div className="flex-1 flex justify-center items-center">
          <Card className='w-[70%] p-2 bg-content_background'>
            <CardHeader className='font-bold text-xl'>Thank you for Signup!</CardHeader>
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
                    <Button className="w-full h-12 mt-4">Sign Up</Button>
                    <p className="text-sm mt-10 text-neutral-400 text-center">Back to login 
                        <Link to="/auth/login">
                            <span className="font-semibold text-md text-indigo-600 cursor-pointer mx-2">Login</span>
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

export default SignUp;
