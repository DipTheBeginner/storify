

interface CreateStoryComponentProps{
    title:String,
    content:string,

}



export default function CreateStoryComponent(){

    return(
        <div className="flex flex-row">
            <input type="text" placeholder="Title"  />
            <input type="text" placeholder="" />

        </div>
    )

}