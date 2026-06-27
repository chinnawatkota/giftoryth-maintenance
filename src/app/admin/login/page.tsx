import { loginAdmin } from '../actions';

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-main-white px-4 text-shadow-black">
      <form action={loginAdmin} className="w-full max-w-sm border border-shadow-black/10 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-light">Admin Login</h1>
        <div className="mt-6">
          <label htmlFor="password" className="text-sm font-light">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-2 w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon"
          />
        </div>
        {error && <p className="mt-3 text-sm text-main-red">Invalid admin password.</p>}
        <button
          type="submit"
          className="mt-6 w-full bg-maroon px-4 py-2 text-sm font-light uppercase tracking-wide text-main-white"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
