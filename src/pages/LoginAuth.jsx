import Login from "../components/Login";

const LoginAuth = () => {
  return (
    <div className="flex justify-center items-center gap-12 w-screen h-screen">
      <div>
        {/* <img src={Logo} alt="" /> */}
        <h1 className="text-[3rem]">Connectify Media</h1>
        <h6 className="text-[0.85rem]">
          Explore the ideas throughout the world
        </h6>
      </div>
      <Login />
    </div>
  );
};

export default LoginAuth;
