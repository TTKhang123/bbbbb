import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperHeaderSub, WrapperInput, WrapperLabel } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSilde";
const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isPending, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }
    const handleOnChangePhone = (value) => {
        setPhone(value)
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }


    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, access_token: user?.access_token })
    }
    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <WrapperHeader>Hồ sơ của tôi</WrapperHeader>
            <WrapperHeaderSub >Quản lý thông tin hồ sơ để bảo mật tài khoản</WrapperHeaderSub >
            <Loading isPending={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Họ và tên</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id={name} value={name} onChange={handleOnChangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                                background: 'green'
                            }}
                            text={'Thay đổi'}
                            styleTextButton={{ color: 'white', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id={email} value={email} onChange={handleOnChangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                                background: 'green'
                            }}
                            text={'Thay đổi'}
                            styleTextButton={{ color: 'white', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">SĐT</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id={phone} value={phone} onChange={handleOnChangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                                background: 'green'
                            }}
                            text={'Thay đổi'}
                            styleTextButton={{ color: 'white', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id={address} value={address} onChange={handleOnChangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                                background: 'green'
                            }}
                            text={'Thay đổi'}
                            styleTextButton={{ color: 'white', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div >
    )

}

export default ProfilePage