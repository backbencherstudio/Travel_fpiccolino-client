import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/about.jpg";
import logo from '../../assets/logo.svg';
const Login = () => {
  return (
<ParentAuthComponent>
    <div className="grid grid-cols-5 h-full ">
<div className="col-span-2">
<img className="h-full w-full object-cover" src={heroImage} alt="" />
</div>
<div className="h-full w-full col-span-3">
    <div className="m-[120px]">
    <img src={logo} alt="" />
    <h1 className="font-extrabold text-[32px] mt-10">Welcome back</h1>
    <h5 className="text-[#72777F] text-[16px] mt-3">
    Welcome back! Please enter your details.
    </h5>
    <div>
                <p className="text-[18px] font-medium mt-5 mb-3">Email</p>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                />
              </div>
    </div>

</div>
    </div>
</ParentAuthComponent>
  );
};

export default Login;
