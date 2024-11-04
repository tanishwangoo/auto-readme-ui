import ViewAIOutput from "./viewAIoutput";
import { Suspense } from "react";
function Fallback() {
    return <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
        <div className="loader"></div>
    </div>
}

export default function Page() {
    return (
        <>
            <Suspense fallback={<Fallback />}>
                <ViewAIOutput/>
            </Suspense>
        </>
    )
}