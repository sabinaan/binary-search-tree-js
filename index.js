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
        // Sort array
        // Remove duplicates
        let n = array.length
        let root = this.arrayToBTS(array, 0, n - 1)
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

    showRoot(){
        console.log(this.root)
    }

}


let testArray = [1, 4, 3, 5, 8, 9, 67, 324]
let newTree = new Tree(testArray)
newTree.showRoot()