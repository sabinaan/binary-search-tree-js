let Node = require("./Node.js")
let helpFunc = require("./helpFunc.js")

class Tree{
    constructor(array){
        this.root = this.buildTree(array)
    }

    buildTree(array){
        let uniqueValuesArr = helpFunc.removeDuplicates(array)
        let sortedUniqueArr = helpFunc.sortArray(uniqueValuesArr)
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
            return currentNode
        }
        if (value < currentNode.value){
                currentNode.left = this.insert(value, currentNode.left)
        }else if (value > currentNode.value){
                currentNode.right = this.insert(value, currentNode.right)
        }
        return currentNode
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

    depth(node, root = this.root){
        if (root.value == node.value) return 0
        if (root.value > node.value){
            return this.depth(node, root.left) +1
        } else{
            return this.depth(node, root.right) +1
        } 
    }

    isBalanced(root = this.root){
        if (root == null) return true
        let lHeight = this.height(root.left)
        let rHeight = this.height(root.right)
        let difference = Math.abs(lHeight - rHeight)

        if (difference <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)) {
            return true
        } 
        return false

    }

    rebalance(){
        let currentTreeArray = this.levelOrder() 
        this.root = this.buildTree(currentTreeArray)
    }

    showRoot(){
        console.log(this.root)
    }

}

module.exports = Tree