
"use client";

import React from "react";
import FormSelect from "@/components/ui/FormSelect";
import { FormFieldChangeHandler, workspaceOptions } from "../types";

interface WorkspaceFieldProps {
  value: string;
  error?: string;
  onChange: FormFieldChangeHandler;
}

const WorkspaceField: React.FC<WorkspaceFieldProps> = ({ value, error, onChange }) => {
  return (
    <FormSelect
      id="workspace"
      name="workspace"
      label="Instantly Workspace"
      required
      value={value}
      onChange={onChange}
      error={error}
      options={workspaceOptions}
    />
  );
};

export default WorkspaceField;
