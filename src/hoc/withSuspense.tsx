import React, {ComponentType, Suspense} from "react";
import Preloader from "../components/common/Preloader/Preloader";

export function withSuspense<T extends React.ComponentType<any>>(Component: ComponentType<T>) {
    return (props: React.ComponentProps<T>) => {
        return <Suspense fallback={<Preloader/>}>
            <Component {...props as T}/>
        </Suspense>
    }
}