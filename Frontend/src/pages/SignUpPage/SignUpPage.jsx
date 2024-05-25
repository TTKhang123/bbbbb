import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logoweb.jpg'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as message from '../../components/Message/Message'
import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import logoutImage from '../../assets/images/login_logout.jpg'
const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSignIn = () => {
    navigate('/SignInPage')
  }
  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword })
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${logoutImage})`, height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <Image src={imageLogo} preview={false} alt="iamge-logo" height="203px" width="203px" />
          <p style={{ fontSize: '14px', fontStyle: 'italic', fontWeight: 'bold' }}>Mua sắm tại TDTU SHOP</p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>TON DUC THANG SHOP</h1>
          <h2>Đăng ký tài khoản</h2>
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
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword} />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{ background: 'red', width: '100%', height: '45px', marginTop: '10px' }}
              text={'Đăng ký'}
              styleTextButton={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
            ></ButtonComponent>
          </Loading>
          <p style={{ fontSize: '14px', fontWeight: 400 }}>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage