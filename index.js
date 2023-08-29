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

    insert(value, currentNode = this.root){
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
    
    inorder(func, root = this.root, array = []){
        if (root == null) return

        this.inorder(func, root.left, array)
        if(func) func(root)
        array.push(root.value)
        this.inorder(func, root.right, array)
        
        if (!func) return array
    }

    preorder(func, root = this.root, array = []){
        if (root == null) return

        if(func) func(root)
        array.push(root.value)
        this.preorder(func, root.left, array)
        this.preorder(func, root.right, array)
        
        if (!func) return array
    }

    postorder(func, root = this.root, array = []){
        if (root == null) return

        this.postorder(func, root.left, array)
        this.postorder(func, root.right, array)
        if(func) func(root)
        array.push(root.value)

        if (!func) return array
    }

    height(node){
        if (node == null) return 0

        let leftDepth = this.height(node.left)
        let rightDepth = this.height(node.right)

        if (leftDepth > rightDepth){
            return leftDepth + 1
        }else{
            return rightDepth + 1
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

//insert
console.log("insert 2")
newTree.insert(2)
prettyPrint(newTree.root)
//newTree.insert(232)
//prettyPrint(newTree.root)
//newTree.insert(6700)
//prettyPrint(newTree.root)

//find
//console.log(newTree.find(23))
//console.log(newTree.find(4))

//delete
console.log("delete 1")
newTree.delete(1)
prettyPrint(newTree.root)
//newTree.delete(4)
//prettyPrint(newTree.root)


let traversalTree  = new Tree([1,2,3,4,5,6,7])
prettyPrint(traversalTree.root)

//level order
console.log("level order")
//traversalTree.levelOrder((element) => console.log(element.value))
console.log(traversalTree.levelOrder())

//inorder
console.log("inorder")
console.log(traversalTree.inorder())
//traversalTree.inorder((element) => console.log(element.value))

//preorder
console.log("preorder")
console.log(traversalTree.preorder())
//traversalTree.preorder((element) => console.log(element.value))


//postorder
console.log("postorder")
console.log(traversalTree.postorder())
//traversalTree.postorder((element) => console.log(element.value))

console.log("height of tree: " + newTree.height(newTree.root))


