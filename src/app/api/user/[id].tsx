import { createRouter } from "next-connect";
import  type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import UserService from "@/services/userService";

interface UserRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<UserRequest, NextApiResponse>();

router.get( async (req: UserRequest, res: NextApiResponse) => {  
    const token = await getToken({ req });
    if(!token) return res.status(401).json({message: "Unauthorized"});
    if(token.sub !== req.query.id) return res.status(401).json({message: "Unauthorized"});

    const user = await UserService.findById(req.query.id);
    return res.status(200).json(user);
});

router.put( async (req: UserRequest, res: NextApiResponse) =>{
    const token = await getToken({ req });
    if(!token) return res.status(401).json({message: "Unauthorized"});
    if(token.sub !== req.query.id) return res.status(401).json({message: "Unauthorized"});

    const user = await UserService.update(req.query.id, req.body);
    return res.status(200).json(user);
});

router.delete( async (req: UserRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    if(!token) return res.status(401).json({message: "Unauthorized"});
    if(token.sub !== req.query.id) return res.status(401).json({message: "Unauthorized"});

    try{
        const user = await UserService.delete(req.query.id);
        return res.status(200).json(user);
    }catch{
        return res.status(500).json({message: "Resource to delete not found"});
    }
});

export default router.handler({
    onNoMatch(req: UserRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});