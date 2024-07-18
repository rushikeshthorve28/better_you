import { connectToDatabase } from "@/lib/dbconfig"

const test = async () => {

    const connected = await connectToDatabase();

    return <div>
        <h1>{`${connected}`}</h1>
    </div>
}

export default test