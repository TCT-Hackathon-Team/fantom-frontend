import React, {CSSProperties, useState} from "react";
import {Button, Modal, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {disconnect, selectAccount} from "@/stores/auth/authSlice";
import {Account, truncate} from "@/common/types";
import {CopyOutlined, GlobalOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";

const styleInside: CSSProperties = {
    backgroundColor: '#90CDF4',
    borderRadius: 5,
    padding: 8,
    marginLeft: 2,
    cursor: "pointer"
}

// @ts-ignore
const ProfileModal = ({isModalOpen, onClose, account}): JSX.Element => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <>
            <Modal title="Account" open={isModalOpen} onCancel={onClose} footer={null}>
                <div style={{marginBottom: 30}}>
                    <span>
                        Connect with Metamask
                        <Button onClick={() => {
                            dispatch(disconnect())
                            navigate("/")
                        }} style=
                                    {{
                                        borderRadius: 20,
                                        position: "absolute",
                                        right: 20
                                    }}>Disconnect</Button>
                    </span>
                </div>

                <span style={{marginRight: 50, fontSize: 24}}>{truncate(account.walletAddr, 4, 2, 9)}</span>

                <span><CopyOutlined/> Copy Address</span>
                <span style={{marginLeft: 50}}><GlobalOutlined/> View on internet</span>

                <div style={{marginTop: 50}}>
                    <span>
                        License key: 07xxx12
                        <Button style=
                                    {{
                                        borderRadius: 20,
                                        position: "absolute",
                                        right: 20
                                    }}>Change</Button>
                    </span>
                </div>
            </Modal>
        </>
    )
}

const Profile = (): JSX.Element => {
    const account: Account = useSelector(selectAccount)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <ProfileModal isModalOpen={isModalOpen} onClose={handleCancel} account={account}/>
            <span style={styleInside} onClick={showModal}>
                <Tag color="cyan">FTM</Tag>
                {truncate(account.walletAddr, 4, 2, 9)}
            </span>
        </>
    )
}

export default Profile