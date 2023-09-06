let Tree = require("./Tree.js")
let prettyPrint = require("./prettyPrint.js")


let getRandomInt = function(max = 100){
    return Math.floor(Math.random() * max);
}

let getRandomArray = function(length = 15, max = 100){
    let array = []
    for(i = 0 ; i < length ; i++){
        array.push(getRandomInt(max))
    }
    return array

}

let checkBalanced = function(tree){
    if(tree.isBalanced()){
        console.log("The tree is balanced")
    }else{
        console.log("The tree is unbalanced")
    }
}

let printDifferentOrders = function(tree){
        //level order
        console.log("level order")
        tree.levelOrder((element) => console.log(element.value))
    
        //inorder
        console.log("inorder")
        console.log(tree.inorder())
    
        //preorder
        console.log("preorder")
        console.log(tree.preorder())
    
        //postorder
        console.log("postorder")
        console.log(tree.postorder())
}



let driver = function(){
    let testArray = getRandomArray()
    let testTree = new Tree(testArray)

    prettyPrint(testTree.root)

    checkBalanced(testTree)
    
    printDifferentOrders(testTree)

    //insert random numbers
    for (i = 0 ; i < 6; i++){
        let randomNum = getRandomInt(100)
        testTree.insert(randomNum)
    }
    
    prettyPrint(testTree.root)
    if (!testTree.isBalanced()){

        testTree.rebalance()
    }
    checkBalanced(testTree)

    printDifferentOrders(testTree)


}


driver()

