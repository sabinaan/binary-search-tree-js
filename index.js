class Node{
    constructor(value){
        this.value = value || null
        this.left = null
        this.right = null
    }
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array)
    }

    buildTree(array){
        let uniqueValuesArr = removeDuplicates(array)
        console.log(uniqueValuesArr)
        let sortedUniqueArr = sortArray(uniqueValuesArr)
        console.log(sortedUniqueArr)
        let n = sortedUniqueArr.length
        let root = this.arrayToBTS(sortedUniqueArr, 0, n - 1)    
        return root
    }

    arrayToBTS(array, start, end){
        if (start > end){
            return null
        }
        let middle = parseInt((start + end) / 2)
        let node = new Node(array[middle])
        node.left = this.arrayToBTS(array, start, middle - 1)
        node.right = this.arrayToBTS(array, middle + 1, end)
        return node
    }

    insert(value,currentNode = this.root){
        if (currentNode == null){
            currentNode = new Node(value)
        }
        if (value < currentNode.value){
                this.insert(value, currentNode.left)
        }else if (value > currentNode.value){
                this.insert(value, currentNode.right)
        }
    }

    showRoot(){
        console.log(this.root)
    }
    
}

function sortArray(array){
    const sorted = array.sort((a, b) => a - b)
    return sorted
}

function removeDuplicates(array){
    let uniqeValuesArray = array.reduce(function(acc, current) {
        if (!acc.includes(current)){
            acc.push(current)
        } 
        return acc
    }, [])
    return uniqeValuesArray
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };




let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let newTree = new Tree(testArray)
prettyPrint(newTree.root)
newTree.insert(2)
prettyPrint(newTree.root)
newTree.insert(232)
prettyPrint(newTree.root)
newTree.insert(67)
prettyPrint(newTree.root)
