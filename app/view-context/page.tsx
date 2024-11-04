import { Suspense } from 'react'
import ViewContent from './viewcontext'

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
function ViewContextFallback() {
    return <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
        <div className="loader"></div>
    </div>
}

export default function Page() {
    return (
        <>
            <Suspense fallback={<ViewContextFallback />}>
                <ViewContent />
            </Suspense>
        </>
    )
}