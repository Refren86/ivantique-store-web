import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';

import { Button, Input, Layout } from 'components';

const LoginScreen = () => {
  const { data: session } = useSession(); // hook provided by nextAuth to get the session data
  const router = useRouter();

  const { redirect } = router.query;

  useEffect(() => {
    // check if user is logged in (session?.user gets its value from signIn function)
    if (session?.user) {
      router.push(redirect || '/admin/add-furniture'); // if there is no redirect in query string, redirect to admin page
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const { email, password } = data;

    try {
      const result = await signIn('credentials', {
        redirect: false, // turning off redirect, because we'll redirect user manually after login
        email,
        password,
      });

      // handling error in API
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {}
  };

  return (
    <Layout>
      <div className="bg-grey-300 py-48 flex justify-center items-center">
        <form className="mx-auto w-96" onSubmit={handleSubmit(submitHandler)}>
          <h2 className="mb-4 text-2xl">Увійдіть в свій аккаунт</h2>
          <div className="mb-4">
            <Input
              id="email"
              label="Е-мейл"
              placeholder="Е-мейл"
              register={register}
              errors={errors}
              options={{
                required: 'Будь ласка, введіть е-мейл',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Будь ласка, введіть правильний е-мейл',
                },
              }}
              autoFocus
            />
          </div>

          <div className="mb-4">
            <Input
              id="password"
              type="password"
              label="Пароль"
              placeholder="Пароль"
              register={register}
              errors={errors}
              options={{
                required: 'Будь ласка, введіть пароль',
                minLength: { value: 3, message: 'Пароль слабкий' },
              }}
            />
          </div>

          <div className="mb-4">
            <Button variant="secondary-btn">Увійти</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginScreen;
