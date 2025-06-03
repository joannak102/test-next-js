
import { ITodo } from '@/models/ITodo.d';
import * as React from 'react';
import { use, useEffect, useState } from 'react';


function RandomTodo() {
    const [randomTodo, setrandomTodo] = useState<ITodo| null>(null);

    const getData = async () => {
        try {
            const data = await resRandomTodo.json();
            setrandomTodo(data);
    
        } catch (error) {
            console.log(error);
  
        }
    }

    
    const resRandomTodo = use(fetch('https://dummyjson.com/todos/random/?delay=2000'));
    
    useEffect(() => {
        debugger
        if (resRandomTodo) {
            getData();
        }

    }, [resRandomTodo]);


        return (
             <span>
            
            <p>
                {randomTodo?.todo}
            </p>
        </span>
        )
    

}

export default RandomTodo;