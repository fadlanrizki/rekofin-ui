import Logo from "../components/shared/logo/Logo";

const Login = () => {
  return (
    <div className="w-full min-h-screen flex">
      <div className="h-screen w-8/12 bg-[#003366] p-5 text-white flex flex-col justify-between">
        <div className="">
          <Logo />
        </div>
      </div>
      <div className="flex-1 bg-white">test</div>
    </div>
  );
};

export default Login;
