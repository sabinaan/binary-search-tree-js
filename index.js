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
        let sortedUniqueArr = sortArray(uniqueValuesArr)
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
 
    delete(value,node = this.root){
        if (node == null){
            return node
        }
            
        if (value < node.value) {
            node.left = this.delete(value, node.left)
            return node
        }else if (value > node.value){
            node.right = this.delete(value, node.right)
            return node
        }

        //if one or both children are empty
        if(node.left == null){
            return node.right
        } else if (node.right == null){
            return node.left

        //if both children exists
        }else {
            let succParent = node;
            let succ = node.right;

            while (succ.left != null){
                succParent = succ;
                succ = succ.left
            }
            
            if(succParent !== node){
                succParent.left = succ.right
            }else{
                succParent.right = succ.right
            }
            node.value = succ.value
            return node

        }

    }
    
    find(value, node = this.root){
        if(node == null || value == node.value){
            return node
        }
        if(value < node.value){
            return this.find(value, node.left)
        }
        return this.find(value, node.right)
    }

    levelOrder(func){
        if (this.root == null) return
        let queue = [this.root]
        let result = []
        while (queue.length !== 0){
            let first = queue.shift()
            
            if (first.left != null) queue.push(first.left)
            if (first.right != null) queue.push(first.right)

            result.push(first.value)
            
            if (func) func(first)
        }
        if (!func) return result
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

console.log(newTree.find(23))
console.log(newTree.find(4))

newTree.delete(1)
prettyPrint(newTree.root)
newTree.delete(4)
prettyPrint(newTree.root)
newTree.levelOrder((element) => console.log(element.value))
console.log(newTree.levelOrder())
