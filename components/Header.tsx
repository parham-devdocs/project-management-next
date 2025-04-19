
type Props={
    name:string
    buttonComponent?:any
    isSmallText?:boolean
}

export default function Hedaer({name,buttonComponent,isSmallText=false}:Props) {
    return (
<div className=" my-5 flex w-full items-center justify-between">
    <h1 className={`${isSmallText? "text-lg":"text-2xl"} font-semibold dark:text-white`}>{name}</h1>
    {buttonComponent}
</div>
    )
}