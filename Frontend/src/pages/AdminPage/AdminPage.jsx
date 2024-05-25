import { AppstoreFilled, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'
import { useActionData } from 'react-router-dom';
import { spaceChildren } from 'antd/es/button';

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreFilled />),

    ];


    const rootSubmenuKey = ['user', 'product'];
    const [openKeys, setOpenKeys] = useState(['user']);
    const [keySelected, setKeySelected] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <></>
        }

    }

    const onOpenChange = (keys) => {
        const latestOpenkey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKey.indexOf(latestOpenkey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenkey ? [latestOpenkey] : [])
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    return (
        <div style={{ display: 'flex' }}>
            < Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 256,
                }}
                items={items}
                onClick={handleOnClick}
            />
            <div style={{ flex: 1, padding: '10px' }}>
                {renderPage(keySelected)}
            </div>
        </div>
    )

}

export default AdminPage