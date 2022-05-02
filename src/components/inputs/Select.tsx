import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import { useMemo } from "react";

type Option = { label: string; value: string };

const normaliseOption = (value: string | Option) =>
  typeof value === "string" ? { label: value, value } : value;

export interface SelectProps<O extends Option = Option>
  extends Omit<MuiSelectProps, "children"> {
  options: O[] | string[];
  allowEmpty?: boolean;
}

export const Select = <O extends Option = Option>({
  options,
  allowEmpty,
  sx,
  ...selectProps
}: SelectProps<O>) => {
  const normalised = useMemo(() => {
    const result = options.map(normaliseOption);
    return allowEmpty && !result.find(({ value }) => value === "")
      ? [{ label: "", value: "" }, ...result]
      : result;
  }, [allowEmpty, options]);

  return (
    <FormControl sx={sx}>
      {selectProps.label && (
        <InputLabel>
          {selectProps.label}
          {selectProps.required ? " *" : ""}
        </InputLabel>
      )}
      <MuiSelect {...selectProps}>
        {normalised.map(({ label, value }) => (
          <MenuItem
            key={value}
            value={value}
            sx={{ visibility: value === "" ? "hidden" : "visible" }}
          >
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
