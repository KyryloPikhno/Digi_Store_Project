import { Pagination } from "@mui/material"
import { useSearchParams } from "react-router-dom"

const PaginationDevice = ({ total_pages, page }) => {
  const [query, setQuery] = useSearchParams({ page: "1" })

  const handleChange = (e, page) => {
    e.preventDefault()

    let obj = {}

    if (query.get("name")) {
      obj = {
        ...obj,
        name: query.get("name"),
      }
    }

    if (query.get("price_gte")) {
      obj = {
        ...obj,
        price_gte: query.get("price_gte"),
      }
    }

    if (query.get("price_lte")) {
      obj = {
        ...obj,
        price_lte: query.get("price_lte"),
      }
    }

    if (query.get("category")) {
      obj = {
        ...obj,
        category: query.get("category").toString(),
      }
    }

    if (query.get("color")) {
      obj = {
        ...obj,
        color: query.get("color").toString(),
      }
    }

    if (query.get("brand")) {
      obj = {
        ...obj,
        brand: query.get("brand").toString(),
      }
    }

    if (query.get("limit")) {
      obj = {
        ...obj,
        limit: query.get("limit"),
      }
    }

    if (page) {
      obj = {
        ...obj,
        page,
      }
    }

    if (query.get("sort")) {
      obj = {
        ...obj,
        sort: query.get("sort"),
      }
    }

    setQuery(obj)
  }

  return <Pagination color="standard" count={total_pages} page={page} onChange={handleChange} />
}

export { PaginationDevice }
