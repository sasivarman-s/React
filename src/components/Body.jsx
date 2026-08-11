import "./Body.css"


function Body(detail) {
    return (
        <>
            <div className="bg-cyan-200 h-[150px] w-[150px] p-5 border rounded-full m-[20px] border-blue-500 border-[5px]">
                <h1 className="text-center text-4xl">{detail.name}</h1>
                <p className="text-center text-2xl">{detail.description}</p>
            </div>
        </>
    
    )
}

export default Body