import { FormControl, InputLabel, Select } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<FieldValues, object> | undefined;
  defaultValue: any;
}
const ReactHookFormSelect: React.FC<Props> = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={() => (
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        )}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
