let Tree = require("./Tree.js")
let prettyPrint = require("./prettyPrint.js")


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
newTree.insert(8000)
console.log("height of tree: " + newTree.height(newTree.root))

console.log(newTree.depth(newTree.find(7)))
console.log(newTree.depth(newTree.find(9)))

prettyPrint(newTree.root)

console.log(newTree.isBalanced())
console.log(traversalTree.isBalanced())

newTree.rebalance()
prettyPrint(newTree.root)

