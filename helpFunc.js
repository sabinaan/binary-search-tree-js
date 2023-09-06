exports.sortArray = function(array){
    const sorted = array.sort((a, b) => a - b)
    return sorted
}

exports.removeDuplicates = function(array) {
    let uniqeValuesArray = array.reduce(function(acc, current) {
        if (!acc.includes(current)){
            acc.push(current)
        } 
        return acc
    }, [])
    return uniqeValuesArray
}

