import { ITodo } from '@/models/ITodo.d';
import { IUser } from '@/models/IUser.d';
import { JSX } from '@emotion/react/jsx-runtime';
import * as React from 'react';
import { useState, useMemo } from 'react';

interface ISearchable {
    name: string;
}

function transformToSearchable(input: IUser | ITodo): ISearchable {
    if ('todo' in input) {
        return {
            name: input.todo,
        }
    } else if ('firstName' in input) {
        return {
            name: input.firstName,
        }
    }
    throw new Error("Invalid input type");

}

interface ComponentProps {
    list: (IUser | ITodo)[];
} 

function WithSearch (Component: (componentProps: ComponentProps) => JSX.Element)  {
    const WithSearchResult = (({list, ...rest}: {list: (IUser | ITodo)[]}) => {
        const [search, setSearch] = useState<string>('');
    
          const matched = useMemo(() => {
            return list.filter(item => {
                const { name } = transformToSearchable(item);
                return name.toLowerCase().includes(search.toLowerCase());
            });
        }, [search, list]);
       
    
        return ( 
            <span>
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}></input>
                <Component
                list={matched}
                {...rest}></Component>
            </span>
         );
    
        })
        return WithSearchResult;
}

export default WithSearch;