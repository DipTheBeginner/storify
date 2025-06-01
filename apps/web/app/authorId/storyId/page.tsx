import axios from "axios";




interface StoryPageProps{
    params:{
        authorId:string,
        storyId:string
    }
}


export default async function StoryPage({params}:StoryPageProps){
    const{authorId,storyId}=params;

    try{
        const response=await axios.get(`http://localhost:8080/`)

    }catch(eror){

    }

}