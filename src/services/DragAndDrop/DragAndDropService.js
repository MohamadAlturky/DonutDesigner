import BuildGatewayNode from "./BuildGatewayNode"
import BuildPoolNode from "./PoolBuilder"
import BuildActivityNode from "./BuildActivityNode"

export default async function BuildNode(position, type, nodes) {

    if (type == "pool") {
        return await BuildPoolNode(position, type, nodes);
    }
    if (type == "activity") {
        return await BuildActivityNode(position, type, nodes);
    }
    if (type == "gateway") {
        return await BuildGatewayNode(position, type, nodes);
    }
    return null
}

