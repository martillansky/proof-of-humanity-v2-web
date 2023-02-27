import React from "react";

interface ProgressProps {
  value: number;
  label: string;
}

const Progress: React.FC<ProgressProps> = ({ value, label }) => (
  <div className="mt-2 flex flex-col items-center">
    <div className="mb-1">{label}</div>
    <div className="w-full h-2 mb-4 bg-slate-200 rounded-full">
      <div
        className="h-full bg-lime-500 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default Progress;
