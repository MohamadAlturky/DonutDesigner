import { memo } from "react";
import { NodeResizer } from "@xyflow/react";

function PoolNode({ data, selected }) {
  return (
    <>
      <NodeResizer minWidth={500} isVisible={selected} minHeight={200} />
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: "50px",
          height: "100%",
          borderRight: "1px solid",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "50px",
            justifyContent: "center",
            alignItems: "center",
            transform: "rotate(-90deg)",
          }}
        >
          {data.label}
        </div>
      </div>
    </>
  );
}

export default memo(PoolNode);
