import Hedaer from "@/components/Header"


export default function Settings() {
    const settings={
        username:"jondoe",
        email:"john.doe@example.com",
        teamName:"Development",
        roleName:"Developer"
    }
    const labelStyle=`block text-sm font-medium dark:text-white`
    const textStyle=`mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white`

    return(
        <div className="p-8">
            <Hedaer name="Settings"/>
            <div className=" space-y-4">
                <div>
                <label className={labelStyle}>Username</label>
                <div className={textStyle}>{settings.username}</div>
                </div>
                <div>
                <label className={labelStyle}>Email</label>
                <div className={textStyle}>{settings.email}</div>
                </div>
                <div>
                <label className={labelStyle}>Team Name</label>
                <div className={textStyle}>{settings.teamName}</div>
                </div>
                <div>
                <label className={labelStyle}>Role Name</label>
                <div className={textStyle}>{settings.roleName}</div>
                </div>
            </div>
        </div>
    )

}