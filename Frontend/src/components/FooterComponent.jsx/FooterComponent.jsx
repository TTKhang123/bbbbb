import React from 'react';
import { Col } from 'antd';
import logo from '../../assets/images/logo.png';
import { WrapperFooter, WrapperImgFooter, WrapperTextFooter } from './style';
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';


const FooterComponent = () => {
  return (
    <>
      <WrapperFooter>
        <WrapperImgFooter span={12}>
          <img src={logo} alt="Logo" />
        </WrapperImgFooter>
        <WrapperTextFooter>
          TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG <br />
          19, Nguyễn Hữu Thọ, Tân Phong, Quận 7, TPHCM <br />
          Liên hệ với chúng tôi: <br />
          <PhoneOutlined style={{ padding: '3px', fontSize: '17px' }} /> 012.3456.789<br />
          <MailOutlined style={{ padding: '3px', fontSize: '17px' }} /> tdtushop@tdt.edu.vn<br />
        </WrapperTextFooter>
        <Col span={1}></Col>
        <Col span={11}>
          <WrapperTextFooter>
            Kết nối với chúng tôi tại: <br />
            <FacebookOutlined style={{ padding: '3px', fontSize: '17px' }} /> <a href="http://surl.li/svlhm">FaceBook</a> <br />
            <InstagramOutlined style={{ padding: '3px', fontSize: '17px' }} /> <a href="http://surl.li/svlla">Instagram</a>
          </WrapperTextFooter>
        </Col>
      </WrapperFooter>
    </>
  )
}

export default FooterComponent