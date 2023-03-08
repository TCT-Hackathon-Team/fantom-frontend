import { CommonList } from "./CommonList";
import { ProtecteeList } from "./ProtecteeList";
import { Tabs } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { ThresholdForm } from "./ThresholdForm";
import { StyledButton } from "@/common/Button/styles";
import { getAllProtecteeFromGuardianAddress } from "@/services/api/strapi-backend/index";
import { getCurrentAccount } from "@/services/contracts/walletContract";
import {
  Button,
  message,
  Space,
  Modal,
  Input,
  Form,
  Radio,
  Select,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { vote } from "@/services/contracts/walletContract";

interface executeInfoStruct {
  currentOwner: string;
  newOwner: string;
  contractAddress: string;
  threshold: number;
  votedTotal: number;
}

let index = 0;
const sampleDataSourceTest: any = [];
const guardianData = [
  {
    key: "1",
    username: "guardian-1",
    publicAddress: "0xEB0A272172506c6d8f328317a3E7B2567F7a370f",
  },
  {
    key: "2",
    username: "guardian-2",
    publicAddress: "0x376B61ee2cD79ffeb56361bEb579F3393F59A9e5",
  },
  {
    key: "3",
    username: "guardian-3",
    publicAddress: "0xB0E3B66C977AEF974dF02396e0E405DeFc177E01",
  },
];

const guardColumns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Address",
    dataIndex: "publicAddress",
    key: "publicAddress",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text: any, record: any) => (
      <StyledButton onClick={() => console.log("Remove")}>
        {"Remove"}
      </StyledButton>
    ),
  },
];

// const protecteeDataTest = [
//   {
//     title: "Name",
//     dataIndex: "username",
//     key: "username",
//   },
//   {
//     title: "Address",
//     dataIndex: "publicAddress",
//     key: "publicAddress",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//     key: "action",
//     render: (text: any, record: any) => (
//       <StyledButton onClick={() => console.log(record)}>{"Vote"}</StyledButton>
//     ),
//   },
// ];

const protecteeDataTest = [
  {
    id: 1,
    username: "test1",
    email: "0xcbb30b4ff53e45372476ba004a775db606f78eb2@gmail.com",
    provider: "local",
    confirmed: false,
    blocked: false,
    createdAt: "2023-03-06T10:56:10.845Z",
    updatedAt: "2023-03-07T16:32:49.594Z",
    contractAddress: "0xf9cFB68877a13E999C391d3C8cD3848DD10f02d9",
    nonce: "test1",
    publicAddress: "0xCBb30B4Ff53e45372476ba004a775db606F78EB2",
    isInRecovery: false,
    protectee: null,
    guardians: [
      "0xEB0A272172506c6d8f328317a3E7B2567F7a370f",
      "0x376B61ee2cD79ffeb56361bEb579F3393F59A9e5",
      "0x376B61ee2cD79ffeb56361bEb579F3393F59A9e5",
    ],
    identityNumber: "012345678910",
  },
  {
    id: 14,
    username: "thisIsATempTest",
    email: "thisisatemptest@gmail.com",
    provider: "local",
    confirmed: false,
    blocked: false,
    createdAt: "2023-03-07T16:50:59.613Z",
    updatedAt: "2023-03-07T16:50:59.613Z",
    contractAddress: null,
    nonce: "111",
    publicAddress: "0x1EE3A7D3DA9D1C0e6C49F4E90A686b03B8bEa67E",
    isInRecovery: false,
    protectee: null,
    guardians: ["0xEB0A272172506c6d8f328317a3E7B2567F7a370f"],
    identityNumber: null,
  },
];

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//     key: "action",
//     render: (text: any, record: any) => (
//       <StyledButton onClick={() => console.log(record)}>{"Vote"}</StyledButton>
//     ),
//   },
// ];

const GuardianPage = (): JSX.Element => {
  const [threshold] = useState("1");
  const [activeTab] = useState("1");
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [openExecute, setExecuteOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [currRecord, setCurrRecord] = useState({
    id: "",
    username: "",
    email: "",
    blocked: false,
    createdAt: "",
    updatedAt: "",
    contractAddress: null,
    nonce: "",
    publicAddress: "",
    isInRecovery: false,
    protectee: null,
    guardians: [],
    identityNumber: null,
  });
  const [executeInfo, setExecuteInfo] = useState({
    currentOwner: "",
    newOwner: "",
    contractAddress: "",
    threshold: 0,
    votedTotal: 0,
  });
  const [form] = Form.useForm();

  const [items, setItems] = useState([
    "0x1086FB0D03337584613Ce43F9F5430E67B52D56d",
    // "0x57B4F433D943b28e9755b2873ED07c0266fdd603",
  ]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const showModal = () => {
    setOpen(true);
  };

  const onFinish = (values: any) => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    console.log(values);
    const hide = message.loading("Action in progress..", 0);
    console.log("current record", currRecord);
    const contractAddress = currRecord?.contractAddress;
    if (contractAddress) {
      console.log("This account has a contract address");
      vote(contractAddress, values.newOwerAddress).then((res) => {
        console.log(res);
        if (res) {
          setOpen(false);
          setConfirmLoading(false);
          hide();
          message.success("Vote success");
        } else {
          setOpen(false);
          setConfirmLoading(false);
          hide();
          message.error("Vote fail");
        }
      });
    }

    // vote(values.newOwerAddress).then((res) => {
    //   console.log(res);
    //   if (res) {
    //     setOpen(false);
    //     setConfirmLoading(false);
    //     hide();
    //     message.success("Vote success");
    //   } else {
    //     setOpen(false);
    //     setConfirmLoading(false);
    //     hide();
    //     message.error("Vote fail");
    //   }
    // });
  };

  const onExecuteFinish = (values: any) => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    console.log(values);
    const hide = message.loading("Execute in progress..", 0);
    console.log("current record", currRecord);
    const contractAddress = currRecord?.contractAddress;
    if (contractAddress) {
      console.log("This account has a contract address");
      // vote(contractAddress, values.newOwerAddress).then((res) => {
      //   console.log(res);
      //   if (res) {
      //     setOpen(false);
      //     setConfirmLoading(false);
      //     hide();
      //     message.success("Vote success");
      //   } else {
      //     setOpen(false);
      //     setConfirmLoading(false);
      //     hide();
      //     message.error("Vote fail");
      //   }
      // });
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleVote = async (record: any) => {
    // const hide = message.loading("Action in progress..", 0);
    setOpen(true);
    setCurrRecord(record);
    // cal blockchain (vote)
    // call database create recovery status/round

    console.log("vote");
  };

  const handleExecute = async (record: any) => {
    setExecuteOpen(true);
    setCurrRecord(record);
    // Todo: get correct data
    const contractAddress = protecteeDataTest[0].contractAddress;

    console.log("vote");
  };

  const showExecuteModal = () => {
    setExecuteOpen(true);
  };

  const handleExecuteOk = () => {
    setExecuteOpen(false);
  };

  const handleExecuteCancel = () => {
    console.log("Clicked cancel on execute button");
    setExecuteOpen(false);
  };

  const protecteeColumns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "publicAddress",
      key: "publicAddress",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => (
        <StyledButton
          onClick={() => {
            console.log("Status");
          }}
        >
          {"Status"}
        </StyledButton>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <StyledButton
          id="buttonVote"
          onClick={() => {
            handleVote(record);
          }}
        >
          {"Vote"}
        </StyledButton>
      ),
    },
    {
      title: "Execute Recovery",
      dataIndex: "execute",
      key: "execute",
      render: (text: any, record: any) => (
        <StyledButton
          onClick={() => {
            handleExecute(record);
          }}
        >
          {"Execute"}
        </StyledButton>
      ),
    },
  ];

  const tabs = [
    {
      id: "1",
      name: "Guardians List",
      content: <CommonList data={guardianData} columns={guardColumns} />,
    },
    {
      id: "2",
      name: "Protected Account",
      content: (
        <ProtecteeList data={protecteeDataTest} columns={protecteeColumns} />
      ),
    },
  ];

  // Data source
  useEffect(() => {
    getCurrentAccount().then((currAccount) => {
      if (currAccount) {
        getAllProtecteeFromGuardianAddress(currAccount).then((res) => {
          if (res) {
            console.log("datasource", res);

            setDataSource(res);
            console.log("protectee", res);
          }
        });
      }
    });
  }, []);

  // Execute info
  useEffect(() => {}, [dataSource]);

  return (
    <>
      <Modal
        title="Vote For New Owner"
        open={open}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <Input placeholder="Enter new owner's address to vote" /> */}
        {/* <Input
          
          size="large"
          placeholder="Enter new owner address to vote"
          prefix={<UserOutlined />}
        /> */}

        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
          onFinish={onFinish}
        >
          {/* <Form.Item
            name="newOwerAddress"
            label="New Owner Address"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
              {
                pattern: new RegExp(/^0x[a-fA-F0-9]{40}$/),
                message: "Invalid address",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="newOwerAddress"
            label="New Onwer Address"
            hasFeedback
            rules={[
              { required: true, message: "Please select your choice!" },
              {
                pattern: new RegExp(/^0x[a-fA-F0-9]{40}$/),
                message: "Invalid address",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="custom dropdown render"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Add new owner"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add custom owner
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Execute Recovery"
        open={openExecute}
        confirmLoading={confirmLoading}
        onOk={form.submit}
        onCancel={handleExecuteCancel}
        okText="Execute"
      >
        {/* <Input placeholder="Enter new owner's address to vote" /> */}
        {/* <Input
          
          size="large"
          placeholder="Enter new owner address to vote"
          prefix={<UserOutlined />}
        /> */}

        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
          onFinish={onExecuteFinish}
        >
          {/* <Form.Item
            name="newOwerAddress"
            label="New Owner Address"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
              {
                pattern: new RegExp(/^0x[a-fA-F0-9]{40}$/),
                message: "Invalid address",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="newOwerAddress"
            label="New Onwer Address"
            hasFeedback
            rules={[
              { required: true, message: "Please select your choice!" },
              {
                pattern: new RegExp(/^0x[a-fA-F0-9]{40}$/),
                message: "Invalid address",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Choose address to execute"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Add new owner"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add custom owner
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        title="Execute Recovery"
        open={openExecute}
        onOk={handleExecuteOk}
        onCancel={handleExecuteCancel}
        okText="Execute"
      >
        <p>Contract address: ...</p>
        <p>New Owner: ...</p>
        <p>Threshold: ...</p>
        <p>Voted: ...</p>
      </Modal> */}
      <div style={{ margin: 50 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2>Guardian List</h2>
          <p>Define the guardians who can collectively recover your key</p>
        </div>
        <div style={{ width: 400, marginBottom: 30 }}>
          <ThresholdForm threshold={threshold} />
        </div>

        <div style={{ width: 400, marginBottom: 30 }}>
          <StyledButton> Add new guardians</StyledButton>
        </div>

        <Tabs
          tabBarStyle={{
            display: "flex",
            justifyContent: "space-between",
          }}
          defaultActiveKey={activeTab}
          size={"middle"}
          items={tabs.map(({ id, name, content }) => {
            return {
              label: `${name}`,
              key: id,
              children: content,
            };
          })}
        />
      </div>
    </>
  );
};

export default GuardianPage;
