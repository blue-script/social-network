import React, {FC} from "react"
import styles from "./paginator.module.css"

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


const Paginator: FC<PaginatorPropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    // for (let i = 1; i <= pagesCount; i++) {
    for (let i = pagesCount - 10; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(p => {
                return <span key={p}
                             className={currentPage === p ? styles.selectedPage : ""}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}
                > {p} </span>
            })}
        </div>
    )
}

export default Paginator