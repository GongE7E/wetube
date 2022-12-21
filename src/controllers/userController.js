import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import e from "express";
import { compileClientWithDependenciesTracked } from "pug";

export const getJoin=(req,res)=>res.render("Join",{pageTitle:"Join"});


export const postJoin=async(req,res)=>{
    const{email,username,password,password2,location,name}=req.body;
    const pageTitle="Join";
    if(password !== password2){
        return res.render("join",{
        pageTitle,
        errorMessage:"Password confirmation does not match."});
        
    };
    const exists=await User.exists({$or:[{username},{email}]});
    if(exists){
        return res.status(400).render("join"),{
            pageTitle,
            errorMessage:"This username/email is already taken."
        }
    }try{
        await User.create({
            name,username,email,password,location
        });
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage:error._message,
        });
    }
};


export const getLogin=(req,res)=>res.render("Login",{pageTitle:"Login"});
export const postLogin=async(req,res)=>{
    const {username,password}=req.body;
    const pageTitle="Login";
    const user=await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage:"An account with this username does not exists.",
        });
    }
    const ok= await bcrypt.compare(password,user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage:"Wrong password",
        });
    } 
    req.session.loggedIn=true;
    req.session.user=user;
    return res.redirect("/");
};

export const startGithubLogin=(req,res)=>{
    const baseUrl="https://kauth.kakao.com/oauth/authorize";
    const config={
    client_id:process.env.KO_CLIENT,
    allow_signup:false,
    scope: "read:user user:email",
    };
    const params=new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
export const finishGithubLogin=async(req,res)=>{
    const baseUrl="https://github.com/login/oauth/access_token";
    const config={
        client_id:process.env.GH_CLIENT,
        client_secret:process.env.GH_SECRET,
        code:req.query.code,
    };
    const params=new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}?${params}`;
    const tokenRequest=await(await fetch(finalUrl,{
        method:"POST",
            headers:{
            Accept:"application/json",
        }
    })).json();

if("access_token"in tokenRequest){
    const {access_token}=tokenRequest;
    const apiUrl="https://api.github.com";
    const userData=await(await fetch(`${apiUrl}/user`,{
        headers:{
            Authorization:`token ${access_token}`
        }
    })).json();
    const emailData= await(
        await fetch(`${apiUrl}/user/emails`,{
            headers:{
                Authorization:`token ${access_token}`
},
})
    ).json();
    const emailObj=emailData.find(
    (email)=>email.primary===true && email.verified===true);
if(!emailObj){
    return res.redirect("/login");
}
let user= await User.findOne({email: emailObj.email});
if(!user){
    const user=await User.create({
        name:userData.name,
        avatarUrl:userData.avatar_url,
        username:userData.login,
        email:emailObj.email,
        password:"",
        socialOnly:true,
        location:userData.location,});
    }
    req.session.loggedIn=true;
    req.session.user= user;
    return res.redirect("/");
}else{
return res.redirect("/login");
}   
};




export const see=(req,res)=>res.send("See User");



export const getEdit=(req,res)=>{
    return res.render("edit-profile",{pageTitle:"Edit Profile"});
}
export const postEdit=async(req,res)=>{
    const {session: 
        {user:{_id}
    },
    body:{name,email,username,location}
} =req;
    const updatedUser=await User.findByIdAndUpdate(_id,{
        name,
        username,
        email,
        location,
    },{new:true});
    req.session.user=updatedUser;
        return res.redirect("/users/edit");
    };

export const logout=(req,res)=>{
    req.session.destroy();
    return res.redirect("/");
};

export const startKakaoLogin = (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    console.log(req.params);
    const config = {
    client_id: process.env.KO_CLIENT,
    redirect_uri: "http://localhost:4000/users/kakao/finish",
    response_type: "code",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishKakaoLogin = async (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
    grant_type: "authorization_code",
    client_id: process.env.KO_CLIENT,
    redirect_uri: "http://localhost:4000/users/kakao/finish",
    code: req.query.code, 
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
    await fetch(finalUrl, {
        method: "POST",
        headers:{
            Accept:"application/json",
        }
    })
    ).json();
    if("access_token" in tokenRequest){
        const {access_token}=tokenRequest;
        const apiUrl="https://kapi.kakao.com/v2/user/me";
        const userData=await(await fetch(`${apiUrl}`,{
            headers:{
                Authorization: `Bearer ${access_token}`,
            }
        })
        ).json();
        const kakaoAccount=userData.kakao_account;
        const kakaoProfile=kakaoAccount.profile;

        if(kakaoAccount.is_email_valid===false || kakaoAccount.is_email_verified===false){
            return res.redirect("/login");
        };
        let user = await User.findOne({ email: kakaoAccount.email });
        if(!user){
            user=await User.create({
                name:kakaoProfile.nickname,
                nickname:kakaoProfile.nickname,
                email:kakaoAccount.email,
                socialOnly:true,
                password:"",

            });
        }
            req.session.loggedIn=true;
            req.session.user=user;
            return res.redirect("/");
        }
else{
    res.redirect("/login");
}
};



