export function Productcard(props) {
    return (
        <>
            <div className="h-[200px] w-[200px] bg-slate-500">
                <h1 className="text-blue-700 text-center">{props.title}</h1>
                <p className="text-white text-center">{props.msg}</p>
            </div>
        </>
    )
}

Pdata = [
    {
        title: "SV",
        msg: "welcome"
    }
]

export function Psection() {
    return (
        <>
            <section>
                <div className="max-w-[100px]">
                    <div className="w-[70px] mx-auto p-1 grid grid-cols-1">
                        {Pdata.map(content){
                        return(
                        <Productcard title={content.title} msg={content.msg} />
                        )
                     }
                    }
                    </div>
                </div>
            </section>
        </>
    )
}


