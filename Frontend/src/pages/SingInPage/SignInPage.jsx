import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { WrapperContainerLeft, WrapperContainerRight, /*WrapperContainerRight*/ WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logoweb.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slides/userSilde'
import loginImage from '../../assets/images/login_logout.jpg'
const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const location = useLocation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    const navigate = useNavigate()

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
    }


    const handleNavigateSignUp = () => {
        navigate('/SignUpPage')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
        console.log('SignInPage', email, password)

    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${loginImage})`, height: '100vh' }}>
            <div style={{ width: '800px', height: '400px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <Image src={imageLogo} preview={false} alt="iamge-logo" height="200px" width="200px" />
                    <p style={{ fontSize: '14px', fontStyle: 'italic', fontWeight: 'bold' }}>Mua sắm tại TDTU SHOP</p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>TON DUC THANG SHOP</h1>
                    <h2>Đăng nhập vào tài khoản</h2>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="email" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnchangePassword}
                        />

                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{ background: '#18695F', width: '100%', height: '45px', marginTop: '10px', borderRadius: '8px  ' }}
                            text={'Đăng nhập'}
                            styleTextButton={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}
                        ></ButtonComponent>
                    </Loading>
                    <p style={{ fontSize: '14px', fontWeight: 400 }}>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>
                    <h3 style={{ fontStyle: 'italic', textAlign: 'center' }}>Mua sắm tại TDTU SHOP</h3>
                </WrapperContainerRight>
                {/* <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="iamge-logo" height="200px" width="200px" />
                    <h4>Mua sắm tại TDTU SHOP</h4>
                </WrapperContainerRight> */}
            </div>
        </div>
    )
}

export default SignInPage