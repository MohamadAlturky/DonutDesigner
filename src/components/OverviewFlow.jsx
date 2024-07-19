import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import { ControlButton } from "@xyflow/react";

import apiUrl from "../configurations/apiConfiguration.json";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState, DragEvent } from "react";

import swal from "sweetalert";
import Swal from "sweetalert2";
import BuildNode from "../services/DragAndDrop/DragAndDropService";
import HandleDoubleClick from "../services/DoubleClick/DoubleClickHandler";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import AnnotationNode from "./AnnotationNode";
import ToolbarNode from "./ToolbarNode";
import SwimlaneNode from "./SwimlaneNode";
import PoolNode from "./PoolNode";
import CircleNode from "./CircleNode";
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge";
import Activity from "./Activity";
import Gateway from "./Gateway";

import "@xyflow/react/dist/style.css";
import "../css/overview.css";

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  pool: PoolNode,
  circle: CircleNode,
  textinput: TextNode,
  swimlane: SwimlaneNode,
  activity: Activity,
  gateway: Gateway,
};

const edgeTypes = {
  button: ButtonEdge,
};
const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeClassName = (node) => node.type;
import Sidebar from "./Sidebar";
import styles from "../css/dnd.module.css";
const OverviewFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onInit = (rfi) => setReactFlowInstance(rfi);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDrop = async (event) => {
    console.log(nodes);

    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let node = await BuildNode(position, type, nodes);
      console.log(node);
      if (node != null) {
        setNodes((nds) => nds.concat(node));

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "OK",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "No Action Applied",
        });
      }
    }
  };

  /////
  const onNodeDoubleClick = async (_, node) => {
    let _newNodes = await HandleDoubleClick(node, nodes);
    console.log("_newNodes");
    console.log(_newNodes);
    setNodes(_newNodes);
  };
  /////

  document.addEventListener("keyup", (event) => {
    if (event.key == "q" && event.ctrlKey) {
      swal({
        text: "Talk with the Diagram 🤖",
        content: { element: "textarea" },
        button: {
          text: "go",
        },
      }).then((name) => {
        if (!name) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            width: 530,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "warning",
            title: "Please Give Me Your Instruction In The Next Time🤖",
          });
        } else {
        }
      });
    }
    console.log(
      `Key: ${event.key} with ctrlKey ${event.ctrlKey} has been pressed`
    );
  });
  return (
    <>
      {/* <button
        onClick={() => {
          const axiosInstance = axios.create();
          let data = {
            process_description:
              "Consider a process for purchasing items from an online shop. The user starts an order by logging in to their account. Then, the user simultaneously selects the items to purchase and sets a payment method. Afterward, the user either pays or completes an installment agreement. Since the reward value depends on the purchase value, After selecting the items, the user chooses between multiple options for a free reward. this step is done after selecting the items, but it is independent of the payment activities. Finally, the items are delivered. The user has the right to return items for exchange. Every time items are returned, a new delivery is made.",
          };
          axiosInstance
            .post(apiUrl.baseUrl + "/pools/extract", data)
            .then((res) => {
              console.log(res.data);
              setNodes(res.data.nodes);
            })
            .catch((err) => console.log(err));
        }}
      >
        goooooooooooooo
      </button> */}
      <div className={styles.dndflow}>
        <div className={styles.wrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={onNodeDoubleClick}
            onConnect={onConnect}
            fitView
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={onInit}
            className="overview"
            maxZoom={Infinity}
            zoomOnDoubleClick={false}
          >
            <MiniMap zoomable pannable nodeClassName={nodeClassName} />
            {/* <Controls /> */}
            <Controls showFitView={false} showInteractive={false}>
              <ControlButton
                title="fit content"
                onClick={() =>
                  reactFlowInstance.fitView({ duration: 1200, padding: 0.3 })
                }
              >
                <EnterFullScreenIcon />
              </ControlButton>
            </Controls>
            <Background />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default OverviewFlow;
