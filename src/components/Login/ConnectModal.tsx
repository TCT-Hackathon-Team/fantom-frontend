import {Button, Modal, Space} from "antd";
import {WalletModalProps} from "@/common/types";
import {useDispatch} from "react-redux";
import {connectWallet} from "@/stores/auth/authSlice";
import {useNavigate} from "react-router-dom";

const wallets = [{key: "1", name: "Metamask"}, {key: "2", name: "Coinbase"}];

export const ConnectModal = ({isOpen, onClose}: WalletModalProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const listItems = wallets.map(({key, name}) =>
        // @ts-ignore
        <Button key={key} onClick={() => dispatch(connectWallet(navigate))} size={"large"} type="primary" block
                shape="round">
            {name}
        </Button>
    );

    return (
        <Modal
            footer={[<Button shape="round" type="primary" danger onClick={onClose}>Return</Button>]}
            centered title="Select Wallet" open={isOpen} onCancel={onClose}>
            <Space direction="vertical" style={{width: '100%'}}>
                {listItems}
            </Space>
        </Modal>
    );
}