import {PropsWithChildren, Suspense} from 'react'
import {Content} from '@/widgets/layout/ui/docs/organisms'
import {Loader} from '@/shared'

type Props = PropsWithChildren & {
    // title: string
}

export async function NewsLayoutWithoutNavbar({children}: Props) {
    return (
        <Suspense fallback={<Loader/>}>
            <div className={'container'}>
                {/* <NewsNavbar title={title}/> */}
                <Content>
                    {children}
                </Content>
            </div>
        </Suspense>
    )
}