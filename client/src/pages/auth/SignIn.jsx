import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePostMutation } from '../../redux/Apislice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import IconImports from "../../assets/imports";
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

const SignIn = () => {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Post, result] = usePostMutation();

  useEffect(() => {
    if (result?.data?.respCode) navigate('/dashboard');
  }, [result.data, dispatch]);

  const submitter = async (value) => {
    await Post({
      url: 'auth/login',
      body: { ...value, entityType: 'employee' },
    });
  };

  return (
    <main className="flex items-center justify-center w-screen h-screen bg-main_background p-10">
      <div className="flex w-full max-w-9xl h-full">
        {/* Left side: Image */}
        <div className="flex-1 flex justify-center items-center">
          <img src={IconImports.SignInSvg} className="object-contain max-w-[60%] max-h-full" />
        </div>
        <Separator orientation='vertical' />
        {/* Right side: Form */}
        <div className="flex-1 flex justify-center items-center">
          <Card className='w-[70%] bg-content_background'>
            <CardHeader className='font-bold text-xl'>Welcome back</CardHeader>
            <CardDescription className='px-6 py-4'>welcome back! please enter your details</CardDescription>
            <CardContent>
              <Form>
                
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
