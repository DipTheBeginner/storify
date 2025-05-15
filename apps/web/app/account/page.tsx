import { authOption } from "app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"



export default async function AccountPage(){

    const session=await getServerSession(authOption);

    return (
        <div>
            
        </div>
    )
}