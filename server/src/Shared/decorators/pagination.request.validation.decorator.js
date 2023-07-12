module.exports = PaginationRequestValidation = (fn, request) => {
    let haveSomeItem = Object.keys(request.query).length > 0 && request.query.page && request.query.pageSize;

    if (!haveSomeItem) {
        throw Error("Pagination failed on validation @PaginationRequestValidation, no contains 'page' and 'pageSize'");
    } else {
        fn();
    }
}