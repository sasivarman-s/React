import "./Body.css"


function Courselist() {
    courselist = [
        {
            name : "react",
            rating : "4.5"
        },
        {
            name : "angular",
            rating : "4.0"
        },
        {
            name : "vite",
            rating : "4.2"
        }
    ]
    var course = Courselist.map((card)=><course name={card.name} rating={card.rating}/>)
    return (
        <>
        {course
        }
            {/* <div className="bg-cyan-200 h-[150px] w-[150px] p-5 border rounded-xl m-[20px] border-blue-500 border-[5px]">
                <h1 className="text-center text-4xl">{card.name}</h1>
                <p className="text-center text-2xl">{card.rating}</p>
            </div> */}
        </>

    )
}

export default Courselist