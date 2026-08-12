import Title from "./Title";


export default function OurCollection(){
    
    return(
        <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Here are some of our latest collections.
        </p>
      </div>
    </div>
    )
}