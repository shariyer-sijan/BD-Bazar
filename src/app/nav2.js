import React from 'react';

const Nav2 = async() => {
     const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
  const data = await res.json();
  
    return (
        <div  className='flex max-w-6xl mx-auto'>
            {
                data.map( (x,i)=>(
                    <div key={i} className='mx-2'>
                        <span>{x.icon}</span>
                        <span>{x.nameBn}</span>
                        </div>
                ))
            }
        </div>
    );
};

export default Nav2;