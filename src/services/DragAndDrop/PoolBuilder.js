import swal from 'sweetalert';
export default async function BuildPoolNode(position,type) {
    let title;
    let stayActive = title == "" || title == undefined;
    while (stayActive) {
        await swal({
            text: 'Enter The Pool Name',
            content: { element: "input" },
            button: {
                text: "Add",
            },
        }).then((name) => {
            title = name;
            stayActive = title == "" || title == undefined;
        });
        if (title == "" || title == undefined) {
            await swal({
                text: 'Please Specify The Pool Name 📌',
                buttons: {
                    close: {
                        text: "cancel",
                        className: "swal-button swal-button--confirm swal-button--danger"
                    },
                    ok: {
                        text: "ok",
                        className: "ok"
                    }
                },
            }).then((name) => {
                if (name == "close") {
                    stayActive = false;
                }
                else {
                }
            });
        }
    }
    if (title == "" || title == undefined){
        return null
    }
    else{
        return {
            id: title,
            type,
            position,
            data: { label: `${title}` },
            resizable: true,
            style: {
                width: 500,
                height: 200,
                backgroundColor: 'rgba(208, 192, 247, 0.2)',
                borderRadius: '3px',
                border: '1px solid #1a192b'
            }
        };
    }
}