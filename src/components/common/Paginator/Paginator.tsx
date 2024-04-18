import React, {FC, useState} from "react"
import style from "./paginator.module.css"
import cn from "classnames"

type Props = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}


const Paginator: FC<Props> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortiionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={style.container}>
            {portionNumber > 1 &&
                <>
                    <button onClick={() => {
                        setPortionNumber(1)
                    }}>&lt;&lt;
                    </button>

                    <button onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>PREV
                    </button>
                </> }

            {pages
                .filter(p=> p>= leftPortiionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span key={p}
                             className={cn ({[style.selectedPage]: currentPage === p}, style.pageNumber)}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}
                > {p} </span>
            })}

            {portionCount > portionNumber &&
                <>
                    <button onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>NEXT
                    </button>
                    <button onClick={() => {
                        setPortionNumber(portionCount)
                    }}>&gt;&gt;
                    </button>
                </>}
        </div>
    )
}

export default Paginator