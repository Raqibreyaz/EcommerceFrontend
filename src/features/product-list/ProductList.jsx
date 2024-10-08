import React, { useState, Fragment, useEffect, useMemo } from "react";
import { ProductGrid, Container } from "../../components/index.js";
import { Filter, MobileFilter, SortMenu } from "./components/Filter";
import {
  useFetchCategoriesQuery,
  useFetchProductsQuery,
} from "./ProductSlice.js";
import { useSelector } from "react-redux";
import { useFetchProductOwnersQuery } from "../user/userSlice.js";
import PaginationHandler from "./components/PaginationHandler.jsx";

function ProductList() {
  const filter = useSelector((state) => state.filter.filter);

  const getQueryString = useMemo(() => {
    let queryString = "";
    // Helper function to append a parameter to the query string
    const appendParam = (key, value) => {
      if (value !== undefined && value !== "") {
        queryString += queryString ? `&&${key}=${value}` : `${key}=${value}`;
      }
    };

    // Process discount
    if (filter.discount) appendParam("min_discount", filter.discount);

    if (filter.limit) appendParam("limit", filter.limit);

    if (filter.page) appendParam("page", filter.page);

    // Process product_owners
    if (
      filter.product_owners &&
      filter.product_owners.length > 0 &&
      filter.product_owners[0] !== ""
    ) {
      appendParam("product_owners", filter.product_owners.join(","));
    }

    // Process category
    if (
      filter.category &&
      filter.category.length > 0 &&
      filter.category[0] !== ""
    ) {
      appendParam("category", filter.category.join(","));
    }

    // Process price
    if (filter.price && filter.price.length) {
      const [min, max] = filter.price;
      appendParam("min_price", min);
      if (max) appendParam("max_price", max);
    }

    // Process sort
    if (filter.sort && filter.sort.length > 0) {
      filter.sort.forEach((sortObj) => {
        if (sortObj.field && sortObj.order) {
          appendParam(`sort[${sortObj.field}]`, sortObj.order);
        }
      });
    }

    return queryString;
  }, [filter]);

  const {
    data: { products = [], totalPages = 1, filteredTotal = 0 } = {},
    isLoading: isLoadingProducts,
  } = useFetchProductsQuery(getQueryString);

  const { isLoadingCategories } = useFetchCategoriesQuery();

  const { isLoading: isLoadingProductOwners } = useFetchProductOwnersQuery();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <Container
      LoadingConditions={[
        !!isLoadingProducts,
        !!isLoadingCategories,
        !!isLoadingProductOwners,
      ]}
      className="bg-white"
    >
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sticky top-0">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-4xl max-sm:text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>
          <SortMenu setMobileFiltersOpen={setMobileFiltersOpen} />
        </div>
        <section aria-labelledby="products-heading" className="pb-24 pt-6 flex">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="sticky top-20 h-[60vh] overflow-y-auto w-[20vw] hidden lg:block ">
              <Filter />
            </div>
            {/* Product grid */}
            <ProductGrid products={products} />
          </div>
        </section>
        <PaginationHandler
          totalPages={totalPages}
          filteredTotal={filteredTotal}
        />
      </main>
    </Container>
  );
}

export default ProductList;
