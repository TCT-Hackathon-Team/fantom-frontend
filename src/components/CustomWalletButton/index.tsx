import { StyledButton } from "./styles";
import { ButtonProps } from "../../common/types";

export const CustomWalletButton = ({
  type,
  color,
  fixedWidth,
  children,
  onClick,
}: ButtonProps) => (
  <StyledButton
    color={color}
    fixedWidth={fixedWidth}
    onClick={onClick}
    type={type}
  >
    {children}
  </StyledButton>
);
