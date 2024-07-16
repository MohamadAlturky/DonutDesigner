import swal from 'sweetalert';
import Swal from 'sweetalert2';
export default async function HandleDoubleClickPoolNode(node, nodes) {
    console.log(nodes);
    // let copiedNodes = [...nodes];
    let copiedNodes = nodes.map((x) => x);
    await swal("Choose an operation on the pool " + node.id, {
        buttons: {
            remove: {
                text: "Remove",
                className: "warning"
            },
            edit: {
                text: "Edit",
                className: "edit"
            },
            addSwimlane: {
                text: "Add Swimlane",
            },
        },
    }).then(async (value) => {
        switch (value) {
            case "addSwimlane":
                await swal({
                    text: 'Add Swimlane To The Pool' + node.id,
                    content: { element: "input" },
                    button: {
                        text: "Add",
                    },
                }).then(name => {
                    if (!name) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            width:430,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });
                        Toast.fire({
                            icon: "error",
                            title: "Please Specify The Swimlane Name 📌",
                        });
                    }
                    else {
                        /////////////////////////////////////////////
                        let newNode = {
                            id: name,
                            data: { label: `${name}` },
                            resizable: true,
                            type:"swimlane",
                            style: {
                                // width: 50,
                                // height: 20,
                                backgroundColor: 'rgba(50, 192, 247, 0.2)',
                                // borderRadius: '3px',
                                border: '1px solid #1a192b'
                            },
                            parentId:node.id,
                            position: { x: 51, y: 0 },
                            extent: "parent"
                        }
                        copiedNodes = copiedNodes.concat(newNode)
                        /////////////////////////////////////////////
                    }
                })
                break;

            case "edit":
                await swal({
                    text: 'Change the Pool \`'+ node.id +'\` Name',
                    content: { element: "input" },
                    button: {
                        text: "Edit",
                    },
                }).then(name => {
                    if (!name) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            width:430,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });
                        Toast.fire({
                            icon: "error",
                            title: "Please Specify The New Name 📌",
                        });
                    }
                    else {
                        //////////////////////////////////////////////////

                        copiedNodes = copiedNodes.filter(e => e.id !== node.id);
                        node.id = name
                        node.data.label = name
                        copiedNodes = copiedNodes.concat(node)
                        //////////////////////////////////////////////////
                    }
                })
                break;
            case "remove":
                /////////////////////////////////////////////



                /////////////////////////////////////////////
                break;
            default:
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
    });
    return copiedNodes
}