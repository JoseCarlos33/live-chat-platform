import { InputBase, TextField } from "@mui/material";
import styled from "styled-components";
import { alpha } from "@mui/material/styles";
import theme from "@/config/theme";
theme;
export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-width: 0;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;

    &:hover fieldset {
      border: none;
    }

    &.Mui-focused fieldset {
      border: none;
    }
  }

  & .MuiInputLabel-root {
    transform: translate(0, -1.5rem) scale(1);
    pointer-events: none;
  }

  & .MuiInputLabel-shrink {
    transform: translate(0, -1.5rem) scale(1);
  }

  & .MuiFormHelperText-root {
    margin-left: 0;
  }
`;
