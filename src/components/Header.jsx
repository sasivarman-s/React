function Header1(props){
    return (
        <>
        <h1 className="text-blue-500 text-center text-6xl">{props.intro}</h1>
        <h2 className="text-center text-blue-300 text-3xl">{props.msg}</h2>
        </>
    )
}
export default Header1