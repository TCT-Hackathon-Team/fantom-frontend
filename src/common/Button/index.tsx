import {StyledButton} from "./styles";
import {ButtonProps} from "../types";

export const CustomButton = ({
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
