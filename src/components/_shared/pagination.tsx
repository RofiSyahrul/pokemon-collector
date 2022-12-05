import type { AriaAttributes, ReactNode } from 'react'
import { useCallback, useMemo } from 'react'

import Link from 'next/link'

import ChevronIcon from '@/icons/chevron'

import styles from './pagination.module.css'

interface PaginationProps {
  activePage: number
  buildHref(page: number): string
  totalPage: number
}

interface PageNavItem {
  disabled: boolean
  page: number
  variant: 'prev' | 'next'
}

interface PageNumberItem {
  page: number
  variant: 'current' | 'page'
}

type PageItem = PageNumberItem | PageNavItem | { variant: 'ellipsis' }

const FIRST_PAGE = 1
const MAX_PAGE_LIST = 7
const RESERVED_PAGE_LIST = 2 // first page, last page
const MAX_ELLIPSIS = 2 // left and right ellipsis
const MAX_RESERVED_PAGE_LIST = RESERVED_PAGE_LIST + MAX_ELLIPSIS

const TOTAL_MID_PAGE_LIST = MAX_PAGE_LIST - MAX_RESERVED_PAGE_LIST
const ELLIPSIS_INDEX_LEFT = FIRST_PAGE + 1
const ELLIPSIS_INDEX_RIGHT = MAX_PAGE_LIST - 1

function buildEllipsisablePageList(params: {
  activePage: number
  nextPage: PageNavItem
  prevPage: PageNavItem
  totalPage: number
}): PageItem[] {
  const { activePage, nextPage, prevPage, totalPage } = params

  const firstPage: PageNumberItem = {
    page: FIRST_PAGE,
    variant: activePage === FIRST_PAGE ? 'current' : 'page',
  }

  const lastPage: PageNumberItem = {
    page: totalPage,
    variant: activePage === totalPage ? 'current' : 'page',
  }

  const pageList: PageItem[] = [prevPage, firstPage]
  let remainingPageListItem = MAX_PAGE_LIST - RESERVED_PAGE_LIST

  const isFarFromFirstPage = activePage - FIRST_PAGE > TOTAL_MID_PAGE_LIST
  const isFarFromLastPage = totalPage - activePage > TOTAL_MID_PAGE_LIST

  let firstMidPageNumber = ELLIPSIS_INDEX_LEFT
  let lastMidPageNumber = ELLIPSIS_INDEX_RIGHT
  if (isFarFromFirstPage) {
    pageList.push({ variant: 'ellipsis' })
    remainingPageListItem -= 1
    if (isFarFromLastPage) {
      firstMidPageNumber = prevPage.page
      lastMidPageNumber = nextPage.page
    } else {
      firstMidPageNumber = lastPage.page - remainingPageListItem
      lastMidPageNumber = lastPage.page - 1
    }
  } else if (isFarFromLastPage) {
    lastMidPageNumber -= 1
  }

  for (let page = firstMidPageNumber; page <= lastMidPageNumber; page++) {
    pageList.push({ page, variant: page === activePage ? 'current' : 'page' })
  }

  if (isFarFromLastPage) {
    pageList.push({ variant: 'ellipsis' })
  }

  pageList.push(lastPage, nextPage)

  return pageList
}

function getPageItemAttributes(pageItem: PageNavItem | PageNumberItem) {
  const { page, variant } = pageItem
  const isCurrentPage = variant === 'current'
  let ariaCurrent: AriaAttributes['aria-current']
  let ariaLabel = `Go to Page ${page}`
  let isDisabled = false
  let pageNode: ReactNode = page

  if (variant === 'prev') {
    ariaLabel = `Go to Previous Page`
    isDisabled = pageItem.disabled
    pageNode = (
      <>
        <ChevronIcon height={32} width={32} />
        <span className='sr-only'>Previous</span>
      </>
    )
  } else if (variant === 'next') {
    ariaLabel = `Go to Next Page`
    isDisabled = pageItem.disabled
    pageNode = (
      <>
        <ChevronIcon height={32} width={32} className='rotate-180' />
        <span className='sr-only'>Next</span>
      </>
    )
  } else if (isCurrentPage) {
    ariaLabel = `Current Page, Page ${page}`
    ariaCurrent = 'true'
  }

  return { ariaCurrent, ariaLabel, isDisabled, pageNode }
}

export default function Pagination({
  activePage,
  buildHref,
  totalPage,
}: PaginationProps) {
  const pages = useMemo<PageItem[]>(() => {
    const prev = activePage - 1
    const next = activePage + 1

    const prevPage: PageNavItem = {
      disabled: prev < FIRST_PAGE,
      page: prev,
      variant: 'prev',
    }

    const nextPage: PageNavItem = {
      disabled: next > totalPage,
      page: next,
      variant: 'next',
    }

    const isEllipsisable = totalPage > MAX_PAGE_LIST
    if (isEllipsisable) {
      return buildEllipsisablePageList({
        activePage,
        nextPage,
        prevPage,
        totalPage,
      })
    }

    return [
      prevPage,
      ...Array.from({ length: totalPage }, (_, index): PageNumberItem => {
        const page = index + 1
        return { page, variant: page === activePage ? 'current' : 'page' }
      }),
      nextPage,
    ]
  }, [activePage, totalPage])

  const renderPageItem = useCallback(
    (pageItem: PageItem, index: number) => {
      if (pageItem.variant === 'ellipsis') {
        return (
          <li key={`${pageItem.variant}-${index}`}>
            <span>•••</span>
          </li>
        )
      }

      const { ariaCurrent, ariaLabel, isDisabled, pageNode } =
        getPageItemAttributes(pageItem)

      return (
        <li key={`${pageItem.variant}-${pageItem.page}`}>
          {isDisabled ? (
            <button aria-disabled disabled type='button'>
              {pageNode}
            </button>
          ) : (
            <Link
              aria-current={ariaCurrent}
              aria-label={ariaLabel}
              href={buildHref(pageItem.page)}
              title={ariaLabel}
            >
              {pageNode}
            </Link>
          )}
        </li>
      )
    },
    [buildHref]
  )

  return (
    <nav aria-label='Pagination' className={styles.pagination}>
      <ul>{pages.map(renderPageItem)}</ul>
    </nav>
  )
}
