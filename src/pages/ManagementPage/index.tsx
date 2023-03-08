import React, { useEffect, useState } from "react";
import { Tabs, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { InfoStatistic } from "./InfoStatistic";
import { TransactionTable } from "./TransactionTable";
import { columns, TransactionDataFormat } from "./MockData";
import {
  getContractAddress,
  getContractBalance,
  getCurrentAccount,
  getUserBalance,
} from "@/services/contracts/walletContract";
import WalletButton from "@/components/WalletButton";
import CreateWalletButton from "@/components/CreateWalletButton";
import allTx from "./../../../mockdata/transactions.json";
import { getContractAddressByUserAddress } from "@/services/api/strapi-backend/index";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { log } from "console";
import { StyledButton } from "@/common/Button/styles";

// import { CreateWalletButton } from "@/components/CreateWalletButton/index";

const txArray = allTx as unknown as TransactionDataFormat[];

// Todo: Crawl data from backend
const tabs = [
  {
    id: "1",
    name: "Wallet",
    content: (
      <TransactionTable rowKey={"txHash"} data={txArray} columns={columns} />
    ),
  },
  {
    id: "2",
    name: "Smart Contract",
    content: (
      <TransactionTable rowKey={"txHash"} data={txArray} columns={columns} />
    ),
  },
];

const ManagementPage = (): JSX.Element => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userBalance, setUserBalance] = useState("0");
  const [scAddress, setScAddress] = useState("");
  const [scBalance, setScBalance] = useState("0");
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentAccount().then((currAccount) => {
      if (currAccount) {
        setCurrentAccount(currAccount);
        getUserBalance().then((ethBalance) => {
          if (ethBalance) {
            setUserBalance(ethBalance);
          }
        });

        getContractAddressByUserAddress(currAccount).then((contractAddress) => {
          console.log("contract address", contractAddress);

          if (contractAddress !== "") {
            setScAddress(contractAddress);

            console.log("Yeyyy");

            getContractBalance(contractAddress).then((scBalance) => {
              if (scBalance) {
                setScBalance(scBalance);
              }
            });
          }
        });
      }
    });
  }, []);

  const [activeTab, setActiveTab] = useState("1");

  const onchangeTab = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  const reloadBalance = async () => {
    getUserBalance().then((ethBalance) => {
      if (ethBalance) {
        setUserBalance(ethBalance);
        if (scAddress) {
          getContractBalance(scAddress).then((scBalance) => {
            if (scBalance) {
              setScBalance(scBalance);
            }
          });
        }
      }
    });
    // setUserBalance(newBalance);
  };

  return (
    <>
      {isNotNullOrEmpty(scAddress) ? (
        <>
          <div style={{ margin: 50 }}>
            {/* <CustomButton onClick={async () => {}}>Deposit</CustomButton>
      <CustomButton>Withdraw</CustomButton> */}
            {/* Prompts */}
            {/* Wallet action */}
            <WalletButton
              title="Deposit"
              type="deposit"
              reloadBalance={reloadBalance}
              contractAddress={scAddress}
            ></WalletButton>
            &nbsp;&nbsp;&nbsp;
            <WalletButton
              title="Withdraw"
              type="withdraw"
              reloadBalance={reloadBalance}
              contractAddress={scAddress}
            ></WalletButton>
            {/* Tx table */}
            {activeTab === "1" ? (
              <InfoStatistic balance={userBalance} address={currentAccount} />
            ) : (
              <InfoStatistic balance={scBalance} address={scAddress} />
            )}
            <Tabs
              tabBarStyle={{
                display: "flex",
                justifyContent: "space-between",
              }}
              defaultActiveKey={activeTab}
              size={"middle"}
              onChange={onchangeTab}
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
      ) : (
        <>
          {/* {navigate("/create-wallet")} */}
          <Result
            icon={<SmileOutlined />}
            title="Start by creating your own wallet now!"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  navigate("/create-wallet");
                }}
              >
                Create wallet
              </Button>
            }
          />
          {/* <StyledButton
            icon="plus"
            onClick={() => {
              navigate("/create-wallet");
            }}
          >
            Create Wallet
          </StyledButton> */}
        </>
      )}
    </>
  );
};

export default ManagementPage;

function componentDidMount() {
  throw new Error("Function not implemented.");
}

// function isNullOrEmpty(str: any) {
//   return !str || 0 === str.length;
// }

function isNotNullOrEmpty(str: any) {
  return str && 0 !== str.length;
}
