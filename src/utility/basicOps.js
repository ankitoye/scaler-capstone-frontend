export default function basicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize) {
    if (products == null) {
        return;
    }
    let filteredArr = products;
    if (searchTerm != "") {
        filteredArr = filteredArr.filter((product) => {
            let lowerSearchTerm = searchTerm.toLowerCase();
            let lowerTitle = product.title.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm);
        })
    }
    let filteredSortedArr = filteredArr;
    if (sortDir != 0) {
        if (sortDir == 1) {
            filteredSortedArr = filteredSortedArr.sort(incComparator);
        }
        else {
            filteredSortedArr = filteredSortedArr.sort(decComparator);
        }
    }

    let filteredSortedgroupByArr = filteredSortedArr;
    let totalPages = Math.ceil(filteredSortedgroupByArr.length / pageSize);
    let sidx = (pageNum - 1) * pageSize;
    let eidx = sidx + pageSize;
    filteredSortedgroupByArr =
        filteredSortedgroupByArr.slice(sidx, eidx);
    console.log(filteredSortedArr)

    return { filteredSortedgroupByArr, totalPages };
}

function incComparator(product1, product2) {
    if (product1.price > product2.price) {
        return 1
    } else {
        return -1;
    }
}
function decComparator(product1, product2) {
    if (product1.price < product2.price) {
        return 1
    } else {
        return -1;
    }
}