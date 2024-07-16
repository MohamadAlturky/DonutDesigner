import BuildPoolNode from "./PoolBuilder"

export default async function BuildNode (position,type) {
    
    if(type == "pool")
    {
        return await BuildPoolNode(position,type);
    }

}

