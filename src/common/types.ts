import { ColumnsType } from "antd/es/table";

export interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

export interface InfoData {
  balance: string;
  address: string;
}

export interface TransactionTableData {
  data: TransactionData[];
  columns: ColumnsType<TransactionData>;
}

// export interface TransactionData {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

export interface TransactionData {
  txHash: string;
  txType: string;
  value: number;
  // tags: string[];
}

export interface GuardianTableData {
  data: GuardianData[];
  columns: ColumnsType<GuardianData>;
}

export interface GuardianData {
  key: string;
  name: string;
  address: string;
}

export interface WalletModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export interface ButtonProps {
  type?: String;
  color?: string;
  fixedWidth?: boolean;
  name?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface SvgIconProps {
  src: string;
  width: string;
  height: string;
}

export interface InputProps {
  name: string;
  placeholder: string;
  t: any;
  type?: string;
  value?: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export interface validateProps {
  name: string;
  message: string;
  email: string;
}

export interface Auth {
  accessToken: string;
}

export interface Account {
  id: string;
  name: string;
  walletAddr: string;
  smartContractAddr: string;
}

export const truncate = (
  text: string,
  startChars: number,
  endChars: number,
  maxLength: number
) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};
