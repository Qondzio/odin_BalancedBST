function Tree(array){

    function Node(value){
        let left=null;
        let right=null;

        return {value,left,right}
    }

    const sortedArray=array.sort((a,b)=>{
        return a-b;
    })    
   
    let root=buildTree(sortedArray);

    function buildTree(array){
        if(array.length===1) return Node(array[0]);
        if(array.length===0) return null;
        
        const middleIndex=Math.floor(array.length/2);
        const node=Node(array[middleIndex]);
        node.left=buildTree(array.slice(0,middleIndex));
        node.right=buildTree(array.slice(middleIndex+1));

        return node;
    }

    function deleteItem(value){
        let number=find(value);

        if(number===null){
            return null;
        }
        if(number.right){
            let lowest=number.right;
            while(lowest){
                if(!lowest.left){
                    number.value=number.right.value;
                    number.right=null;
                    return
                }
                else if(!lowest.left.left){
                    number.value=lowest.left.value;
                    lowest.left=null;
                    return
                }
                lowest=lowest.left;
            }       
        }
        else if(!number.right){
            let parent=root;

            while(parent){
                if(parent.left===number){
                    parent.left=null;
                    return
                }
                if(parent.right===number){
                    parent.right=null;
                    return
                }
                if(number.value<parent.value){
                    parent=parent.left;
                }
                else if(number.value>parent.value){
                    parent=parent.right;
                }
            }
        }
    }

    function insert(value){
        let number=root;

        while(number){
            if(value<number.value){
                if(number.left===null){
                    number.left=Node(value);
                    return
                }
                number=number.left;
            }
            else if(value>number.value){
                if(number.right===null){
                    number.right=Node(value);
                    return
                }
                number=number.right;
            }
        }
    }

    function find(value){
        let number=root;

        while(number){
            if(number.value===value){
                return number;
            }
            else{
                if(value<number.value){
                    number=number.left;
                }
                else{
                    number=number.right;
                }
            }
        }
        return null;
    }

    function levelOrder(callback){
        if(typeof callback === 'function'){
            let result=[]
            let queue=[]
            let node=root;

            if(node===null){
                return null
            }
            else{
                node=[root];
                queue.push(node[0]);
            }
            
            while(queue.length>0){
                if(queue[0].left){
                    queue.push(queue[0].left);
                }
                if(queue[0].right){
                    queue.push(queue[0].right);
                }
                result.push(queue[0]);
                queue.shift();
            }

            result.forEach((item)=>{
                callback(item)
            })
        }
        else{
            throw new Error ("Callback function is required.")
        }
    }

    function inOrder(callback){

        if(typeof callback === 'function'){
            if(root===null){
                return null;
            }
            recursion(root);
            function recursion(node){
                if(!node){
                    return
                }
                recursion(node.left)
                callback(node);
                recursion(node.right)
            }
        }
        else{
            throw new Error ("Callback function is required.");
        }
        
    }

    function preOrder(callback){
        if(typeof callback === 'function'){
            if(root===null){
                return null;
            }
            recursion(root);
            function recursion(node){
                if(!node){
                    return
                }
                callback(node);
                recursion(node.left);
                recursion(node.right);
            }
        }
        else{
            throw new Error ("Callback function is required.");
        }
    }

    function postOrder(callback){
        if(typeof callback === 'function'){
            if(root===null){
                return null;
            }
            recursion(root);
            function recursion(node){
                if(!node){
                    return
                }
                recursion(node.left);
                recursion(node.right);
                callback(node);
            }
        }
        else{
            throw new Error ("Callback function is required.");
        }
    }

    function height(value){
        let node=find(value);
        if(node===null) return null;

        function findHeight(node){
            if(node===null) return -1;
            return 1+ Math.max(findHeight(node.left), findHeight(node.right));
        }

        return findHeight(node)
    }

    function depth(value){
        const number=find(value);
        let node=root;
        let depth=0;

        while(node){
            if(number.value>node.value){
                node=node.right;
                depth++;
            }
            else if(number.value<node.value){
                node=node.left;
                depth++;
            }
            else{
                return depth;
            }
        }
    }

    function isBalanced() {
        let result=true;

        checkHeight(root);
        function checkHeight(node){
            if(!node){
                return
            }
            let leftHeight=0;
            let rightHeight=0;
            if(node.left){
                leftHeight=height(node.left.value)
            }
            if(node.right){
                rightHeight=height(node.right.value)
            }
            if(Math.abs(leftHeight-rightHeight)!==1 && Math.abs(leftHeight-rightHeight)!==0){
                result= false;
            }
            
            checkHeight(node.left)
            checkHeight(node.right)
            
        }

        return result;
    }

    function rebalance(){
        if(isBalanced()===false){
            let sortedArray=[];
            inOrder((item)=>{
                sortedArray.push(item.value)
            })
            
            root=buildTree(sortedArray);
        }
        else{
            return console.log("Tree is balanced.")
        }
    }

    
    const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
    };

    return {buildTree,prettyPrint,getRoot:()=> root,sortedArray,find,deleteItem,insert,levelOrder,inOrder,preOrder,postOrder,height,depth,isBalanced,rebalance}
}

const tree=Tree([30,20,50,40,80,60,70,125,120,110,105,21,25,127,66,88]);
